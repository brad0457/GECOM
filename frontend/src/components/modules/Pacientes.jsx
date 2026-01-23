import { useState, useEffect, useContext } from 'react';
import api from '../../api/axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';
import PacienteModal from './PacienteModal';

function Pacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [pacienteEditar, setPacienteEditar] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    cargarPacientes();
  }, []);

  const cargarPacientes = async () => {
    try {
      const res = await api.get('/pacientes');
      setPacientes(res.data.data);
    } catch (error) {
      toast.error('Error al cargar pacientes');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const eliminarPaciente = async (id) => {
    if (!confirm('¿Eliminar este paciente?')) return;
    
    try {
      await api.delete(`/pacientes/${id}`);
      toast.success('Paciente eliminado');
      cargarPacientes();
    } catch (error) {
      toast.error('Error al eliminar');
    }
  };

  const abrirModalCrear = () => {
    setPacienteEditar(null);
    setModalAbierto(true);
  };

  const abrirModalEditar = (paciente) => {
    setPacienteEditar(paciente);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setPacienteEditar(null);
  };

  const guardarPaciente = async (formData) => {
    try {
      if (pacienteEditar) {
        await api.put(`/pacientes/${pacienteEditar.idPaciente}`, formData);
        toast.success('Paciente actualizado');
      } else {
        await api.post('/pacientes', formData);
        toast.success('Paciente creado');
      }
      cerrarModal();
      cargarPacientes();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al guardar');
    }
  };

  const puedeEditar = user?.rol === 'admin' || user?.rol === 'asistente';

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="text-teal-600">Cargando pacientes...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-teal-900">Pacientes</h2>
        {puedeEditar && (
          <button 
            onClick={abrirModalCrear}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition font-medium"
          >
            + Nuevo Paciente
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-teal-50 border-b-2 border-teal-200">
              <th className="text-left p-3 text-teal-800 font-semibold">ID</th>
              <th className="text-left p-3 text-teal-800 font-semibold">Nombre</th>
              <th className="text-left p-3 text-teal-800 font-semibold">Documento</th>
              <th className="text-left p-3 text-teal-800 font-semibold">Fecha Nacimiento</th>
              <th className="text-left p-3 text-teal-800 font-semibold">Contacto</th>
              {puedeEditar && <th className="text-left p-3 text-teal-800 font-semibold">Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {pacientes.length === 0 ? (
              <tr>
                <td colSpan={puedeEditar ? "6" : "5"} className="text-center p-8 text-teal-600">
                  No hay pacientes registrados
                </td>
              </tr>
            ) : (
              pacientes.map((paciente) => (
                <tr key={paciente.idPaciente} className="border-b border-teal-100 hover:bg-teal-50 transition">
                  <td className="p-3 text-teal-900">{paciente.idPaciente}</td>
                  <td className="p-3 text-teal-900 font-medium">{paciente.nombre}</td>
                  <td className="p-3 text-teal-700">{paciente.documento}</td>
                  <td className="p-3 text-teal-700">{paciente.fechaNacimiento}</td>
                  <td className="p-3 text-teal-700">{paciente.contacto || '-'}</td>
                  {puedeEditar && (
                    <td className="p-3">
                      <button 
                        onClick={() => abrirModalEditar(paciente)}
                        className="text-teal-600 hover:text-teal-800 mr-3 font-medium"
                      >
                        Editar
                      </button>
                      <button 
                        onClick={() => eliminarPaciente(paciente.idPaciente)}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Eliminar
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {modalAbierto && (
        <PacienteModal 
          paciente={pacienteEditar}
          onClose={cerrarModal}
          onGuardar={guardarPaciente}
        />
      )}
    </div>
  );
}

export default Pacientes;