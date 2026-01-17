import { useState, useEffect } from 'react';
import {
  getPacientes,
  createPaciente,
  updatePaciente,
  deletePaciente
} from '../../api/pacientes.api';
import PacienteForm from './PacienteForm';
import { toast } from 'react-toastify';

function Pacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');

  const fetchPacientes = async () => {
    setLoading(true);
    try {
      const data = await getPacientes();
      setPacientes(data);
    } catch (err) {
      toast.error('Error al cargar pacientes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPacientes();
  }, []);

  const handleCreate = async (paciente) => {
    try {
      await createPaciente(paciente);
      fetchPacientes();
      setShowForm(false);
      toast.success('Paciente creado correctamente');
    } catch {
      toast.error('Error al crear paciente');
    }
  };

  const handleUpdate = async (paciente) => {
    try {
      await updatePaciente(editing.idPaciente, paciente);
      fetchPacientes();
      setEditing(null);
      setShowForm(false);
      toast.info('Paciente actualizado ✏️');
    } catch {
      toast.error('Error al actualizar paciente');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar paciente?')) return;
    try {
      await deletePaciente(id);
      fetchPacientes();
      toast.warning('Paciente eliminado');
    } catch {
      toast.error('Error al eliminar paciente');
    }
  };

  // Filtrar pacientes según búsqueda
  const pacientesFiltrados = pacientes.filter(p =>
    p.nombre.toLowerCase().includes(search.toLowerCase()) ||
    p.documento.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Pacientes</h1>

      <button onClick={() => { setShowForm(true); setEditing(null); }}>
        Nuevo Paciente
      </button>

      {showForm && (
        <PacienteForm
          paciente={editing}
          onSubmit={editing ? handleUpdate : handleCreate}
          onCancel={() => { setShowForm(false); setEditing(null); }}
        />
      )}

      {/* Barra de búsqueda */}
      <input
        type="text"
        placeholder="Buscar por nombre o documento"
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ margin: '10px 0', padding: '5px', width: '250px' }}
      />

      {loading ? (
        <p>Cargando pacientes...</p>
      ) : (
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Documento</th>
              <th>Fecha de nacimiento</th>
              <th>Contacto</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pacientesFiltrados.map(p => (
              <tr key={p.idPaciente}>
                <td>{p.nombre}</td>
                <td>{p.documento}</td>
                <td>{p.fechaNacimiento}</td>
                <td>{p.contacto || '-'}</td>
                <td>
                  <button onClick={() => { setEditing(p); setShowForm(true); }}>
                    Editar
                  </button>
                  <button onClick={() => handleDelete(p.idPaciente)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Pacientes;