require("dotenv").config();
const http = require("http");
const { pool } = require("./config/database");
const { initializeBucket, minioClient } = require("./config/minio");
const formidable = require("formidable");
const fs = require("fs");

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

      const file = files.image;
      if (!file) {
        res.writeHead(400);
        res.end(
          JSON.stringify({ status: "error", message: "No image provided" })
        );
        return;
      }

      const originalFileName = file.originalFilename;
      const fileName = `${Date.now()}_${originalFileName}`; // Usar el nombre original
      const filePath = path.join(avatarsDir, fileName);

      try {
        // Save file locally
        fs.renameSync(file.filepath, filePath);

        // Upload to MinIO
        const fileStream = fs.createReadStream(filePath);
        await minioClient.putObject(
          "more-social-media-bucket",
          `avatars/${fileName}`, // Usar el nombre completo con extensión
          fileStream
        );

        res.writeHead(200);
        res.end(
          JSON.stringify({
            status: "success",
            message: "Image uploaded successfully",
            fileName: `avatars/${fileName}`,
            url: `/avatars/${fileName}`,
          })
        );
      } catch (uploadError) {
        console.error("Error uploading:", uploadError);
        res.writeHead(500);
        res.end(
          JSON.stringify({ status: "error", message: "Error uploading image" })
        );
      }
    });

    return;
  }

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

  if (req.url === "/registrar" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      const userData = JSON.parse(body);
      try {
        const sql = `INSERT INTO "Usuario" (nombre, apellido, email, contrasena, telefono, quotes, crear)
        VALUES ($1, $2, $3, $4, $5, $6, CURRENT_DATE)
        RETURNING id, nombre, apellido, email, telefono, quotes, crear`;

        const result = await pool.query(sql, [
          userData.nombre,
          userData.apellido,
          userData.email,
          userData.password,
          userData.telefono,
          userData.quotes,
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

  if (req.url === "/login" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      try {
        const userData = JSON.parse(body);
        const sql = `SELECT * FROM "Usuario" WHERE email = $1 AND contrasena = $2`;
        const result = await pool.query(sql, [
          userData.email,
          userData.password,
        ]);

        if (result && result.rows.length > 0) {
          res.writeHead(200);
          res.end(
            JSON.stringify({
              status: "200",
              message: "Login exitoso",
              data: {
                nombre: result.rows[0].nombre,
                apellido: result.rows[0].apellido,
                email: result.rows[0].email,
                telefono: result.rows[0].telefono,
                foto_perfil: result.rows[0].foto_perfil,
              },
            })
          );
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

  res.writeHead(404);
  res.end(JSON.stringify({ error: "Not Found" }));
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
