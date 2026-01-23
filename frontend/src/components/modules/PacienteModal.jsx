import { useState, useEffect } from 'react';

function PacienteModal({ paciente, onClose, onGuardar }) {
  const [formData, setFormData] = useState({
    nombre: '',
    documento: '',
    fechaNacimiento: '',
    contacto: ''
  });

  useEffect(() => {
    if (paciente) {
      setFormData({
        nombre: paciente.nombre,
        documento: paciente.documento,
        fechaNacimiento: paciente.fechaNacimiento,
        contacto: paciente.contacto || ''
      });
    }
  }, [paciente]);

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
          {paciente ? 'Editar Paciente' : 'Nuevo Paciente'}
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-teal-700 mb-2">
              Nombre Completo
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
              Documento
            </label>
            <input
              type="text"
              name="documento"
              value={formData.documento}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border-2 border-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-teal-700 mb-2">
              Fecha de Nacimiento
            </label>
            <input
              type="date"
              name="fechaNacimiento"
              value={formData.fechaNacimiento}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border-2 border-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-teal-700 mb-2">
              Contacto (opcional)
            </label>
            <input
              type="text"
              name="contacto"
              value={formData.contacto}
              onChange={handleChange}
              placeholder="Teléfono o email"
              className="w-full px-4 py-3 rounded-lg border-2 border-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSubmit}
            className="flex-1 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-semibold transition"
          >
            {paciente ? 'Actualizar' : 'Crear'}
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

export default PacienteModal;