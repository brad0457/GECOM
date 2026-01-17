import { Router } from 'express';
import {
  listarUsuarios,
  obtenerUsuario,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario
} from '../controllers/UsuarioController.js';
import { validarUsuario, manejarValidaciones, soloAdmin } from '../middlewares/validaciones.js';
import { verificarToken } from '../middlewares/authMiddleware.js';

const router = Router();

// Solo admin puede listar todos los usuarios
router.get('/', verificarToken, soloAdmin, listarUsuarios);

// Solo admin puede obtener un usuario específico
router.get('/:id', verificarToken, soloAdmin, obtenerUsuario);

// Solo admin puede crear usuarios
router.post('/', verificarToken, soloAdmin, validarUsuario, manejarValidaciones, crearUsuario);

// Solo admin puede actualizar usuarios
router.put('/:id', verificarToken, soloAdmin, validarUsuario, manejarValidaciones, actualizarUsuario);

// Solo admin puede eliminar usuarios
router.delete('/:id', verificarToken, soloAdmin, eliminarUsuario);

export default router;