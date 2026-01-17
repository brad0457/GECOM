import { Router } from 'express';
import {
  listarCitas,
  obtenerCita,
  crearCita,
  actualizarCita,
  eliminarCita
} from '../controllers/CitaController.js';
import { validarCita, manejarValidaciones, tieneRol } from '../middlewares/validaciones.js';
import { verificarToken } from '../middlewares/authMiddleware.js';

const router = Router();

// Listar todas las citas: admin, asistente, doctor, enfermera
router.get('/', verificarToken, tieneRol('admin', 'asistente', 'doctor', 'enfermera'), listarCitas);

// Obtener una cita específica: admin, asistente, doctor, enfermera
router.get('/:id', verificarToken, tieneRol('admin', 'asistente', 'doctor', 'enfermera'), obtenerCita);

// Crear una cita: admin y asistente
router.post('/', verificarToken, tieneRol('admin', 'asistente'), validarCita, manejarValidaciones, crearCita);

// Actualizar una cita: admin, asistente, doctor, enfermera
router.put('/:id', verificarToken, tieneRol('admin', 'asistente', 'doctor', 'enfermera'), validarCita, manejarValidaciones, actualizarCita);

// Eliminar una cita: admin y asistente
router.delete('/:id', verificarToken, tieneRol('admin', 'asistente'), eliminarCita);

export default router;