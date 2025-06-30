# Beauty Appointments

Una aplicación de gestión de turnos para centros de estética y belleza.

## 🧠 Objetivo del proyecto

Facilitar la organización de turnos mediante una interfaz web simple, con funcionalidades de autenticación de usuarios, creación, edición y eliminación de citas. Este proyecto está orientado a centros de estética que buscan digitalizar su agenda sin necesidad de sistemas complejos.

---

## 🚀 ¿Cómo levantar el proyecto?

### 1. Clonar el repositorio

```bash
git clone https://github.com/tatijael/beauty-appointments.git
cd beauty-appointments
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Crear archivos de datos

Asegurate de tener la carpeta `/data` con estos archivos:

- `appointments.json`: debe ser un array vacío `[]`
- `users.json`: también debe comenzar como `[]`

### 4. Variables de entorno

Crear un archivo `.env` con el siguiente contenido:

```
JWT_SECRET=secreto123
PORT=3000
```

> Asegurate de que `.env` esté listado en tu `.gitignore`.

### 5. Iniciar el servidor

```bash
npm start
```

La app estará disponible en [http://localhost:3000](http://localhost:3000)

---

## 🧪 Funcionalidades

- Registro de usuarios
- Login con generación de token JWT
- Protección de rutas con middleware de autenticación
- Listado de turnos
- Crear un nuevo turno
- Editar un turno mediante un modal
- Eliminar turnos
- Almacenamiento de datos en archivos JSON

---

## 💄 Frontend

Este proyecto incluye un frontend básico embebido (HTML + JS vanilla):

- `index.html`: Panel de turnos
- `login.html` y `register.html`: Autenticación
- `modal.html`: Edición de turnos

---

## 📁 Estructura del proyecto

```
beauty-appointments/
├── public/
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── modal.html
│   └── script.js
├── data/
│   ├── appointments.json
│   └── users.json
├── routes/
│   ├── appointments.routes.js
│   └── users.routes.js
├── controllers/
│   ├── appointments.controller.js
│   └── users.controller.js
├── middleware/
│   └── auth.middleware.js
├── services/
│   └── data.service.js
├── app.js
├── .env
└── README.md
```

---

## ✨ Tecnologías utilizadas

- Node.js
- Express
- JavaScript Vanilla (frontend)
- JWT (autenticación)
- HTML & CSS

---

## 🔐 Seguridad y buenas prácticas

- Tokens JWT para proteger rutas privadas
- Middleware de autenticación centralizado
- Validación de campos en formularios
- Separación de lógica por capas (routes, controllers, services)
- Variables sensibles en `.env`
- `.gitignore` para excluir archivos privados
- Uso de `fetch` con manejo de errores
- Consultas case-insensitive

---