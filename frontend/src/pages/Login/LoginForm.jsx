import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../../api/axios";
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';

function LoginForm() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!correo || !password) {
      toast.error('Completa todos los campos');
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/auth/login', { correo, password });
      login(res.data.token);
      toast.success('Bienvenido');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Credenciales inválidas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8"
    >
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl mb-3">
          G
        </div>
        <p className="text-gray-500 text-sm">Accede a tu cuenta</p>
      </div>

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

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 rounded-lg bg-blue-600 text-white transition hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Ingresando...' : 'Ingresar'}
      </button>

      <div className="mt-6 text-center text-sm text-gray-400">
        GECOM · Gestor para Consultorio Médico
      </div>
    </form>
  );
}

export default LoginForm;
