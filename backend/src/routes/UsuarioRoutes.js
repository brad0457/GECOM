import { Router } from 'express';
import {
  listarUsuarios,
  obtenerUsuario,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario
} from '../controllers/UsuarioController.js';
import { validarUsuario, manejarValidaciones } from '../middlewares/validaciones.js';

const router = Router();

router.get('/', listarUsuarios);
router.get('/:id', obtenerUsuario);
router.post('/', validarUsuario, manejarValidaciones, crearUsuario);
router.put('/:id', validarUsuario, manejarValidaciones, actualizarUsuario);
router.delete('/:id', eliminarUsuario);

export default router;