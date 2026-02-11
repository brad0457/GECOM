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

// Cambiar contraseña del usuario actual (cualquier rol autenticado)
router.put('/cambiar-password', verificarToken, cambiarPassword);

// Rutas de listado
router.get('/', verificarToken, listarUsuarios);

// Solo admin puede crear usuarios
router.post('/', verificarToken, soloAdmin, validarUsuario, manejarValidaciones, crearUsuario);

// Rutas con :id
router.get('/:id', verificarToken, obtenerUsuario);
router.put('/:id', verificarToken, soloAdmin, validarActualizarUsuario, manejarValidaciones, actualizarUsuario);
router.delete('/:id', verificarToken, soloAdmin, eliminarUsuario);

export default router;