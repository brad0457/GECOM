import { Router } from 'express';
import { register, login } from '../controllers/AuthController.js';
import { validarUsuario, manejarValidaciones } from '../middlewares/validaciones.js';

const router = Router();

// Registro de usuario con validaciones
router.post('/register', validarUsuario, manejarValidaciones, register);

// Login de usuario
router.post('/login', login);

export default router;