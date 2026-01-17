import { Router } from 'express';
import { register, login } from '../controllers/AuthController.js';
import { validarUsuario, manejarValidaciones, soloAdmin } from '../middlewares/validaciones.js';
import { verificarToken } from '../middlewares/authMiddleware.js';

const router = Router();

// Registro de usuario con validaciones
// Solo un admin autenticado puede registrar nuevos usuarios
router.post(
  '/register',
  verificarToken,
  soloAdmin,
  validarUsuario,
  manejarValidaciones,
  register
);

// Login de usuario (abierto a todos)
router.post('/login', login);

export default router;