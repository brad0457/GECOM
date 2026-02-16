import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Usuario = sequelize.define('Usuario', {
  idUsuario: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: 'idusuario'
  },
  nombre: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'nombre'
  },
  correo: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    field: 'correo'
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'password'
  },
  rol: {
    type: DataTypes.ENUM('admin', 'asistente', 'enfermera', 'doctor'),
    allowNull: false,
    defaultValue: 'asistente',
    field: 'rol'
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'createdat'
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'updatedat'
  }
}, {
  tableName: 'usuario',
  timestamps: false,
  freezeTableName: true
});

export default Usuario;