import { Request, Response } from 'express';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path')
const bycrypt = require('bcrypt');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 3000;

//MIDDLEWARES
app.use(cors());
app.use(bodyParser.json());

// RUTAS API
const appointmentsRouter = require('./routes/appointments.routes');
app.use('/appointments', appointmentsRouter);

const userRoutes = require('./routes/user.routes');
app.use('/users', userRoutes);



app.get('/user/login', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../public/login.html'));
});

app.get('/user/register', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../public/register.html'));
});

//Servir el frontend desde la carpeta public
app.use(express.static(path.join(__dirname, '../../public')));

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
})