import { Router } from 'express';
import {
  listarUsuarios,
  obtenerUsuario,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario
} from '../controllers/UsuarioController.js';
import { validarUsuario, validarActualizarUsuario, manejarValidaciones, soloAdmin } from '../middlewares/validaciones.js';
import { verificarToken } from '../middlewares/authMiddleware.js';

const router = Router();

// Todos los usuarios autenticados pueden listar
router.get('/', verificarToken, listarUsuarios);
router.get('/:id', verificarToken, obtenerUsuario);

// Solo admin puede crear usuarios
router.post('/', verificarToken, soloAdmin, validarUsuario, manejarValidaciones, crearUsuario);

// Solo admin puede actualizar usuarios (con validación especial)
router.put('/:id', verificarToken, soloAdmin, validarActualizarUsuario, manejarValidaciones, actualizarUsuario);

// Solo admin puede eliminar usuarios
router.delete('/:id', verificarToken, soloAdmin, eliminarUsuario);

export default router;