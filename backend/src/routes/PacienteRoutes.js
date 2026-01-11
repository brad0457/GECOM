import { Router } from 'express';
import {
  listarPacientes,
  obtenerPaciente,
  crearPaciente,
  actualizarPaciente,
  eliminarPaciente
} from '../controllers/PacienteController.js';
import { validarPaciente, manejarValidaciones } from '../middlewares/validaciones.js';

const router = Router();

router.get('/', listarPacientes);
router.get('/:id', obtenerPaciente);
router.post('/', validarPaciente, manejarValidaciones, crearPaciente);
router.put('/:id', validarPaciente, manejarValidaciones, actualizarPaciente);
router.delete('/:id', eliminarPaciente);

export default router;