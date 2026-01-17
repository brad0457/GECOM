import Paciente from '../models/Paciente.js';

// Listar todos los pacientes
export const listarPacientes = async (req, res, next) => {
  try {
    const pacientes = await Paciente.findAll();
    res.json(pacientes);
  } catch (error) {
    next(error);
  }
};

// Obtener un paciente por ID
export const obtenerPaciente = async (req, res, next) => {
  try {
    const paciente = await Paciente.findByPk(req.params.id);
    if (!paciente) return res.status(404).json({ error: 'Paciente no encontrado' });
    res.json(paciente); 
  } catch (error) {
    next(error);
  }
};

// Crear un paciente
export const crearPaciente = async (req, res, next) => {
  try {
    const { nombre, documento, fechaNacimiento, contacto } = req.body;
    const nuevo = await Paciente.create({ nombre, documento, fechaNacimiento, contacto });
    res.status(201).json(nuevo); 
  } catch (error) {
    next(error);
  }
};

// Actualizar un paciente
export const actualizarPaciente = async (req, res, next) => {
  try {
    const paciente = await Paciente.findByPk(req.params.id);
    if (!paciente) return res.status(404).json({ error: 'Paciente no encontrado' });

    const { nombre, documento, fechaNacimiento, contacto } = req.body;
    await paciente.update({ nombre, documento, fechaNacimiento, contacto });
    res.json(paciente);
  } catch (error) {
    next(error);
  }
};

// Eliminar un paciente
export const eliminarPaciente = async (req, res, next) => {
  try {
    const paciente = await Paciente.findByPk(req.params.id);
    if (!paciente) return res.status(404).json({ error: 'Paciente no encontrado' });

    await paciente.destroy();
    res.json({ message: 'Paciente eliminado' });
  } catch (error) {
    next(error);
  }
};