import { Router } from 'express';
import {
  listarCitas,
  obtenerCita,
  crearCita,
  actualizarCita,
  eliminarCita
} from '../controllers/CitaController.js';
import { validarCita, validarActualizarCita, manejarValidaciones, tieneRol } from '../middlewares/validaciones.js';
import { verificarToken } from '../middlewares/authMiddleware.js';

const router = Router();

// Listar todas las citas: todos los roles autenticados
router.get('/', verificarToken, listarCitas);

// Obtener una cita específica: todos los roles autenticados
router.get('/:id', verificarToken, obtenerCita);

// Crear una cita: admin, asistente y doctor
router.post('/', verificarToken, tieneRol('admin', 'asistente', 'doctor'), validarCita, manejarValidaciones, crearCita);

// Actualizar una cita: admin, asistente, doctor, enfermera
router.put('/:id', verificarToken, tieneRol('admin', 'asistente', 'doctor', 'enfermera'), validarActualizarCita, manejarValidaciones, actualizarCita);

// Eliminar una cita: admin, asistente y doctor
router.delete('/:id', verificarToken, tieneRol('admin', 'asistente', 'doctor'), eliminarCita);

export default router;