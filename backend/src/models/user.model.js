const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../data/users.json');

// Leer todos los usuarios
function getAllUsers() {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

// Guardar todos los usuarios
function saveUsers(users) {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}

// Buscar usuario por email
function getUserByEmail(email) {
  const users = getAllUsers();
  return users.find(user => user.email.toLowerCase() === email.toLowerCase());
}

// Agregar nuevo usuario
function addUser(user) {
  const users = getAllUsers();
  users.push(user);
  saveUsers(users);
}

module.exports = {
  getAllUsers,
  saveUsers,
  getUserByEmail,
  addUser
};