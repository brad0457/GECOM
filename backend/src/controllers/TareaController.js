import { Tarea, Usuario } from '../models/index.js';

export const listarTareas = async (req, res, next) => {
  try {
    const tareas = await Tarea.findAll({ include: [Usuario] });
    res.json({ success: true, data: tareas });
  } catch (error) { next(error); }
};

export const obtenerTarea = async (req, res, next) => {
  try {
    const tarea = await Tarea.findByPk(req.params.id, { include: [Usuario] });
    if (!tarea) return res.status(404).json({ error: 'Tarea no encontrada' });
    res.json({ success: true, data: tarea });
  } catch (error) { next(error); }
};

export const crearTarea = async (req, res, next) => {
  try {
    const { titulo, descripcion, fechaLimite, estado, idUsuario } = req.body;
    const nueva = await Tarea.create({ titulo, descripcion, fechaLimite, estado, idUsuario });
    res.status(201).json({ success: true, data: nueva });
  } catch (error) { next(error); }
};

export const actualizarTarea = async (req, res, next) => {
  try {
    const tarea = await Tarea.findByPk(req.params.id);
    if (!tarea) return res.status(404).json({ error: 'Tarea no encontrada' });
    const { titulo, descripcion, fechaLimite, estado, idUsuario } = req.body;
    await tarea.update({ titulo, descripcion, fechaLimite, estado, idUsuario });
    res.json({ success: true, data: tarea });
  } catch (error) { next(error); }
};

export const eliminarTarea = async (req, res, next) => {
  try {
    const tarea = await Tarea.findByPk(req.params.id);
    if (!tarea) return res.status(404).json({ error: 'Tarea no encontrada' });
    await tarea.destroy();
    res.json({ success: true, message: 'Tarea eliminada' });
  } catch (error) { next(error); }
};