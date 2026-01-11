import sequelize from '../config/database.js';
import Usuario from './Usuario.js';
import Paciente from './Paciente.js';
import Cita from './Cita.js';
import Tarea from './Tarea.js';
import Reporte from './Reporte.js';

// Relaciones

// Usuario ↔ Cita
Usuario.hasMany(Cita, { foreignKey: 'idUsuario' });
Cita.belongsTo(Usuario, { foreignKey: 'idUsuario' });

// Paciente ↔ Cita
Paciente.hasMany(Cita, { foreignKey: 'idPaciente' });
Cita.belongsTo(Paciente, { foreignKey: 'idPaciente' });

// Usuario ↔ Tarea
Usuario.hasMany(Tarea, { foreignKey: 'idUsuario' });
Tarea.belongsTo(Usuario, { foreignKey: 'idUsuario' });

// Usuario ↔ Reporte
Usuario.hasMany(Reporte, { foreignKey: 'idUsuario' });
Reporte.belongsTo(Usuario, { foreignKey: 'idUsuario' });

// Exportar modelos y sequelize
export {
  sequelize,
  Usuario,
  Paciente,
  Cita,
  Tarea,
  Reporte
};
