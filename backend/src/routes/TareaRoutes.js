import { Router } from 'express';
import {
  listarTareas,
  obtenerTarea,
  crearTarea,
  actualizarTarea,
  eliminarTarea
} from '../controllers/TareaController.js';
import { validarTarea, validarActualizarTarea, manejarValidaciones, tieneRol } from '../middlewares/validaciones.js';
import { verificarToken } from '../middlewares/authMiddleware.js';

const router = Router();

// Listar tareas: todos los roles autenticados
router.get('/', verificarToken, listarTareas);

// Obtener tarea específica: todos los roles autenticados
router.get('/:id', verificarToken, obtenerTarea);

// Crear tarea: admin, asistente y doctor
router.post('/', verificarToken, tieneRol('admin', 'asistente', 'doctor'), validarTarea, manejarValidaciones, crearTarea);

// Actualizar tarea: todos los roles pueden cambiar estado
router.put('/:id', verificarToken, validarActualizarTarea, manejarValidaciones, actualizarTarea);

// Eliminar tarea: admin, asistente y doctor
router.delete('/:id', verificarToken, tieneRol('admin', 'asistente', 'doctor'), eliminarTarea);

export default router;