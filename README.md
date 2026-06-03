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
## README.md (Frontend)

# 💻 Frontend - Directorio de Contactos

Aplicación web desarrollada con React y Vite para administrar contactos de manera rápida y segura.

## 📋 Características

- Interfaz moderna y responsiva
- Registro e inicio de sesión
- Gestión de contactos
- Consumo de API REST mediante Axios
- Navegación con React Router
- Notificaciones con React Hot Toast
- Gestión de favoritos y categorías

## 🛠️ Tecnologías

- React 19
- Vite
- Axios
- React Router DOM
- React Hot Toast

## 📂 Estructura


frontend/
│
├── public/
│
├── src/
│ ├── components/
│ ├── pages/
│ ├── services/
│ ├── routes/
│ └── App.jsx
│
├── package.json
└── vite.config.js


