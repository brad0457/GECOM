import Usuario from '../models/Usuario.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Registro de usuario
export const register = async (req, res, next) => {
  try {
    const { nombre, correo, contraseña } = req.body;

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    // Crear usuario
    const usuario = await Usuario.create({
      nombre,
      correo,
      contraseña: hashedPassword
    });

    res.status(201).json({ success: true, data: usuario });
  } catch (error) {
    next(error);
  }
};

// Login de usuario
export const login = async (req, res, next) => {
  try {
    const { correo, contraseña } = req.body;

    // Buscar usuario por correo
    const usuario = await Usuario.findOne({ where: { correo } });
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    // Comparar contraseñas
    const valido = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!valido) return res.status(401).json({ error: 'Credenciales inválidas' });

    // Generar token
    const token = jwt.sign(
      { id: usuario.id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ success: true, token });
  } catch (error) {
    next(error);
  }
};