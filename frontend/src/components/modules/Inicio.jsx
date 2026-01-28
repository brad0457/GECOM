import { useState, useEffect, useContext } from 'react';
import api from '../../api/axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';

function Inicio() {
  const [estadisticas, setEstadisticas] = useState({
    totalPacientes: 0,
    citasHoy: 0,
    tareasPendientes: 0,
    citasPendientesHoy: 0
  });
  const [citasHoy, setCitasHoy] = useState([]);
  const [tareasPendientes, setTareasPendientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  const obtenerFechaLocal = () => {
    const hoy = new Date();
    const year = hoy.getFullYear();
    const month = String(hoy.getMonth() + 1).padStart(2, '0');
    const day = String(hoy.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const [pacientesRes, citasRes, tareasRes] = await Promise.all([
        api.get('/pacientes'),
        api.get('/citas'),
        api.get('/tareas')
      ]);

      const pacientes = pacientesRes.data.data;
      const citas = citasRes.data.data;
      const tareas = tareasRes.data.data;

      const fechaHoy = obtenerFechaLocal();

      // Filtrar citas de hoy
      const citasDeHoy = citas.filter(c => c.fecha === fechaHoy);
      const citasPendientesHoy = citasDeHoy.filter(c => c.estado === 'pendiente');

      // Filtrar tareas pendientes
      const tareasPend = tareas.filter(t => t.estado === 'pendiente');

      setEstadisticas({
        totalPacientes: pacientes.length,
        citasHoy: citasDeHoy.length,
        tareasPendientes: tareasPend.length,
        citasPendientesHoy: citasPendientesHoy.length
      });

      setCitasHoy(citasDeHoy.slice(0, 5)); // Mostrar solo las primeras 5
      setTareasPendientes(tareasPend.slice(0, 5)); // Mostrar solo las primeras 5

    } catch (error) {
      toast.error('Error al cargar datos del dashboard');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getEstadoColorCita = (estado) => {
    switch(estado) {
      case 'pendiente': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'completada': return 'bg-green-100 text-green-700 border-green-300';
      case 'cancelada': return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="text-teal-600">Cargando dashboard...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-teal-900">
          ¡Bienvenido, {user?.nombre || 'Usuario'}!
        </h2>
        <p className="text-teal-600 mt-1">
          {new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Pacientes</p>
              <p className="text-4xl font-bold mt-2">{estadisticas.totalPacientes}</p>
            </div>
            <div className="text-5xl opacity-30">👥</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-teal-100 text-sm font-medium">Citas Hoy</p>
              <p className="text-4xl font-bold mt-2">{estadisticas.citasHoy}</p>
            </div>
            <div className="text-5xl opacity-30">📅</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm font-medium">Citas Pendientes Hoy</p>
              <p className="text-4xl font-bold mt-2">{estadisticas.citasPendientesHoy}</p>
            </div>
            <div className="text-5xl opacity-30">⏰</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Tareas Pendientes</p>
              <p className="text-4xl font-bold mt-2">{estadisticas.tareasPendientes}</p>
            </div>
            <div className="text-5xl opacity-30">✓</div>
          </div>
        </div>
      </div>

      {/* Grid de dos columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Citas de hoy */}
        <div className="bg-white border-2 border-teal-200 rounded-xl p-6">
          <h3 className="text-xl font-bold text-teal-900 mb-4">Citas de Hoy</h3>
          {citasHoy.length === 0 ? (
            <p className="text-teal-600 text-center py-8">No hay citas programadas para hoy</p>
          ) : (
            <div className="space-y-3">
              {citasHoy.map((cita) => (
                <div 
                  key={cita.idCita} 
                  className={`border-2 rounded-lg p-3 ${getEstadoColorCita(cita.estado)}`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="font-bold text-sm">
                        {cita.hora.substring(0, 5)} - {cita.Paciente?.nombre || 'N/A'}
                      </div>
                      <div className="text-xs mt-1">
                        <strong>Doctor:</strong> {cita.Usuario?.nombre || 'N/A'}
                      </div>
                      <div className="text-xs">
                        <strong>Motivo:</strong> {cita.motivo}
                      </div>
                    </div>
                    <span className="px-2 py-1 rounded-full text-xs font-semibold">
                      {cita.estado.charAt(0).toUpperCase() + cita.estado.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tareas pendientes */}
        <div className="bg-white border-2 border-teal-200 rounded-xl p-6">
          <h3 className="text-xl font-bold text-teal-900 mb-4">Tareas Pendientes</h3>
          {tareasPendientes.length === 0 ? (
            <p className="text-teal-600 text-center py-8">No hay tareas pendientes</p>
          ) : (
            <div className="space-y-3">
              {tareasPendientes.map((tarea) => (
                <div 
                  key={tarea.idTarea} 
                  className="border-2 border-yellow-300 bg-yellow-50 rounded-lg p-3"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="font-bold text-sm text-yellow-900">
                        {tarea.titulo}
                      </div>
                      <div className="text-xs text-yellow-700 mt-1">
                        <strong>Asignado a:</strong> {tarea.Usuario?.nombre || 'N/A'}
                      </div>
                      <div className="text-xs text-yellow-700">
                        <strong>Fecha límite:</strong> {tarea.fechaLimite}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mensaje de bienvenida adicional */}
      <div className="mt-6 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-xl p-6 text-white">
        <h3 className="text-xl font-bold mb-2">💡 Accesos Rápidos</h3>
        <p className="text-sm text-teal-100">
          Usa el menú lateral para navegar entre Pacientes, Citas, Usuarios, Tareas y Configuración.
        </p>
      </div>
    </div>
  );
}

export default Inicio;