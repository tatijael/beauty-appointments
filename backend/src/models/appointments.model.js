const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/appointments.json');

// Leer todos los turnos
function getAllAppointments() {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

// Guardar todos los turnos (sobrescribe el archivo)
function saveAppointments(appointments) {
  fs.writeFileSync(filePath, JSON.stringify(appointments, null, 2));
}

// Buscar turno por ID
function getAppointmentById(id) {
  const appointments = getAllAppointments();
  return appointments.find(item => item.id === id);
}

module.exports = {
  getAllAppointments,
  saveAppointments,
  getAppointmentById
};