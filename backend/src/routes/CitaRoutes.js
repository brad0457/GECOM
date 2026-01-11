import { Router } from 'express';
import {
  listarCitas,
  obtenerCita,
  crearCita,
  actualizarCita,
  eliminarCita
} from '../controllers/CitaController.js';
import { validarCita, manejarValidaciones } from '../middlewares/validaciones.js';

const router = Router();

router.get('/', listarCitas);
router.get('/:id', obtenerCita);
router.post('/', validarCita, manejarValidaciones, crearCita);
router.put('/:id', validarCita, manejarValidaciones, actualizarCita);
router.delete('/:id', eliminarCita);

export default router;