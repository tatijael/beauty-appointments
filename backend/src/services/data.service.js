// Genera un ID autoincremental
function generateId(appointments) {
  if (!appointments.length) return 1;
  return Math.max(...appointments.map(app => app.id)) + 1;
}

// Valida que los campos requeridos existan
function validateAppointment(appointment) {
  const { fecha, hora, servicio, cliente } = appointment;
  return !!(fecha && hora && servicio && cliente);
}

module.exports = {
  generateId,
  validateAppointment
};