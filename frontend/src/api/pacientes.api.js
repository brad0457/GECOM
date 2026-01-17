import api from './axios';

// Obtener todos los pacientes
export const getPacientes = async () => {
  const res = await api.get('/pacientes');
  return res.data;
};

// Crear un paciente
export const createPaciente = async (paciente) => {
  const res = await api.post('/pacientes', paciente);
  return res.data;
};

// Actualizar un paciente por id
export const updatePaciente = async (id, paciente) => {
  const res = await api.put(`/pacientes/${id}`, paciente);
  return res.data;
};

// Eliminar un paciente por id
export const deletePaciente = async (id) => {
  const res = await api.delete(`/pacientes/${id}`);
  return res.data;
};
