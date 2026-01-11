import { Cita, Usuario, Paciente } from '../models/index.js';

export const listarCitas = async (req, res, next) => {
  try {
    const citas = await Cita.findAll({ include: [Usuario, Paciente] });
    res.json({ success: true, data: citas });
  } catch (error) { next(error); }
};

export const obtenerCita = async (req, res, next) => {
  try {
    const cita = await Cita.findByPk(req.params.id, { include: [Usuario, Paciente] });
    if (!cita) return res.status(404).json({ error: 'Cita no encontrada' });
    res.json({ success: true, data: cita });
  } catch (error) { next(error); }
};

export const crearCita = async (req, res, next) => {
  try {
    const { fecha, hora, motivo, estado, observaciones, idUsuario, idPaciente } = req.body;
    const nueva = await Cita.create({ fecha, hora, motivo, estado, observaciones, idUsuario, idPaciente });
    res.status(201).json({ success: true, data: nueva });
  } catch (error) { next(error); }
};

export const actualizarCita = async (req, res, next) => {
  try {
    const cita = await Cita.findByPk(req.params.id);
    if (!cita) return res.status(404).json({ error: 'Cita no encontrada' });
    const { fecha, hora, motivo, estado, observaciones, idUsuario, idPaciente } = req.body;
    await cita.update({ fecha, hora, motivo, estado, observaciones, idUsuario, idPaciente });
    res.json({ success: true, data: cita });
  } catch (error) { next(error); }
};

export const eliminarCita = async (req, res, next) => {
  try {
    const cita = await Cita.findByPk(req.params.id);
    if (!cita) return res.status(404).json({ error: 'Cita no encontrada' });
    await cita.destroy();
    res.json({ success: true, message: 'Cita eliminada' });
  } catch (error) { next(error); }
};