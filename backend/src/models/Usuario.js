import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Usuario = sequelize.define('Usuario', {
  idUsuario: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rol: {
    type: DataTypes.ENUM('admin', 'asistente', 'enfermera', 'doctor'),
    allowNull: false,
    defaultValue: 'asistente', // por defecto será asistente
  },
}, {
  tableName: 'usuario', // nombre exacto de la tabla en MySQL
  timestamps: true,     // crea createdAt y updatedAt automáticamente
});

export default Usuario;