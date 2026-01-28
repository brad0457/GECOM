import { useState, useEffect, useContext } from 'react';
import api from '../../api/axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';
import TareaModal from './TareaModal';

function Tareas() {
  const [tareas, setTareas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [tareaEditar, setTareaEditar] = useState(null);
  const [filtroEstado, setFiltroEstado] = useState('todas');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const [tareasRes, usuariosRes] = await Promise.all([
        api.get('/tareas'),
        api.get('/usuarios')
      ]);
      setTareas(tareasRes.data.data);
      setUsuarios(usuariosRes.data.data);
    } catch (error) {
      toast.error('Error al cargar datos');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const eliminarTarea = async (id) => {
    if (!confirm('¿Eliminar esta tarea?')) return;
    
    try {
      await api.delete(`/tareas/${id}`);
      toast.success('Tarea eliminada');
      cargarDatos();
    } catch (error) {
      toast.error('Error al eliminar');
    }
  };

  const cambiarEstado = async (tarea, nuevoEstado) => {
    try {
      await api.put(`/tareas/${tarea.idTarea}`, {
        ...tarea,
        estado: nuevoEstado
      });
      toast.success('Estado actualizado');
      cargarDatos();
    } catch (error) {
      toast.error('Error al actualizar estado');
    }
  };

  const abrirModalCrear = () => {
    setTareaEditar(null);
    setModalAbierto(true);
  };

  const abrirModalEditar = (tarea) => {
    setTareaEditar(tarea);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setTareaEditar(null);
  };

  const guardarTarea = async (formData) => {
    try {
      if (tareaEditar) {
        await api.put(`/tareas/${tareaEditar.idTarea}`, formData);
        toast.success('Tarea actualizada');
      } else {
        await api.post('/tareas', formData);
        toast.success('Tarea creada');
      }
      cerrarModal();
      cargarDatos();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al guardar');
    }
  };

  const puedeCrear = user?.rol === 'admin' || user?.rol === 'asistente' || user?.rol === 'doctor';

  const getEstadoColor = (estado) => {
    switch(estado) {
      case 'pendiente': return 'bg-yellow-100 text-yellow-700';
      case 'completada': return 'bg-green-100 text-green-700';
      case 'cancelada': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const tareasFiltradas = filtroEstado === 'todas' 
    ? tareas 
    : tareas.filter(t => t.estado === filtroEstado);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="text-teal-600">Cargando tareas...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-teal-900">Tareas</h2>
        <div className="flex gap-3">
          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            className="px-4 py-2 border-2 border-teal-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="todas">Todas</option>
            <option value="pendiente">Pendientes</option>
            <option value="completada">Completadas</option>
            <option value="cancelada">Canceladas</option>
          </select>
          {puedeCrear && (
            <button 
              onClick={abrirModalCrear}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition font-medium"
            >
              + Nueva Tarea
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-teal-50 border-b-2 border-teal-200">
              <th className="text-left p-3 text-teal-800 font-semibold">Título</th>
              <th className="text-left p-3 text-teal-800 font-semibold">Descripción</th>
              <th className="text-left p-3 text-teal-800 font-semibold">Asignado a</th>
              <th className="text-left p-3 text-teal-800 font-semibold">Fecha límite</th>
              <th className="text-left p-3 text-teal-800 font-semibold">Estado</th>
              <th className="text-left p-3 text-teal-800 font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tareasFiltradas.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-8 text-teal-600">
                  No hay tareas {filtroEstado !== 'todas' ? filtroEstado + 's' : 'registradas'}
                </td>
              </tr>
            ) : (
              tareasFiltradas.map((tarea) => (
                <tr key={tarea.idTarea} className="border-b border-teal-100 hover:bg-teal-50 transition">
                  <td className="p-3 text-teal-900 font-semibold">{tarea.titulo}</td>
                  <td className="p-3 text-teal-700 text-sm max-w-xs truncate">
                    {tarea.descripcion || '-'}
                  </td>
                  <td className="p-3 text-teal-700">{tarea.Usuario?.nombre || 'N/A'}</td>
                  <td className="p-3 text-teal-700">{tarea.fechaLimite}</td>
                  <td className="p-3">
                    <select
                      value={tarea.estado}
                      onChange={(e) => cambiarEstado(tarea, e.target.value)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold border-0 cursor-pointer ${getEstadoColor(tarea.estado)}`}
                    >
                      <option value="pendiente">Pendiente</option>
                      <option value="completada">Completada</option>
                      <option value="cancelada">Cancelada</option>
                    </select>
                  </td>
                  <td className="p-3">
                    <button 
                      onClick={() => abrirModalEditar(tarea)}
                      className="text-teal-600 hover:text-teal-800 mr-3 font-medium"
                    >
                      Editar
                    </button>
                    {puedeCrear && (
                      <button 
                        onClick={() => eliminarTarea(tarea.idTarea)}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Eliminar
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {modalAbierto && (
        <TareaModal 
          tarea={tareaEditar}
          usuarios={usuarios}
          onClose={cerrarModal}
          onGuardar={guardarTarea}
        />
      )}
    </div>
  );
}

export default Tareas;