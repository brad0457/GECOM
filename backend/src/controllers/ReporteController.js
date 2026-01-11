import { Reporte, Usuario } from '../models/index.js';

export const listarReportes = async (req, res, next) => {
  try {
    const reportes = await Reporte.findAll({ include: [Usuario] });
    res.json({ success: true, data: reportes });
  } catch (error) { next(error); }
};

export const obtenerReporte = async (req, res, next) => {
  try {
    const reporte = await Reporte.findByPk(req.params.id, { include: [Usuario] });
    if (!reporte) return res.status(404).json({ error: 'Reporte no encontrado' });
    res.json({ success: true, data: reporte });
  } catch (error) { next(error); }
};

export const crearReporte = async (req, res, next) => {
  try {
    const { tipo, fecha, idUsuario } = req.body;
    const nuevo = await Reporte.create({ tipo, fecha, idUsuario });
    res.status(201).json({ success: true, data: nuevo });
  } catch (error) { next(error); }
};

export const actualizarReporte = async (req, res, next) => {
  try {
    const reporte = await Reporte.findByPk(req.params.id);
    if (!reporte) return res.status(404).json({ error: 'Reporte no encontrado' });
    const { tipo, fecha, idUsuario } = req.body;
    await reporte.update({ tipo, fecha, idUsuario });
    res.json({ success: true, data: reporte });
  } catch (error) { next(error); }
};

export const eliminarReporte = async (req, res, next) => {
  try {
    const reporte = await Reporte.findByPk(req.params.id);
    if (!reporte) return res.status(404).json({ error: 'Reporte no encontrado' });
    await reporte.destroy();
    res.json({ success: true, message: 'Reporte eliminado' });
  } catch (error) { next(error); }
};