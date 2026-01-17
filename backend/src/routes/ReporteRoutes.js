import { Router } from 'express';
import {
  listarReportes,
  obtenerReporte,
  crearReporte,
  actualizarReporte,
  eliminarReporte
} from '../controllers/ReporteController.js';
import { validarReporte, manejarValidaciones, tieneRol } from '../middlewares/validaciones.js';
import { verificarToken } from '../middlewares/authMiddleware.js';

const router = Router();

// Listar reportes: admin y doctor
router.get('/', verificarToken, tieneRol('admin', 'doctor'), listarReportes);

// Obtener un reporte específico: admin y doctor
router.get('/:id', verificarToken, tieneRol('admin', 'doctor'), obtenerReporte);

// Crear reporte: admin y doctor
router.post('/', verificarToken, tieneRol('admin', 'doctor'), validarReporte, manejarValidaciones, crearReporte);

// Actualizar reporte: admin y doctor
router.put('/:id', verificarToken, tieneRol('admin', 'doctor'), validarReporte, manejarValidaciones, actualizarReporte);

// Eliminar reporte: solo admin
router.delete('/:id', verificarToken, tieneRol('admin'), eliminarReporte);

export default router;