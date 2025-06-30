const {
  getAllAppointments,
  saveAppointments,
  getAppointmentById,
} = require('../models/appointments.model');

const { generateId, validateAppointment } = require('../services/data.service');
const { verifyToken } = require('../middleware/auth.middleware');

// GET /appointments
function getAppointments(req, res) {
  const { cliente } = req.query;
  let appointments = getAllAppointments();

  if (cliente) {
    const filtro = cliente.toLowerCase();
    appointments = appointments.filter(app => app.cliente?.toLowerCase() === filtro);
  }

  res.json(appointments);
}

// POST /appointments
function createAppointment(req, res) {
  const newAppointment = req.body;
  const username = req.user?.username || 'desconocido';

  if (!validateAppointment(newAppointment)) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  const appointments = getAllAppointments();
  const newId = generateId(appointments);

  const appointmentWithId = { id: newId, ...newAppointment, user: username };
  appointments.push(appointmentWithId);
  saveAppointments(appointments);

  res.status(201).json(appointmentWithId);
}

// PUT /appointments/:id
function updateAppointment(req, res) {
  const id = parseInt(req.params.id);
  const updatedData = req.body;

  let appointments = getAllAppointments();
  const index = appointments.findIndex(app => app.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Cita no encontrada' });
  }

  appointments[index] = { ...appointments[index], ...updatedData };
  saveAppointments(appointments);

  res.json(appointments[index]);
}

// DELETE /appointments/:id
function deleteAppointment(req, res) {
  const id = parseInt(req.params.id);
  let appointments = getAllAppointments();

  const exists = appointments.some(app => app.id === id);
  if (!exists) {
    return res.status(404).json({ error: 'Cita no encontrada' });
  }

  appointments = appointments.filter(app => app.id !== id);
  saveAppointments(appointments);

  res.json({ message: 'Cita eliminada correctamente' });
}

module.exports = {
  getAppointments: [verifyToken, getAppointments],
  createAppointment: [verifyToken, createAppointment],
  updateAppointment: [verifyToken, updateAppointment],
  deleteAppointment: [verifyToken, deleteAppointment],
};