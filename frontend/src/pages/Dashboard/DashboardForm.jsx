import { useState } from 'react';

function DashboardForm() {
  const [active, setActive] = useState('Inicio');

  const items = [
    'Inicio',
    'Pacientes',
    'Citas',
    'Usuarios',
    'Tareas',
    'Configuración',
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Header */}
      <header className="h-14 bg-blue-800 flex items-center justify-between px-8 border-b border-blue-900">
        <div className="text-lg text-white tracking-wide">
          GECOM
        </div>
        <div className="text-sm text-blue-100">
          Dr. Juan Pérez
        </div>
      </header>

      {/* Layout principal */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-60 bg-white border-r border-slate-200">
          <nav className="flex flex-col py-6">
            {items.map((item) => {
              const isActive = active === item;
              return (
                <div
                  key={item}
                  onClick={() => setActive(item)}
                  className={`px-6 py-3 cursor-pointer transition flex items-center
                    ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                        : 'text-slate-600 hover:bg-slate-100'
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
          <div className="bg-white border border-slate-200 rounded-lg p-8">
            <h1 className="text-2xl text-slate-800 mb-2">
              {active}
            </h1>
            <p className="text-slate-500 mb-6">
              Panel de gestión de {active.toLowerCase()}
            </p>

            <div className="h-40 border border-dashed border-slate-300 rounded-md flex items-center justify-center text-slate-400">
              Contenido del módulo
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardForm;
