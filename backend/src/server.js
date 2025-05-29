require("dotenv").config();
const http = require("http");
const { pool } = require("./config/database");
const { initializeBucket, minioClient } = require("./config/minio");
const formidable = require("formidable");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Inicializar MinIO bucket
initializeBucket();

const server = http.createServer(async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  const path = require("path");

  const avatarsDir = path.join(__dirname, "avatars");
  if (!fs.existsSync(avatarsDir)) {
    fs.mkdirSync(avatarsDir);
  }

  /*ENDPOINTS*/

 if (req.url === "/api" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello, Sophia!");
    return;
  }


  if (req.url === "/publicar" && req.method === "POST") {
    const form = new formidable.IncomingForm();
    const postsDir = path.join(__dirname, "posts");
    if (!fs.existsSync(postsDir)) {
      fs.mkdirSync(postsDir);
    }
    form.uploadDir = postsDir;
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.writeHead(500);
        res.end(
          JSON.stringify({
            status: "error",
            message: "Error parsing form data",
          })
        );
        return;
      }

      const usuario_id = fields.usuario_id;
      const contenido = fields.contenido;
      const etiqueta = fields.etiqueta;
      const file = files.image;

      if (!usuario_id || !contenido || !file) {
        res.writeHead(400);
        res.end(
          JSON.stringify({
            status: "error",
            message: "usuario_id, contenido y una imagen son requeridos",
            data: fields,
          })
        );
        return;
      }

      try {
        // Crear la publicación primero (fotos será null temporalmente)
        const sql = `INSERT INTO "Publicacion" (usuario_id, description, etiquetas, fecha_publicacion)
          VALUES ($1, $2, $3, CURRENT_TIMESTAMP) RETURNING id`;
        const result = await pool.query(sql, [usuario_id, contenido, etiqueta]);

        if (!result || result.rows.length === 0) {
          throw new Error("No se retornaron datos después de la inserción");
        }

        const publicacionId = result.rows[0].id;
        const ext = path.extname(
          file.originalFilename || file.newFilename || ""
        );
        const fileName = `${publicacionId}${ext}`;
        const filePath = path.join(postsDir, fileName);

        // Guardar la imagen con el nombre del id de la publicación
        fs.renameSync(file.filepath, filePath);

        // Actualizar la columna fotos con el nombre de la imagen
        await pool.query(`UPDATE "Publicacion" SET fotos = $1 WHERE id = $2`, [
          fileName,
          publicacionId,
        ]);

        res.writeHead(200);
        res.end(
          JSON.stringify({
            status: "200",
            message: "Publicación creada",
            data: { id: publicacionId, foto: fileName },
          })
        );
      } catch (error) {
        console.error("Error al insertar publicación:", error);
        res.writeHead(500);
        res.end(
          JSON.stringify({
            status: "500",
            message: "Error al agregar publicación",
            error: error.message,
          })
        );
      }
    });
    return;
  }

  /* Endpoint para subir la imagen de perfil */
  if (req.url === "/upload" && req.method === "POST") {
    const form = new formidable.IncomingForm();
    form.uploadDir = avatarsDir;
    form.keepExtensions = true; // Importante para mantener la extensión

    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.writeHead(500);
        res.end(
          JSON.stringify({
            status: "error",
            message: "Error parsing form data",
          })
        );
        return;
      }

      // Obtener el userId del formulario
      const userId = fields.userId;
      if (!userId) {
        res.writeHead(400);
        res.end(
          JSON.stringify({ status: "error", message: "No userId provided" })
        );
        return;
      }

      const file = files.image;
      if (!file) {
        res.writeHead(400);
        res.end(
          JSON.stringify({ status: "error", message: "No image provided" })
        );
        return;
      }

      const originalFileName = file.originalFilename;
      const fileName = `${originalFileName}`; // Usar el nombre original
      const filePath = path.join(avatarsDir, fileName);

      try {
        // Save file locally
        fs.renameSync(file.filepath, filePath);

        // Upload to MinIO
        const fileStream = fs.createReadStream(filePath);
        await minioClient.putObject(
          "more-social-media-bucket",
          `avatars/${fileName}`,
          fileStream
        );

        // Actualizar la columna foto_perfil en la base de datos
        await pool.query(
          `UPDATE "Usuario" SET foto_perfil = $1 WHERE id = $2`,
          [fileName, userId]
        );

        res.writeHead(200);
        res.end(
          JSON.stringify({
            status: "success",
            message: "Imagen subida y guardada correctamente",
            fileName: `avatars/${fileName}`,
            url: `/avatars/${fileName}`,
          })
        );
      } catch (uploadError) {
        console.error("Error al subir:", uploadError);
        res.writeHead(500);
        res.end(
          JSON.stringify({ status: "error", message: "Error al subir imagen" })
        );
      }
    });

    return;
  }

  // Servir imágenes de la carpeta posts de forma estática
  if (req.url.startsWith("/posts/") && req.method === "GET") {
    const fileName = req.url.split("/posts/")[1];
    const filePath = path.join(__dirname, "posts", fileName);

    if (fs.existsSync(filePath)) {
      const stream = fs.createReadStream(filePath);
      res.writeHead(200, { "Content-Type": "image/jpeg" });
      stream.pipe(res);
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: "Imagen no encontrada" }));
    }
    return;
  }

  /* Endpoint para obtener la imagen del perfil de forma statica */
  if (req.url.startsWith("/avatars/") && req.method === "GET") {
    const fileName = req.url.split("/avatars/")[1];
    const filePath = path.join(avatarsDir, fileName);

    if (fs.existsSync(filePath)) {
      const contentType = fileName.endsWith(".png")
        ? "image/png"
        : fileName.endsWith(".jpg") || fileName.endsWith(".jpeg")
        ? "image/jpeg"
        : "application/octet-stream";

      res.setHeader("Content-Type", contentType);
      fs.createReadStream(filePath).pipe(res);
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: "Image not found" }));
    }
    return;
  }

  /*registrarse*/
  if (req.url === "/registrar" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      const userData = JSON.parse(body);
      try {
        // Cifrar la contraseña antes de guardar
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        const sql = `INSERT INTO "Usuario" (nombre, apellido, email, contrasena, telefono, quotes,pregunta,respuesta, crear)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, CURRENT_DATE)
        RETURNING id, nombre, apellido, email, telefono, quotes,pregunta,respuesta crear`;

        const result = await pool.query(sql, [
          userData.nombre,
          userData.apellido,
          userData.email,
          hashedPassword, // Guardar contraseña cifrada
          userData.telefono,
          userData.quotes,
          userData.pregunta,
          userData.respuesta,
        ]);

        if (result && result.rows.length > 0) {
          res.writeHead(200);
          res.end(
            JSON.stringify({
              status: "200",
              message: "Usuario Agregado",
              data: result.rows[0],
            })
          );
        } else {
          throw new Error("No se retornaron datos después de la inserción");
        }
      } catch (error) {
        console.error("Error al insertar usuario:", error);
        res.writeHead(500);
        res.end(
          JSON.stringify({
            status: "500",
            message: "Error al agregar usuario",
            error: error.message,
          })
        );
      }
    });
    return;
  }

  /*endpoint para validar el logueo*/
  if (req.url === "/login" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      try {
        const userData = JSON.parse(body);
        const sql = `SELECT * FROM "Usuario" WHERE email = $1`;
        const result = await pool.query(sql, [userData.email]);

        if (result && result.rows.length > 0) {
          const user = result.rows[0];
          // Comparar la contraseña cifrada
          const passwordMatch = await bcrypt.compare(
            userData.password,
            user.contrasena
          );

          if (passwordMatch) {
            // Generar JWT
            const token = jwt.sign(
              { id: user.id, email: user.email },
              process.env.JWT_SECRET || "secret_key",
              { expiresIn: "1h" }
            );

            res.writeHead(200);
            res.end(
              JSON.stringify({
                status: "200",
                message: "Login exitoso",
                token,
                data: {
                  nombre: user.nombre,
                  apellido: user.apellido,
                  email: user.email,
                  telefono: user.telefono,
                  foto_perfil: user.foto_perfil,
                  id: user.id,
                  quotes: user.quotes,
                },
              })
            );
          } else {
            res.writeHead(401);
            res.end(
              JSON.stringify({
                status: "401",
                message: "Credenciales inválidas",
              })
            );
          }
        } else {
          res.writeHead(401);
          res.end(
            JSON.stringify({ status: "401", message: "Credenciales inválidas" })
          );
        }
      } catch (error) {
        console.error("Error al consultar usuario:", error);
        res.writeHead(500);
        res.end(
          JSON.stringify({
            status: "500",
            message: "Error al autenticar usuario: " + error.message,
            error: error.message,
          })
        );
      }
    });
    return;
  }

  /*endpoint para probar el backend*/
  if (req.url === "/api" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello, browser!");
    return;
  }

  /* Endpoint para validar si el correo existe */
  if (req.url === "/validate-email" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      try {
        const { email } = JSON.parse(body);

        if (!email) {
          res.writeHead(400);
          res.end(
            JSON.stringify({
              exists: false,
              message: "El correo electrónico es requerido.",
            })
          );
          return;
        }

        // Consultar la base de datos para verificar si el email existe
        const sql = `SELECT id FROM "Usuario" WHERE email = $1`;
        const result = await pool.query(sql, [email]);

        if (result && result.rows.length > 0) {
          // El correo existe
          res.writeHead(200);
          res.end(
            JSON.stringify({
              exists: true,
              message: "Correo electrónico verificado.",
            })
          );
        } else {
          // El correo no existe
          res.writeHead(404);
          res.end(
            JSON.stringify({
              exists: false,
              message: "El correo electrónico no se encuentra registrado.",
            })
          );
        }
      } catch (error) {
        console.error("Error al validar correo:", error);
        res.writeHead(500);
        res.end(
          JSON.stringify({
            exists: false,
            message: "Error interno del servidor al validar el correo.",
          })
        );
      }
    });
    return;
  }

  /* Endpoint para obtener la pregunta de seguridad */
  if (req.url === "/get-security-question" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      try {
        const { email } = JSON.parse(body);

        if (!email) {
          res.writeHead(400);
          res.end(
            JSON.stringify({ message: "El correo electrónico es requerido." })
          );
          return;
        }

        // Normalizar el email a minúsculas para la búsqueda
        const normalizedEmail = email.toLowerCase();
        const sql = `SELECT pregunta FROM "Usuario" WHERE email = $1`;
        const result = await pool.query(sql, [normalizedEmail]);

        if (result && result.rows.length > 0 && result.rows[0].pregunta) {
          res.writeHead(200);
          res.end(JSON.stringify({ question: result.rows[0].pregunta }));
        } else if (
          result &&
          result.rows.length > 0 &&
          !result.rows[0].pregunta
        ) {
          res.writeHead(404); // Not Found
          res.end(
            JSON.stringify({
              message:
                "El usuario no tiene una pregunta de seguridad configurada.",
            })
          );
        } else {
          res.writeHead(404); // Not Found
          res.end(
            JSON.stringify({ message: "Correo electrónico no encontrado." })
          );
        }
      } catch (error) {
        console.error("Error al obtener pregunta de seguridad:", error);
        res.writeHead(500);
        res.end(
          JSON.stringify({
            message: "Error interno del servidor al obtener la pregunta.",
          })
        );
      }
    });
    return;
  }

  /* Endpoint para validar la respuesta de seguridad */
  if (req.url === "/validate-security-answer" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      try {
        const { email, answer } = JSON.parse(body);

        if (!email || typeof answer === "undefined") {
          res.writeHead(400);
          res.end(
            JSON.stringify({
              valid: false,
              message: "Correo electrónico y respuesta son requeridos.",
            })
          );
          return;
        }
        // Normalizar el email a minúsculas para la búsqueda y la respuesta para la comparación
        const normalizedEmail = email.toLowerCase();
        const normalizedAnswer = answer.toLowerCase();

        const sql = `SELECT respuesta FROM "Usuario" WHERE email = $1`;
        const result = await pool.query(sql, [normalizedEmail]);

        if (
          result &&
          result.rows.length > 0 &&
          result.rows[0].respuesta &&
          result.rows[0].respuesta.toLowerCase() === normalizedAnswer
        ) {
          res.writeHead(200);
          res.end(
            JSON.stringify({ valid: true, message: "Respuesta correcta." })
          );
        } else {
          res.writeHead(400);
          res.end(
            JSON.stringify({
              valid: false,
              message:
                "La respuesta de seguridad es incorrecta o el usuario no fue encontrado.",
            })
          );
        }
      } catch (error) {
        console.error("Error al validar respuesta de seguridad:", error);
        res.writeHead(500);
        res.end(
          JSON.stringify({
            valid: false,
            message: "Error interno del servidor al validar la respuesta.",
          })
        );
      }
    });
    return;
  }

  /* Endpoint para restablecer la contraseña */
  if (req.url === "/reset-password" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      try {
        const { email, newPassword } = JSON.parse(body);

        if (!email || !newPassword) {
          res.writeHead(400);
          res.end(
            JSON.stringify({
              success: false,
              message: "Correo electrónico y nueva contraseña son requeridos.",
            })
          );
          return;
        }

        // Normalizar el email a minúsculas para la búsqueda
        const normalizedEmail = email.toLowerCase();

        // Cifrar la nueva contraseña
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Actualizar la contraseña en la base de datos
        const sql = `UPDATE "Usuario" SET contrasena = $1 WHERE email = $2 RETURNING id`;
        const result = await pool.query(sql, [hashedPassword, normalizedEmail]);

        if (result && result.rows.length > 0) {
          res.writeHead(200);
          res.end(
            JSON.stringify({
              success: true,
              message: "Contraseña actualizada con éxito.",
            })
          );
        } else {
          res.writeHead(404); // Not Found if email doesn't match any user
          res.end(
            JSON.stringify({
              success: false,
              message: "Usuario no encontrado.",
            })
          );
        }
      } catch (error) {
        console.error("Error al restablecer contraseña:", error);
        res.writeHead(500);
        res.end(
          JSON.stringify({
            success: false,
            message: "Error interno del servidor al restablecer la contraseña.",
          })
        );
      }
    });
    return;
  }

  // Endpoint para obtener publicaciones por usuario_id
  if (req.url.startsWith("/publicaciones") && req.method === "GET") {
    const url = require("url");
    const queryObject = url.parse(req.url, true).query;
    const usuario_id = queryObject.usuario_id;

    if (!usuario_id) {
      res.writeHead(400);
      res.end(
        JSON.stringify({ status: "error", message: "usuario_id es requerido" })
      );
      return;
    }

    try {
      const sql = `SELECT id, fotos FROM "Publicacion" WHERE usuario_id = $1 ORDER BY fecha_publicacion DESC`;
      pool
        .query(sql, [usuario_id])
        .then((result) => {
          res.writeHead(200);
          res.end(JSON.stringify(result.rows));
        })
        .catch((error) => {
          console.error("Error al obtener publicaciones:", error);
          res.writeHead(500);
          res.end(
            JSON.stringify({
              status: "error",
              message: "Error al obtener publicaciones",
            })
          );
        });
    } catch (error) {
      console.error("Error general en publicaciones:", error);
      res.writeHead(500);
      res.end(
        JSON.stringify({
          status: "error",
          message: "Error interno del servidor",
        })
      );
    }
    return;
  }

  // Endpoint para obtener todas las publicaciones con etiquetas y fotos
  if (req.url.startsWith("/todaslaspublicaciones") && req.method === "GET") {
    try {
      const sql = `SELECT p.id, p.fotos, p.description, p.fecha_publicacion, p.etiquetas,
      CONCAT(u.nombre, ' ', u.apellido) AS usuario,
      u.foto_perfil,
      p.usuario_id
      FROM "Publicacion" p
      JOIN "Usuario" u ON p.usuario_id = u.id
      ORDER BY p.fecha_publicacion DESC`;
      const result = await pool.query(sql);

      res.writeHead(200);
      res.end(JSON.stringify(result.rows));
    } catch (error) {
      console.error("Error al obtener todas las publicaciones:", error);
      res.writeHead(500);
      res.end(
        JSON.stringify({
          status: "error",
          message: "Error al obtener publicaciones",
        })
      );
    }
    return;
  }

  // Endpoint para obtener todos los comentarios de una publicación con datos del usuario
  if (req.url.startsWith("/comentarios") && req.method === "GET") {
    const url = require("url");
    const queryObject = url.parse(req.url, true).query;
    const publicacion_id = queryObject.publicacion_id;

    if (!publicacion_id) {
      res.writeHead(400);
      res.end(
        JSON.stringify({
          status: "error",
          message: "publicacion_id es requerido",
        })
      );
      return;
    }

    try {
      const sql = `
        SELECT c.id, c.texto AS Comentario, c.fecha, c.usuario_id,
               u.nombre, u.apellido
        FROM "Comentario" c
        JOIN "Usuario" u ON c.usuario_id = u.id
        WHERE c.publicacion_id = $1
        ORDER BY c.fecha ASC
      `;
      pool
        .query(sql, [publicacion_id])
        .then((result) => {
          res.writeHead(200);
          res.end(JSON.stringify(result.rows));
        })
        .catch((error) => {
          console.error("Error al obtener comentarios:", error);
          res.writeHead(500);
          res.end(
            JSON.stringify({
              status: "error",
              message: "Error al obtener comentarios",
            })
          );
        });
    } catch (error) {
      console.error("Error general en comentarios:", error);
      res.writeHead(500);
      res.end(
        JSON.stringify({
          status: "error",
          message: "Error interno del servidor",
        })
      );
    }
    return;
  }

  // Endpoint para agregar un comentario a una publicación
  if (req.url === "/agregar-comentario" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      try {
        const { publicacion_id, usuario_id, comentario } = JSON.parse(body);

        if (!publicacion_id || !usuario_id || !comentario) {
          res.writeHead(400);
          res.end(
            JSON.stringify({
              status: "error",
              message: "publicacion_id, usuario_id y comentario son requeridos",
            })
          );
          return;
        }

        const sql = `INSERT INTO "Comentario" (usuario_id,publicacion_id, texto, fecha)
                     VALUES ($1, $2, $3, CURRENT_TIMESTAMP) RETURNING id`;
        const result = await pool.query(sql, [
          usuario_id,
          publicacion_id,
          comentario,
        ]);

        res.writeHead(200);
        res.end(
          JSON.stringify({
            status: "success",
            message: "Comentario agregado",
            data: { id: result.rows[0].id },
          })
        );
      } catch (error) {
        console.error("Error al agregar comentario:", error);
        res.writeHead(500);
        res.end(
          JSON.stringify({
            status: "error",
            message: "Error al agregar comentario",
          })
        );
      }
    });
    return;
  }

  // Endpoint para agregar / quitar los guardados de un usuario
  if (req.url === "/guardar" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", async () => {
      try {
        const { usuario_id, publicacion_id } = JSON.parse(body);
        if (!usuario_id || !publicacion_id) {
          res.writeHead(400);
          res.end(
            JSON.stringify({
              status: "error",
              message: "usuario_id y publicacion_id son requeridos",
            })
          );
          return;
        }
        // Verificar si ya existe el guardado
        const checkSql = `SELECT id FROM "Guardar" WHERE idpublicacion = $1 AND idusuario = $2`;
        const check = await pool.query(checkSql, [publicacion_id, usuario_id]);
        if (check.rows.length > 0) {
          // Si existe, eliminar (quitar guardado)
          await pool.query(
            `DELETE FROM "Guardar" WHERE idusuario = $1 AND idpublicacion = $2`,
            [usuario_id, publicacion_id]
          );
          res.writeHead(200);
          res.end(JSON.stringify({ status: "success", saved: false }));
        } else {
          // Si no existe, insertar (guardar)
          await pool.query(
            `INSERT INTO "Guardar" (idusuario, idpublicacion) VALUES ($1, $2)`,
            [usuario_id, publicacion_id]
          );
          res.writeHead(200);
          res.end(JSON.stringify({ status: "success", saved: true }));
        }
      } catch (error) {
        console.error("Error en toggle-save:", error);
        res.writeHead(500);
        res.end(
          JSON.stringify({ status: "error", message: "Error en toggle-save" })
        );
      }
    });
    return;
  }

  // Endpoint para agregar o quitar un "Me Gusta" (like)
  if (req.url === "/like" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", async () => {
      try {
        const { usuario_id, publicacion_id } = JSON.parse(body);
        if (!usuario_id || !publicacion_id) {
          res.writeHead(400);
          res.end(
            JSON.stringify({
              status: "error",
              message: "usuario_id y publicacion_id son requeridos",
            })
          );
          return;
        }
        // Verificar si ya existe el like
        const checkSql = `SELECT id FROM "MeGusta" WHERE idusuario = $1 AND idpublicacion = $2`;
        const check = await pool.query(checkSql, [usuario_id, publicacion_id]);
        if (check.rows.length > 0) {
          await pool.query(
            `DELETE FROM "MeGusta" WHERE idusuario = $1 AND idpublicacion = $2`,
            [usuario_id, publicacion_id]
          );
          res.writeHead(200);
          res.end(JSON.stringify({ status: "success", liked: false }));
        } else {
          // Si no existe, insertar (agregar like)
          await pool.query(
            `INSERT INTO "MeGusta" (idusuario, idpublicacion) VALUES ($1, $2)`,
            [usuario_id, publicacion_id]
          );
          res.writeHead(200);
          res.end(JSON.stringify({ status: "success", liked: true }));
        }
      } catch (error) {
        console.error("Error en like:", error);
        res.writeHead(500);
        res.end(JSON.stringify({ status: "error", message: "Error en like" }));
      }
    });
    return;
  }

  // Endpoint para obtener las publicaciones guardadas por un usuario
  if (req.url.startsWith("/guardadas") && req.method === "GET") {
    const url = require("url");
    const queryObject = url.parse(req.url, true).query;
    const usuario_id = queryObject.usuario_id;

    if (!usuario_id) {
      res.writeHead(400);
      res.end(
        JSON.stringify({ status: "error", message: "usuario_id es requerido" })
      );
      return;
    }

    try {
      // Trae las publicaciones guardadas por el usuario, incluyendo la(s) foto(s)
      const sql = `
        SELECT p.id, p.fotos
        FROM "Guardar" g
        JOIN "Publicacion" p ON g.idpublicacion = p.id
        WHERE g.idusuario = $1
        ORDER BY p.fecha_publicacion DESC
      `;
      pool
        .query(sql, [usuario_id])
        .then((result) => {
          res.writeHead(200);
          res.end(JSON.stringify(result.rows));
        })
        .catch((error) => {
          console.error("Error al obtener publicaciones guardadas:", error);
          res.writeHead(500);
          res.end(
            JSON.stringify({
              status: "error",
              message: "Error al obtener publicaciones guardadas",
            })
          );
        });
    } catch (error) {
      console.error("Error general en guardadas:", error);
      res.writeHead(500);
      res.end(
        JSON.stringify({
          status: "error",
          message: "Error interno del servidor",
        })
      );
    }
    return;
  }

  // Endpoint para agregar una notificación
  if (req.url === "/agregar-notificacion" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", async () => {
      try {
        const { tipo, idusuario, idpublicacion, mensaje } = JSON.parse(body);
        if (!tipo || !idusuario || !idpublicacion || !mensaje) {
          res.writeHead(400);
          res.end(
            JSON.stringify({
              status: "error",
              message:
                "tipo, idusuario, idpublicacion y mensaje son requeridos",
            })
          );
          return;
        }
        const sql = `INSERT INTO "Notificacion" (tipo, usuario_id, publicacion_id, mensaje, fecha)
                     VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP) RETURNING id`;
        const result = await pool.query(sql, [
          tipo,
          idusuario,
          idpublicacion,
          mensaje,
        ]);
        res.writeHead(200);
        res.end(
          JSON.stringify({
            status: "success",
            message: "Notificación agregada",
            data: { id: result.rows[0].id },
          })
        );
      } catch (error) {
        console.error("Error al agregar notificación:", error);
        res.writeHead(500);
        res.end(
          JSON.stringify({
            status: "error",
            message: "Error al agregar notificación",
          })
        );
      }
    });
    return;
  }

  // Endpoint para obtener notificaciones de un usuario
  if (req.url.startsWith("/notificaciones") && req.method === "GET") {
    const url = require("url");
    const queryObject = url.parse(req.url, true).query;
    const usuario_id = queryObject.usuario_id;

    if (!usuario_id) {
      res.writeHead(400);
      res.end(
        JSON.stringify({ status: "error", message: "usuario_id es requerido" })
      );
      return;
    }

    try {
      // Trae las notificaciones donde el usuario es dueño de la publicación
      const sql = `
        SELECT n.id, n.tipo, n.mensaje, n.fecha, n.publicacion_id, n.usuario_id AS emisor_id,
               u.nombre AS emisor_nombre, u.apellido AS emisor_apellido, u.foto_perfil,
               p.fotos AS publicacion_foto
        FROM "Notificacion" n
        JOIN "Publicacion" p ON n.publicacion_id = p.id
        JOIN "Usuario" u ON n.usuario_id = u.id
        WHERE p.usuario_id = $1
        ORDER BY n.fecha DESC
      `;
      pool
        .query(sql, [usuario_id])
        .then((result) => {
          res.writeHead(200);
          res.end(JSON.stringify(result.rows));
        })
        .catch((error) => {
          console.error("Error al obtener notificaciones:", error);
          res.writeHead(500);
          res.end(
            JSON.stringify({
              status: "error",
              message: "Error al obtener notificaciones",
            })
          );
        });
    } catch (error) {
      console.error("Error general en notificaciones:", error);
      res.writeHead(500);
      res.end(
        JSON.stringify({
          status: "error",
          message: "Error interno del servidor",
        })
      );
    }
    return;
  }

  res.writeHead(404);
  res.end(JSON.stringify({ error: "Not Found" }));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

