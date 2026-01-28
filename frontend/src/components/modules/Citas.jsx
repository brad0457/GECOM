import { useState, useEffect, useContext } from 'react';
import api from '../../api/axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';
import CitaModal from './CitaModal';

function Citas() {
  const obtenerFechaLocal = () => {
    const hoy = new Date();
    const year = hoy.getFullYear();
    const month = String(hoy.getMonth() + 1).padStart(2, '0');
    const day = String(hoy.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [citas, setCitas] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [citaEditar, setCitaEditar] = useState(null);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(obtenerFechaLocal());
  const { user } = useContext(AuthContext);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const [citasRes, pacientesRes, usuariosRes] = await Promise.all([
        api.get('/citas'),
        api.get('/pacientes'),
        api.get('/usuarios')
      ]);
      setCitas(citasRes.data.data);
      setPacientes(pacientesRes.data.data);
      setUsuarios(usuariosRes.data.data);
    } catch (error) {
      toast.error('Error al cargar datos');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const eliminarCita = async (id) => {
    if (!confirm('¿Eliminar esta cita?')) return;
    
    try {
      await api.delete(`/citas/${id}`);
      toast.success('Cita eliminada');
      cargarDatos();
    } catch (error) {
      toast.error('Error al eliminar');
    }
  };

  const abrirModalCrear = (horaInicio = '') => {
    setCitaEditar(null);
    setModalAbierto({ fecha: fechaSeleccionada, hora: horaInicio });
  };

  const abrirModalEditar = (cita) => {
    setCitaEditar(cita);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setCitaEditar(null);
  };

  const guardarCita = async (formData) => {
    try {
      if (citaEditar) {
        await api.put(`/citas/${citaEditar.idCita}`, formData);
        toast.success('Cita actualizada');
      } else {
        await api.post('/citas', formData);
        toast.success('Cita creada');
      }
      cerrarModal();
      cargarDatos();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al guardar');
    }
  };

  const cambiarDia = (dias) => {
    const [year, month, day] = fechaSeleccionada.split('-').map(Number);
    const fecha = new Date(year, month - 1, day);
    fecha.setDate(fecha.getDate() + dias);
    const newYear = fecha.getFullYear();
    const newMonth = String(fecha.getMonth() + 1).padStart(2, '0');
    const newDay = String(fecha.getDate()).padStart(2, '0');
    setFechaSeleccionada(`${newYear}-${newMonth}-${newDay}`);
  };

  const irHoy = () => {
    setFechaSeleccionada(obtenerFechaLocal());
  };

  const formatearFecha = (fecha) => {
    const f = new Date(fecha + 'T00:00:00');
    return f.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  // Generar slots de 30 minutos desde las 8:00 hasta las 20:00
  const generarSlots = () => {
    const slots = [];
    for (let hora = 8; hora < 20; hora++) {
      slots.push(`${hora.toString().padStart(2, '0')}:00`);
      slots.push(`${hora.toString().padStart(2, '0')}:30`);
    }
    return slots;
  };

  // Filtrar citas del día seleccionado
  const citasDelDia = citas.filter(c => c.fecha === fechaSeleccionada);

  // Verificar si un slot está ocupado
  const slotOcupado = (hora) => {
    return citasDelDia.find(c => c.hora.substring(0, 5) === hora);
  };

  const puedeCrear = user?.rol === 'admin' || user?.rol === 'asistente' || user?.rol === 'doctor';
  const puedeEditar = user?.rol === 'admin' || user?.rol === 'asistente' || user?.rol === 'doctor' || user?.rol === 'enfermera';

  const getEstadoColor = (estado) => {
    switch(estado) {
      case 'pendiente': return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'completada': return 'bg-green-100 border-green-300 text-green-800';
      case 'cancelada': return 'bg-red-100 border-red-300 text-red-800';
      default: return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="text-teal-600">Cargando citas...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-teal-900">Citas</h2>
        {puedeCrear && (
          <button 
            onClick={() => abrirModalCrear()}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition font-medium"
          >
            + Nueva Cita
          </button>
        )}
      </div>

      {/* Navegación de fecha */}
      <div className="bg-white border border-teal-200 rounded-lg p-4 mb-6 flex items-center justify-between">
        <button
          onClick={() => cambiarDia(-1)}
          className="px-4 py-2 bg-teal-100 text-teal-700 rounded-lg hover:bg-teal-200 transition font-medium"
        >
          ← Anterior
        </button>
        
        <div className="text-center">
          <div className="text-xl font-bold text-teal-900 capitalize">
            {formatearFecha(fechaSeleccionada)}
          </div>
          <button
            onClick={irHoy}
            className="text-sm text-teal-600 hover:text-teal-800 underline mt-1"
          >
            Ir a hoy
          </button>
        </div>

        <button
          onClick={() => cambiarDia(1)}
          className="px-4 py-2 bg-teal-100 text-teal-700 rounded-lg hover:bg-teal-200 transition font-medium"
        >
          Siguiente →
        </button>
      </div>

      {/* Tabla de horarios */}
      <div className="bg-white border border-teal-200 rounded-lg overflow-hidden">
        <div className="max-h-[600px] overflow-y-auto">
          <table className="w-full border-collapse">
            <thead className="sticky top-0 bg-teal-50 border-b-2 border-teal-200">
              <tr>
                <th className="text-left p-3 text-teal-800 font-semibold w-32">Hora</th>
                <th className="text-left p-3 text-teal-800 font-semibold">Cita</th>
              </tr>
            </thead>
            <tbody>
              {generarSlots().map((hora) => {
                const cita = slotOcupado(hora);
                return (
                  <tr key={hora} className="border-b border-teal-100 hover:bg-teal-50 transition">
                    <td className="p-3 text-teal-900 font-semibold align-top">
                      {hora}
                    </td>
                    <td className="p-3">
                      {cita ? (
                        <div className={`border-2 rounded-lg p-3 ${getEstadoColor(cita.estado)}`}>
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="font-bold text-sm mb-1">
                                {cita.Paciente?.nombre || 'N/A'}
                              </div>
                              <div className="text-xs mb-1">
                                <strong>Con:</strong> {cita.Usuario?.nombre || 'N/A'}
                              </div>
                              <div className="text-xs mb-1">
                                <strong>Motivo:</strong> {cita.motivo}
                              </div>
                              {cita.observaciones && (
                                <div className="text-xs">
                                  <strong>Obs:</strong> {cita.observaciones}
                                </div>
                              )}
                            </div>
                            {(puedeEditar || puedeCrear) && (
                              <div className="flex gap-2 ml-3">
                                {puedeEditar && (
                                  <button
                                    onClick={() => abrirModalEditar(cita)}
                                    className="text-teal-600 hover:text-teal-800 text-xs font-medium"
                                  >
                                    Editar
                                  </button>
                                )}
                                {puedeCrear && (
                                  <button
                                    onClick={() => eliminarCita(cita.idCita)}
                                    className="text-red-600 hover:text-red-800 text-xs font-medium"
                                  >
                                    Eliminar
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        puedeCrear && (
                          <button
                            onClick={() => abrirModalCrear(hora)}
                            className="w-full text-left text-teal-400 hover:text-teal-600 text-sm py-2 transition"
                          >
                            + Agregar cita
                          </button>
                        )
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Leyenda */}
      <div className="mt-4 flex gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-100 border-2 border-yellow-300 rounded"></div>
          <span className="text-gray-600">Pendiente</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-100 border-2 border-green-300 rounded"></div>
          <span className="text-gray-600">Completada</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-100 border-2 border-red-300 rounded"></div>
          <span className="text-gray-600">Cancelada</span>
        </div>
      </div>

      {modalAbierto && (
        <CitaModal 
          cita={citaEditar}
          fechaInicial={modalAbierto.fecha}
          horaInicial={modalAbierto.hora}
          pacientes={pacientes}
          usuarios={usuarios}
          onClose={cerrarModal}
          onGuardar={guardarCita}
        />
      )}
    </div>
  );
}

export default Citas;