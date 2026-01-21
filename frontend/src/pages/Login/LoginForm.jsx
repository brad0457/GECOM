import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../../api/axios";
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';

function LoginForm() {
  // Estados para manejar los campos del formulario y estado de carga.
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Contexto de autenticación y navegación.
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Función para manejar el envío del formulario.
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica de campos requeridos.
    if (!correo || !password) {
      toast.error('Completa todos los campos');
      return;
    }

    setLoading(true);
    try {
      // Solicitud de autenticación al servidor.
      const res = await api.post('/auth/login', { correo, password });
      
      // Actualización del estado de autenticación.
      login(res.data.token);
      toast.success('Bienvenido');
      
      // Redirección al dashboard después del login exitoso.
      navigate('/dashboard');
    } catch (error) {
      // Manejo de errores de autenticación
      toast.error(error.response?.data?.message || 'Credenciales inválidas');
    } finally {
      // Restablecimiento del estado de carga independientemente del resultado.
      setLoading(false);
    }
  };

  // Renderizado del formulario.
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8"
    >
      {/* Encabezado con logo o ícono */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl mb-3">
          G
        </div>
        <p className="text-gray-500 text-sm">Accede a tu cuenta</p>
      </div>

      {/* Campo para correo electrónico */}
      <div className="mb-5">
        <label htmlFor="correo" className="block text-sm text-gray-600 mb-1">
          Correo
        </label>
        <input
          id="correo"
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          disabled={loading}
          placeholder="correo@ejemplo.com"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Campo para contraseña */}
      <div className="mb-6">
        <label htmlFor="password" className="block text-sm text-gray-600 mb-1">
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          placeholder="••••••••"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Botón de envío del formulario */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 rounded-lg bg-blue-600 text-white transition hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Ingresando...' : 'Ingresar'}
      </button>

      {/* Pie de página con nombre de la aplicación */}
      <div className="mt-6 text-center text-sm text-gray-400">
        GECOM · Gestor para Consultorio Médico
      </div>
    </form>
  );
}

export default LoginForm;