import { Router } from 'express';
import {
  listarPacientes,
  obtenerPaciente,
  crearPaciente,
  actualizarPaciente,
  eliminarPaciente
} from '../controllers/PacienteController.js';
import { validarPaciente, validarActualizarPaciente, manejarValidaciones, adminOAsistente } from '../middlewares/validaciones.js';
import { verificarToken } from '../middlewares/authMiddleware.js';

const router = Router();

// Todos los usuarios autenticados pueden listar y ver
router.get('/', verificarToken, listarPacientes);
router.get('/:id', verificarToken, obtenerPaciente);

// Solo admin y asistente pueden crear, actualizar y eliminar
router.post('/', verificarToken, adminOAsistente, validarPaciente, manejarValidaciones, crearPaciente);
router.put('/:id', verificarToken, adminOAsistente, validarActualizarPaciente, manejarValidaciones, actualizarPaciente);
router.delete('/:id', verificarToken, adminOAsistente, eliminarPaciente);

export default router;