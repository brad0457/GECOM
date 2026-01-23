// LoginForm.jsx
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../../api/axios";
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';

function LoginForm() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!correo.trim() || !password.trim()) {
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
      const message = error.response?.data?.message || 'Credenciales inválidas';
      toast.error(message);
      setPassword('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-center mb-8">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-600 to-cyan-700 flex items-center justify-center text-white text-3xl font-bold mb-4 shadow-lg">
          G
        </div>
        <h1 className="text-2xl font-bold text-teal-900 mb-1">Iniciar Sesión</h1>
        <p className="text-teal-700 text-sm">Accede a tu cuenta</p>
      </div>

      <div className="mb-5">
        <label htmlFor="correo" className="block text-sm font-semibold text-teal-800 mb-2">
          Correo Electrónico
        </label>
        <input
          id="correo"
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          disabled={loading}
          required
          autoComplete="email"
          placeholder="correo@ejemplo.com"
          className="w-full px-4 py-3 rounded-xl border-2 border-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600 transition disabled:bg-gray-50 disabled:cursor-not-allowed text-gray-800 placeholder-teal-400"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="password" className="block text-sm font-semibold text-teal-800 mb-2">
          Contraseña
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
            autoComplete="current-password"
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded-xl border-2 border-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600 transition disabled:bg-gray-50 disabled:cursor-not-allowed pr-12 text-gray-800 placeholder-teal-400"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-teal-600 hover:text-teal-800 transition text-xl"
            tabIndex={-1}
          >
            {showPassword ? 'ocultar' : 'mostrar'}
          </button>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-700 text-white font-semibold transition hover:from-teal-700 hover:to-cyan-800 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
      >
        {loading ? 'Ingresando...' : 'Ingresar'}
      </button>

      <div className="mt-8 text-center">
        <p className="text-xs text-teal-500 font-medium tracking-wide">
          GECOM · Gestor para Consultorio Médico
        </p>
      </div>
    </div>
  );
}

export default LoginForm;