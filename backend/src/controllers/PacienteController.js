import Paciente from '../models/Paciente.js';

export const listarPacientes = async (req, res, next) => {
  try {
    const pacientes = await Paciente.findAll();
    res.json({ success: true, data: pacientes });
  } catch (error) {
    next(error);
  }
};

export const obtenerPaciente = async (req, res, next) => {
  try {
    const paciente = await Paciente.findByPk(req.params.id);
    if (!paciente) return res.status(404).json({ error: 'Paciente no encontrado' });
    res.json({ success: true, data: paciente });
  } catch (error) {
    next(error);
  }
};

export const crearPaciente = async (req, res, next) => {
  try {
    const { nombre, documento, fechaNacimiento, contacto } = req.body;
    const nuevo = await Paciente.create({ nombre, documento, fechaNacimiento, contacto });
    res.status(201).json({ success: true, data: nuevo });
  } catch (error) {
    next(error);
  }
};

export const actualizarPaciente = async (req, res, next) => {
  try {
    const paciente = await Paciente.findByPk(req.params.id);
    if (!paciente) return res.status(404).json({ error: 'Paciente no encontrado' });

    const { nombre, documento, fechaNacimiento, contacto } = req.body;
    await paciente.update({ nombre, documento, fechaNacimiento, contacto });
    res.json({ success: true, data: paciente });
  } catch (error) {
    next(error);
  }
};

export const eliminarPaciente = async (req, res, next) => {
  try {
    const paciente = await Paciente.findByPk(req.params.id);
    if (!paciente) return res.status(404).json({ error: 'Paciente no encontrado' });

    await paciente.destroy();
    res.json({ success: true, message: 'Paciente eliminado' });
  } catch (error) {
    next(error);
  }
};