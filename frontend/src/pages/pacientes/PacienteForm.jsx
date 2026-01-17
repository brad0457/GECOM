import { useState, useEffect } from 'react';

function PacienteForm({ onSubmit, paciente, onCancel }) {
  const [nombre, setNombre] = useState('');
  const [documento, setDocumento] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [contacto, setContacto] = useState('');

  // Si estamos editando un paciente, llenar los campos
  useEffect(() => {
    if (paciente) {
      setNombre(paciente.nombre);
      setDocumento(paciente.documento);
      setFechaNacimiento(paciente.fechaNacimiento || '');
      setContacto(paciente.contacto || '');
    }
  }, [paciente]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ nombre, documento, fechaNacimiento, contacto });
    setNombre('');
    setDocumento('');
    setFechaNacimiento('');
    setContacto('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={e => setNombre(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Documento"
        value={documento}
        onChange={e => setDocumento(e.target.value)}
        required
      />
      <input
        type="date"
        placeholder="Fecha de nacimiento"
        value={fechaNacimiento}
        onChange={e => setFechaNacimiento(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Contacto"
        value={contacto}
        onChange={e => setContacto(e.target.value)}
      />
      <button type="submit">{paciente ? 'Actualizar' : 'Crear'}</button>
      {onCancel && <button type="button" onClick={onCancel}>Cancelar</button>}
    </form>
  );
}

export default PacienteForm;