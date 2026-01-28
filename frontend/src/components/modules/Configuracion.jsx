import { useState, useContext } from 'react';
import api from '../../api/axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';

function Configuracion() {
  const [formData, setFormData] = useState({
    passwordActual: '',
    passwordNueva: '',
    passwordConfirmar: ''
  });
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (!formData.passwordActual || !formData.passwordNueva || !formData.passwordConfirmar) {
      toast.error('Completa todos los campos');
      return;
    }

    if (formData.passwordNueva.length < 6) {
      toast.error('La nueva contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (formData.passwordNueva !== formData.passwordConfirmar) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);
    try {
      await api.put('/usuarios/cambiar-password', {
        passwordActual: formData.passwordActual,
        passwordNueva: formData.passwordNueva
      });
      
      toast.success('Contraseña actualizada correctamente');
      
      // Limpiar formulario
      setFormData({
        passwordActual: '',
        passwordNueva: '',
        passwordConfirmar: ''
      });
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error al cambiar contraseña');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-teal-900 mb-6">Configuración</h2>

      {/* Información del usuario */}
      <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-xl p-6 text-white mb-6">
        <h3 className="text-xl font-bold mb-3">Información de la Cuenta</h3>
        <div className="space-y-2">
          <div>
            <span className="text-teal-100 text-sm">Nombre:</span>
            <p className="font-semibold">{user?.nombre || 'N/A'}</p>
          </div>
          <div>
            <span className="text-teal-100 text-sm">Rol:</span>
            <p className="font-semibold capitalize">{user?.rol || 'N/A'}</p>
          </div>
        </div>
      </div>

      {/* Cambiar contraseña */}
      <div className="bg-white border-2 border-teal-200 rounded-xl p-6">
        <h3 className="text-xl font-bold text-teal-900 mb-4">Cambiar Contraseña</h3>
        
        <form className="max-w-md space-y-4">
          <div>
            <label className="block text-sm font-semibold text-teal-700 mb-2">
              Contraseña Actual *
            </label>
            <input
              type="password"
              name="passwordActual"
              value={formData.passwordActual}
              onChange={handleChange}
              required
              placeholder="Ingresa tu contraseña actual"
              className="w-full px-4 py-3 rounded-lg border-2 border-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-teal-700 mb-2">
              Nueva Contraseña *
            </label>
            <input
              type="password"
              name="passwordNueva"
              value={formData.passwordNueva}
              onChange={handleChange}
              required
              placeholder="Mínimo 6 caracteres"
              className="w-full px-4 py-3 rounded-lg border-2 border-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-teal-700 mb-2">
              Confirmar Nueva Contraseña *
            </label>
            <input
              type="password"
              name="passwordConfirmar"
              value={formData.passwordConfirmar}
              onChange={handleChange}
              required
              placeholder="Repite la nueva contraseña"
              className="w-full px-4 py-3 rounded-lg border-2 border-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Actualizando...' : 'Cambiar Contraseña'}
          </button>
        </form>

        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>💡 Recomendaciones:</strong>
          </p>
          <ul className="text-sm text-blue-700 mt-2 space-y-1 list-disc list-inside">
            <li>Usa al menos 6 caracteres</li>
            <li>Combina letras mayúsculas y minúsculas</li>
            <li>Incluye números y símbolos</li>
            <li>No uses contraseñas obvias</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Configuracion;