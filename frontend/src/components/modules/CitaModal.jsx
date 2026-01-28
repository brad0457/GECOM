import { useState, useEffect } from 'react';

function CitaModal({ cita, fechaInicial, horaInicial, pacientes, usuarios, onClose, onGuardar }) {
  const [formData, setFormData] = useState({
    fecha: fechaInicial || '',
    hora: horaInicial || '',
    motivo: '',
    estado: 'pendiente',
    observaciones: '',
    idUsuario: '',
    idPaciente: ''
  });

  useEffect(() => {
    if (cita) {
      setFormData({
        fecha: cita.fecha,
        hora: cita.hora.substring(0, 5),
        motivo: cita.motivo,
        estado: cita.estado,
        observaciones: cita.observaciones || '',
        idUsuario: cita.idUsuario,
        idPaciente: cita.idPaciente
      });
    }
  }, [cita]);

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

  // Generar opciones de hora en intervalos de 30 minutos
  const generarOpcionesHora = () => {
    const opciones = [];
    for (let hora = 8; hora < 20; hora++) {
      opciones.push(`${hora.toString().padStart(2, '0')}:00`);
      opciones.push(`${hora.toString().padStart(2, '0')}:30`);
    }
    return opciones;
  };

  // Filtrar solo doctores
  const doctores = usuarios.filter(u => u.rol === 'doctor');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-xl p-8 w-full max-w-2xl shadow-2xl my-8">
        <h2 className="text-2xl font-bold text-teal-900 mb-6">
          {cita ? 'Editar Cita' : 'Nueva Cita'}
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-teal-700 mb-2">
              Paciente *
            </label>
            <select
              name="idPaciente"
              value={formData.idPaciente}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border-2 border-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
            >
              <option value="">-- Seleccionar paciente --</option>
              {pacientes && pacientes.length > 0 ? (
                pacientes.map((p) => (
                  <option key={p.idPaciente} value={p.idPaciente}>
                    {p.nombre} - {p.documento}
                  </option>
                ))
              ) : (
                <option value="" disabled>No hay pacientes disponibles</option>
              )}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-teal-700 mb-2">
              Doctor *
            </label>
            <select
              name="idUsuario"
              value={formData.idUsuario}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border-2 border-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
            >
              <option value="">-- Seleccionar doctor --</option>
              {doctores && doctores.length > 0 ? (
                doctores.map((u) => (
                  <option key={u.idUsuario} value={u.idUsuario}>
                    Dr. {u.nombre}
                  </option>
                ))
              ) : (
                <option value="" disabled>No hay doctores disponibles</option>
              )}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-teal-700 mb-2">
              Fecha *
            </label>
            <input
              type="date"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border-2 border-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-teal-700 mb-2">
              Hora * (8:00 AM - 8:00 PM)
            </label>
            <select
              name="hora"
              value={formData.hora}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border-2 border-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
            >
              <option value="">-- Seleccionar hora --</option>
              {generarOpcionesHora().map((hora) => (
                <option key={hora} value={hora}>
                  {hora}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-semibold text-teal-700 mb-2">
              Motivo *
            </label>
            <input
              type="text"
              name="motivo"
              value={formData.motivo}
              onChange={handleChange}
              required
              placeholder="Consulta general, control, etc."
              className="w-full px-4 py-3 rounded-lg border-2 border-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
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

          <div className="col-span-2">
            <label className="block text-sm font-semibold text-teal-700 mb-2">
              Observaciones (opcional)
            </label>
            <textarea
              name="observaciones"
              value={formData.observaciones}
              onChange={handleChange}
              rows="3"
              placeholder="Notas adicionales..."
              className="w-full px-4 py-3 rounded-lg border-2 border-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={handleSubmit}
            className="flex-1 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-semibold transition"
          >
            {cita ? 'Actualizar' : 'Crear'}
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

export default CitaModal;