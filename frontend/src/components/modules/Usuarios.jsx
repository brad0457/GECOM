import { useState, useEffect, useContext } from 'react';
import api from '../../api/axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';
import UsuarioModal from './UsuarioModal';

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [usuarioEditar, setUsuarioEditar] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      const res = await api.get('/usuarios');
      setUsuarios(res.data.data);
    } catch (error) {
      toast.error('Error al cargar usuarios');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const eliminarUsuario = async (id) => {
    if (!confirm('¿Eliminar este usuario?')) return;
    
    try {
      await api.delete(`/usuarios/${id}`);
      toast.success('Usuario eliminado');
      cargarUsuarios();
    } catch (error) {
      toast.error('Error al eliminar');
    }
  };

  const abrirModalCrear = () => {
    setUsuarioEditar(null);
    setModalAbierto(true);
  };

  const abrirModalEditar = (usuario) => {
    setUsuarioEditar(usuario);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setUsuarioEditar(null);
  };

  const guardarUsuario = async (formData) => {
    try {
      if (usuarioEditar) {
        // Editar
        const datos = { ...formData };
        if (!datos.password) delete datos.password; // No enviar si está vacío
        
        await api.put(`/usuarios/${usuarioEditar.idUsuario}`, datos);
        toast.success('Usuario actualizado');
      } else {
        // Crear
        await api.post('/usuarios', formData);
        toast.success('Usuario creado');
      }
      cerrarModal();
      cargarUsuarios();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al guardar');
    }
  };

  const esAdmin = user?.rol === 'admin';

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="text-teal-600">Cargando usuarios...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-teal-900">Usuarios</h2>
        {esAdmin && (
          <button 
            onClick={abrirModalCrear}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition font-medium"
          >
            + Nuevo Usuario
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-teal-50 border-b-2 border-teal-200">
              <th className="text-left p-3 text-teal-800 font-semibold">ID</th>
              <th className="text-left p-3 text-teal-800 font-semibold">Nombre</th>
              <th className="text-left p-3 text-teal-800 font-semibold">Correo</th>
              <th className="text-left p-3 text-teal-800 font-semibold">Rol</th>
              {esAdmin && <th className="text-left p-3 text-teal-800 font-semibold">Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {usuarios.length === 0 ? (
              <tr>
                <td colSpan={esAdmin ? "5" : "4"} className="text-center p-8 text-teal-600">
                  No hay usuarios registrados
                </td>
              </tr>
            ) : (
              usuarios.map((usuario) => (
                <tr key={usuario.idUsuario} className="border-b border-teal-100 hover:bg-teal-50 transition">
                  <td className="p-3 text-teal-900">{usuario.idUsuario}</td>
                  <td className="p-3 text-teal-900 font-medium">{usuario.nombre}</td>
                  <td className="p-3 text-teal-700">{usuario.correo}</td>
                  <td className="p-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      usuario.rol === 'admin' ? 'bg-red-100 text-red-700' :
                      usuario.rol === 'doctor' ? 'bg-blue-100 text-blue-700' :
                      usuario.rol === 'enfermera' ? 'bg-green-100 text-green-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {usuario.rol}
                    </span>
                  </td>
                  {esAdmin && (
                    <td className="p-3">
                      <button 
                        onClick={() => abrirModalEditar(usuario)}
                        className="text-teal-600 hover:text-teal-800 mr-3 font-medium"
                      >
                        Editar
                      </button>
                      <button 
                        onClick={() => eliminarUsuario(usuario.idUsuario)}
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
        <UsuarioModal 
          usuario={usuarioEditar}
          onClose={cerrarModal}
          onGuardar={guardarUsuario}
        />
      )}
    </div>
  );
}

export default Usuarios;