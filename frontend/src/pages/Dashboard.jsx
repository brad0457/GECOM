import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Pacientes from "./pacientes/Pacientes";
function Dashboard() {
  const { logout, user } = useContext(AuthContext);

  return (
    <div>
      <h1>Bienvenido al Dashboard</h1>
      <p>Login exitoso</p>
      {user && <p>Usuario: {user.nombre}</p>}

      <button onClick={logout}>Cerrar sesión</button>

      <hr />

      {/* Aquí integras tu CRUD de pacientes */}
      <Pacientes />
    </div>
  );
}

export default Dashboard;