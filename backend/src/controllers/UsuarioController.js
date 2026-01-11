import Usuario from '../models/Usuario.js';
import bcrypt from 'bcrypt';

export const listarUsuarios = async (req, res, next) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json({ success: true, data: usuarios });
  } catch (error) {
    next(error);
  }
};

export const obtenerUsuario = async (req, res, next) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ success: true, data: usuario });
  } catch (error) {
    next(error);
  }
};

export const crearUsuario = async (req, res, next) => {
  try {
    const { nombre, correo, contraseña } = req.body;
    const hash = await bcrypt.hash(contraseña, 10);
    const nuevoUsuario = await Usuario.create({ nombre, correo, contraseña: hash });
    res.status(201).json({ success: true, data: nuevoUsuario });
  } catch (error) {
    next(error);
  }
};

export const actualizarUsuario = async (req, res, next) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    const { nombre, correo, contraseña } = req.body;
    const hash = contraseña ? await bcrypt.hash(contraseña, 10) : usuario.contraseña;
    await usuario.update({ nombre, correo, contraseña: hash });
    res.json({ success: true, data: usuario });
  } catch (error) {
    next(error);
  }
};

export const eliminarUsuario = async (req, res, next) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    await usuario.destroy();
    res.json({ success: true, message: 'Usuario eliminado correctamente' });
  } catch (error) {
    next(error);
  }
};