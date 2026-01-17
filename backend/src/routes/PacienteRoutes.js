import { Router } from 'express';
import {
  listarPacientes,
  obtenerPaciente,
  crearPaciente,
  actualizarPaciente,
  eliminarPaciente
} from '../controllers/PacienteController.js';
import { validarPaciente, manejarValidaciones, tieneRol } from '../middlewares/validaciones.js';
import { verificarToken } from '../middlewares/authMiddleware.js';

const router = Router();

// Listar pacientes: admin, doctor, enfermera, asistente
router.get('/', verificarToken, tieneRol('admin', 'doctor', 'enfermera', 'asistente'), listarPacientes);

// Obtener paciente específico: admin, doctor, enfermera, asistente
router.get('/:id', verificarToken, tieneRol('admin', 'doctor', 'enfermera', 'asistente'), obtenerPaciente);

// Crear paciente: admin, asistente, enfermera
router.post('/', verificarToken, tieneRol('admin', 'asistente', 'enfermera'), validarPaciente, manejarValidaciones, crearPaciente);

// Actualizar paciente: admin, doctor, enfermera
router.put('/:id', verificarToken, tieneRol('admin', 'doctor', 'enfermera'), validarPaciente, manejarValidaciones, actualizarPaciente);

// Eliminar paciente: solo admin
router.delete('/:id', verificarToken, tieneRol('admin'), eliminarPaciente);

export default router;