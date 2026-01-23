import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Usuarios from '../../components/modules/Usuarios';
import Pacientes from '../../components/modules/Pacientes';
import ConfirmModal from '../../components/ConfirmModal';

function DashboardForm() {
  const [active, setActive] = useState('Inicio');
  const [mostrarConfirm, setMostrarConfirm] = useState(false);
  const { user, logout } = useContext(AuthContext);

  const items = [
    'Inicio',
    'Pacientes',
    'Citas',
    'Usuarios',
    'Tareas',
    'Configuración',
  ];

  const handleLogout = () => {
    setMostrarConfirm(true);
  };

  const confirmarLogout = () => {
    setMostrarConfirm(false);
    logout();
  };

  // Mapeo de módulos
  const modules = {
    'Inicio': (
      <div>
        <h2 className="text-2xl font-bold text-teal-900 mb-4">Bienvenido</h2>
        <p className="text-teal-600">Panel de control principal</p>
      </div>
    ),
    'Pacientes': <Pacientes />,
    'Citas': (
      <div>
        <h2 className="text-2xl font-bold text-teal-900 mb-4">Citas</h2>
        <p className="text-teal-600">Módulo en desarrollo...</p>
      </div>
    ),
    'Usuarios': <Usuarios />,
    'Tareas': (
      <div>
        <h2 className="text-2xl font-bold text-teal-900 mb-4">Tareas</h2>
        <p className="text-teal-600">Módulo en desarrollo...</p>
      </div>
    ),
    'Configuración': (
      <div>
        <h2 className="text-2xl font-bold text-teal-900 mb-4">Configuración</h2>
        <p className="text-teal-600">Módulo en desarrollo...</p>
      </div>
    ),
  };

  return (
    <div className="min-h-screen bg-teal-50 flex flex-col">
      {/* Header */}
      <header className="h-16 bg-gradient-to-r from-teal-700 to-cyan-800 flex items-center justify-between px-8 shadow-lg">
        <div className="text-xl font-bold text-white tracking-wide">
          GECOM
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-white font-medium">
            {user?.nombre || 'Usuario'} - {user?.rol ? user.rol.charAt(0).toUpperCase() + user.rol.slice(1) : 'Rol'}
          </div>
          <button
            onClick={handleLogout}
            className="text-red-400 hover:text-red-300 font-semibold underline transition text-sm"
          >
            Salir
          </button>
        </div>
      </header>

      {/* Layout principal */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-teal-200 shadow-sm">
          <nav className="flex flex-col py-6">
            {items.map((item) => {
              const isActive = active === item;
              return (
                <div
                  key={item}
                  onClick={() => setActive(item)}
                  className={`px-6 py-3 cursor-pointer transition flex items-center font-medium
                    ${
                      isActive
                        ? 'bg-teal-50 text-teal-800 border-l-4 border-teal-600'
                        : 'text-teal-700 hover:bg-teal-50 hover:text-teal-800'
                    }`}
                >
                  {item}
                </div>
              );
            })}
          </nav>
        </aside>

        {/* Contenido */}
        <main className="flex-1 p-8">
          <div className="bg-white border border-teal-200 rounded-xl p-8 shadow-sm">
            {modules[active]}
          </div>
        </main>
      </div>

      {/* Modal de confirmación */}
      {mostrarConfirm && (
        <ConfirmModal
          mensaje="¿Seguro que deseas cerrar sesión?"
          onConfirmar={confirmarLogout}
          onCancelar={() => setMostrarConfirm(false)}
        />
      )}
    </div>
  );
}

export default DashboardForm;