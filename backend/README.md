# Backend More Social Media

Backend para aplicación móvil MORE red social desarrollado con Node.js, PostgreSQL y MinIO.

## Requisitos Previos

- Docker y Docker Compose
- Node.js (versión 16 o superior)
- npm o yarn

## Configuración Inicial

1. Clonar el repositorio:
```bash
git clone <url-del-repositorio>
cd <nombre-del-repositorio>
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env
```
Editar el archivo `.env` con tus configuraciones.

4. Iniciar servicios de Docker:
```bash
docker-compose up -d
```

Esto iniciará:
- PostgreSQL en el puerto 5432
- MinIO en el puerto 9000 (API) y 9001 (Console)

5. Verificar que los contenedores estén funcionando:
```bash
docker-compose ps
```

## Iniciar el Backend

1. En modo desarrollo:
```bash
npm run dev
```

2. En modo producción:
```bash
npm start
```

## Acceso a Servicios

- **PostgreSQL**:
  - Host: localhost
  - Puerto: 5432
  - Usuario: admin
  - Contraseña: adminpassword
  - Base de datos: more

- **MinIO**:
  - API: http://localhost:9000
  - Consola Web: http://localhost:9001
  - Access Key: minioadmin
  - Secret Key: minioadmin

## Estructura de la Base de Datos

El backend incluye las siguientes tablas:

- Usuario: Gestión de usuarios
- Seguidor: Sistema de seguidores
- Publicacion: Posts de usuarios
- MeGusta: Sistema de likes
- Comentario: Comentarios en publicaciones
- Guardar: Posts guardados
- Notificacion: Sistema de notificaciones

## Detener los Servicios

Para detener los contenedores:
```bash
docker-compose down
```

Para detener y eliminar todos los datos (¡cuidado!):
```bash
docker-compose down -v
```
