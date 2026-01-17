import { Router } from 'express';
import {
  listarTareas,
  obtenerTarea,
  crearTarea,
  actualizarTarea,
  eliminarTarea
} from '../controllers/TareaController.js';
import { validarTarea, manejarValidaciones, tieneRol } from '../middlewares/validaciones.js';
import { verificarToken } from '../middlewares/authMiddleware.js';

const router = Router();

// Listar tareas: admin, asistente, doctor, enfermera
router.get('/', verificarToken, tieneRol('admin', 'asistente', 'doctor', 'enfermera'), listarTareas);

// Obtener tarea específica: admin, asistente, doctor, enfermera
router.get('/:id', verificarToken, tieneRol('admin', 'asistente', 'doctor', 'enfermera'), obtenerTarea);

// Crear tarea: admin y asistente
router.post('/', verificarToken, tieneRol('admin', 'asistente'), validarTarea, manejarValidaciones, crearTarea);

// Actualizar tarea: admin, asistente, doctor, enfermera
router.put('/:id', verificarToken, tieneRol('admin', 'asistente', 'doctor', 'enfermera'), validarTarea, manejarValidaciones, actualizarTarea);

// Eliminar tarea: admin y asistente
router.delete('/:id', verificarToken, tieneRol('admin', 'asistente'), eliminarTarea);

export default router;