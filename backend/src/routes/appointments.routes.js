const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth.middleware');

// Controladores
const {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment
} = require('../controllers/appointments.controllers');

// Rutas
router.get('/', verifyToken, getAppointments);           // GET /appointments
router.post('/', verifyToken, createAppointment);        // POST /appointments
router.put('/:id', verifyToken, updateAppointment);      // PUT /appointments/:id
router.delete('/:id', verifyToken, deleteAppointment);   // DELETE /appointments/:id

module.exports = router;