import sequelize from '../config/database.js';
import Usuario from './Usuario.js';
import Paciente from './Paciente.js';
import Cita from './Cita.js';
import Tarea from './Tarea.js';
import Reporte from './Reporte.js';

// Relaciones
Usuario.hasMany(Cita, { foreignKey: 'idusuario' });
Cita.belongsTo(Usuario, { foreignKey: 'idusuario' });

Paciente.hasMany(Cita, { foreignKey: 'idpaciente' });
Cita.belongsTo(Paciente, { foreignKey: 'idpaciente' });

Usuario.hasMany(Tarea, { foreignKey: 'idusuario' });
Tarea.belongsTo(Usuario, { foreignKey: 'idusuario' });

Usuario.hasMany(Reporte, { foreignKey: 'idusuario' });
Reporte.belongsTo(Usuario, { foreignKey: 'idusuario' });

export {
  sequelize,
  Usuario,
  Paciente,
  Cita,
  Tarea,
  Reporte
};