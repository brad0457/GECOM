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
    const { nombre, correo, password, rol } = req.body;
    const hash = await bcrypt.hash(password, 10);

    const nuevoUsuario = await Usuario.create({
      nombre,
      correo,
      password: hash,
      rol
    });

    res.status(201).json({ success: true, data: nuevoUsuario });
  } catch (error) {
    next(error);
  }
};

export const actualizarUsuario = async (req, res, next) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    const { nombre, correo, password, rol } = req.body;

    // Preparar datos para actualizar
    const datosActualizar = {
      nombre,
      correo,
      rol
    };

    // Solo actualizar password si se envió uno nuevo y no está vacío
    if (password && password.trim() !== '') {
      datosActualizar.password = await bcrypt.hash(password, 10);
    }

    await usuario.update(datosActualizar);

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

export const cambiarPassword = async (req, res, next) => {
  try {
    const { passwordActual, passwordNueva } = req.body;
    const usuarioId = req.usuarioId; // Viene del token

    const usuario = await Usuario.findByPk(usuarioId);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    // Verificar password actual
    const valido = await bcrypt.compare(passwordActual, usuario.password);
    if (!valido) return res.status(401).json({ error: 'Contraseña actual incorrecta' });

    // Actualizar con nueva contraseña
    const hash = await bcrypt.hash(passwordNueva, 10);
    usuario.password = hash;
    await usuario.save();

    res.json({ success: true, message: 'Contraseña actualizada correctamente' });
  } catch (error) {
    next(error);
  }
};