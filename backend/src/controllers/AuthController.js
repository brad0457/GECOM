import Usuario from '../models/Usuario.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Registro de usuario
export const register = async (req, res, next) => {
  try {
    const { nombre, correo, password, rol } = req.body; // <-- añadimos rol

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario con rol
    const usuario = await Usuario.create({
      nombre,
      correo,
      password: hashedPassword,
      rol // <-- guardamos rol en la DB
    });

    res.status(201).json({ success: true, data: usuario });
  } catch (error) {
    console.error('Error al registrar usuario:', error);

    // Devuelve todos los errores de validación
    if (
      error.name === 'SequelizeValidationError' ||
      error.name === 'SequelizeUniqueConstraintError'
    ) {
      return res.status(400).json({
        success: false,
        errors: error.errors.map(e => ({
          field: e.path,
          message: e.message
        }))
      });
    }

    res.status(500).json({ success: false, error: error.message });
  }
};

// Login de usuario
export const login = async (req, res, next) => {
  try {
    const { correo, password } = req.body;

    // Buscar usuario por correo
    const usuario = await Usuario.findOne({ where: { correo } });
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    // Comparar contraseñas
    const valido = await bcrypt.compare(password, usuario.password);
    if (!valido) return res.status(401).json({ error: 'Credenciales inválidas' });

    // Generar token con rol incluido
    const token = jwt.sign(
      { id: usuario.idUsuario, rol: usuario.rol }, // <-- añadimos rol al payload
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Devolvemos token y rol al frontend
    res.json({ success: true, token, rol: usuario.rol });
  } catch (error) {
    next(error);
  }
};