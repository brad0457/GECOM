import { Router } from 'express';
import {
  listarReportes,
  obtenerReporte,
  crearReporte,
  actualizarReporte,
  eliminarReporte
} from '../controllers/ReporteController.js';
import { validarReporte, manejarValidaciones } from '../middlewares/validaciones.js';

const router = Router();

router.get('/', listarReportes);
router.get('/:id', obtenerReporte);
router.post('/', validarReporte, manejarValidaciones, crearReporte);
router.put('/:id', validarReporte, manejarValidaciones, actualizarReporte);
router.delete('/:id', eliminarReporte);

export default router;