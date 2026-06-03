# 🚀 Backend - Directorio de Contactos

Backend desarrollado con Node.js, Express y MongoDB para la gestión de usuarios y contactos.

## 📋 Características

- API REST
- Autenticación mediante JWT
- Encriptación de contraseñas con BCrypt
- Conexión a MongoDB mediante Mongoose
- CRUD completo de contactos
- Rutas protegidas
- Subida de imágenes con Multer

## 🛠️ Tecnologías

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- BCryptJS
- Multer
- CORS
- Nodemon

## 📂 Estructura
backend/
│
├── config/
│ └── db.js
│
├── controllers/
│ ├── authController.js
│ └── contactController.js
│
├── middleware/
│ ├── authMiddleware.js
│ └── uploadMiddleware.js
│
├── models/
│ ├── User.js
│ └── Contact.js
│
├── routes/
├── uploads/
├── server.js
└── package.json
