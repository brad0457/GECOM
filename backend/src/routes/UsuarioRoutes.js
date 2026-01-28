import { Router } from 'express';
import {
  listarUsuarios,
  obtenerUsuario,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  cambiarPassword
} from '../controllers/UsuarioController.js';
import { validarUsuario, validarActualizarUsuario, manejarValidaciones, soloAdmin } from '../middlewares/validaciones.js';
import { verificarToken } from '../middlewares/authMiddleware.js';

const router = Router();

// IMPORTANTE: Rutas específicas deben ir ANTES de rutas con parámetros

// Cambiar contraseña del usuario actual (cualquier rol autenticado) - PRIMERO
router.put('/cambiar-password', verificarToken, cambiarPassword);

// Rutas de listado
router.get('/', verificarToken, listarUsuarios);

// Solo admin puede crear usuarios
router.post('/', verificarToken, soloAdmin, validarUsuario, manejarValidaciones, crearUsuario);

// Rutas con :id van AL FINAL
router.get('/:id', verificarToken, obtenerUsuario);
router.put('/:id', verificarToken, soloAdmin, validarActualizarUsuario, manejarValidaciones, actualizarUsuario);
router.delete('/:id', verificarToken, soloAdmin, eliminarUsuario);

export default router;