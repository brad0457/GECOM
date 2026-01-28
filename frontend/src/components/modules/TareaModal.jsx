import { useState, useEffect } from 'react';

function TareaModal({ tarea, usuarios, onClose, onGuardar }) {
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    fechaLimite: '',
    estado: 'pendiente',
    idUsuario: ''
  });

  useEffect(() => {
    if (tarea) {
      setFormData({
        titulo: tarea.titulo,
        descripcion: tarea.descripcion || '',
        fechaLimite: tarea.fechaLimite,
        estado: tarea.estado,
        idUsuario: tarea.idUsuario
      });
    }
  }, [tarea]);

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-xl p-8 w-full max-w-2xl shadow-2xl my-8">
        <h2 className="text-2xl font-bold text-teal-900 mb-6">
          {tarea ? 'Editar Tarea' : 'Nueva Tarea'}
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-teal-700 mb-2">
              Título *
            </label>
            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              required
              placeholder="Título de la tarea"
              className="w-full px-4 py-3 rounded-lg border-2 border-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-teal-700 mb-2">
              Descripción (opcional)
            </label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows="4"
              placeholder="Descripción detallada de la tarea..."
              className="w-full px-4 py-3 rounded-lg border-2 border-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-teal-700 mb-2">
                Asignado a *
              </label>
              <select
                name="idUsuario"
                value={formData.idUsuario}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border-2 border-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
              >
                <option value="">-- Seleccionar usuario --</option>
                {usuarios && usuarios.length > 0 ? (
                  usuarios.map((u) => (
                    <option key={u.idUsuario} value={u.idUsuario}>
                      {u.nombre} ({u.rol})
                    </option>
                  ))
                ) : (
                  <option value="" disabled>No hay usuarios disponibles</option>
                )}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-teal-700 mb-2">
                Fecha límite *
              </label>
              <input
                type="date"
                name="fechaLimite"
                value={formData.fechaLimite}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border-2 border-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-teal-700 mb-2">
              Estado
            </label>
            <select
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-2 border-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
            >
              <option value="pendiente">Pendiente</option>
              <option value="completada">Completada</option>
              <option value="cancelada">Cancelada</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={handleSubmit}
            className="flex-1 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-semibold transition"
          >
            {tarea ? 'Actualizar' : 'Crear'}
          </button>
          <button
            type="button"
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

export default TareaModal;