import { useState, useEffect } from 'react';

function UsuarioModal({ usuario, onClose, onGuardar }) {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    password: '',
    rol: 'asistente'
  });

  useEffect(() => {
    if (usuario) {
      setFormData({
        nombre: usuario.nombre,
        correo: usuario.correo,
        password: '',
        rol: usuario.rol
      });
    }
  }, [usuario]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuardar(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-2xl">
        <h2 className="text-2xl font-bold text-teal-900 mb-6">
          {usuario ? 'Editar Usuario' : 'Nuevo Usuario'}
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-teal-700 mb-2">
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border-2 border-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-teal-700 mb-2">
              Correo
            </label>
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border-2 border-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-teal-700 mb-2">
              Contraseña {usuario && '(dejar vacío para no cambiar)'}
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required={!usuario}
              placeholder={usuario ? 'Nueva contraseña (opcional)' : 'Contraseña'}
              className="w-full px-4 py-3 rounded-lg border-2 border-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-teal-700 mb-2">
              Rol
            </label>
            <select
              name="rol"
              value={formData.rol}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-2 border-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="admin">Admin</option>
              <option value="doctor">Doctor</option>
              <option value="enfermera">Enfermera</option>
              <option value="asistente">Asistente</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSubmit}
            className="flex-1 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-semibold transition"
          >
            {usuario ? 'Actualizar' : 'Crear'}
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold transition"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default UsuarioModal;