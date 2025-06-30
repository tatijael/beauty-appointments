const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const usersPath = path.join(__dirname, '../data/users.json');

// Leer usuarios
const readUsers = () => {
  if (!fs.existsSync(usersPath)) return [];
  return JSON.parse(fs.readFileSync(usersPath));
};

// Escribir usuarios
const writeUsers = (data) => {
  fs.writeFileSync(usersPath, JSON.stringify(data, null, 2));
};

const registerUser = async (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();

  if (users.find(u => u.username.toLowerCase() === username.toLowerCase())) {
    return res.status(400).json({ error: 'El usuario ya existe' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  writeUsers(users);

  res.status(201).json({ message: 'Usuario registrado correctamente' });
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();

  const user = users.find(u => u.username.toLowerCase() === username.toLowerCase());
  if (!user) return res.status(400).json({ error: 'Credenciales inválidas' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: 'Credenciales inválidas' });

  const token = jwt.sign({ username, name: username }, process.env.JWT_SECRET || 'secreto123');

  res.json({ message: 'Login exitoso', token });
};

module.exports = {
  registerUser,
  loginUser
};