import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Paciente = sequelize.define('Paciente', {
  idPaciente: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: 'idpaciente'
  },
  nombre: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'nombre'
  },
  documento: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    field: 'documento'
  },
  fechaNacimiento: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    field: 'fechanacimiento'
  },
  contacto: {
    type: DataTypes.STRING(255),
    allowNull: true,
    field: 'contacto'
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
  tableName: 'paciente',
  timestamps: false,
  freezeTableName: true
});

export default Paciente;