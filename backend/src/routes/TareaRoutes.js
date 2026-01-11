import { Router } from 'express';
import {
  listarTareas,
  obtenerTarea,
  crearTarea,
  actualizarTarea,
  eliminarTarea
} from '../controllers/TareaController.js';
import { validarTarea, manejarValidaciones } from '../middlewares/validaciones.js';

const router = Router();

router.get('/', listarTareas);
router.get('/:id', obtenerTarea);
router.post('/', validarTarea, manejarValidaciones, crearTarea);
router.put('/:id', validarTarea, manejarValidaciones, actualizarTarea);
router.delete('/:id', eliminarTarea);

export default router;