const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// MIDDLEWARES
app.use(cors());
app.use(bodyParser.json());

// RUTAS API
const appointmentsRouter = require('./routes/appointments.routes');
app.use('/appointments', appointmentsRouter);

const userRoutes = require('./routes/user.routes');
app.use('/users', userRoutes);

// Rutas HTML
app.get('/user/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/login.html'));
});

app.get('/user/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/register.html'));
});

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, '../../public')));

app.get('/', (req, res) => {
  res.redirect('/user/login');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});