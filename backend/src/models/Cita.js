import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Cita = sequelize.define('Cita', {
  idCita: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: 'idcita'
  },
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    field: 'fecha'
  },
  hora: {
    type: DataTypes.TIME,
    allowNull: false,
    field: 'hora'
  },
  motivo: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'motivo'
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'completada', 'cancelada'),
    defaultValue: 'pendiente',
    field: 'estado'
  },
  observaciones: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'observaciones'
  },
  idUsuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'idusuario'
  },
  idPaciente: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'idpaciente'
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
  tableName: 'cita',
  timestamps: false,
  freezeTableName: true
});

export default Cita;