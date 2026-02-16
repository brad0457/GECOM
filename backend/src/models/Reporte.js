import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Reporte = sequelize.define('Reporte', {
  idReporte: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: 'idreporte'
  },
  tipo: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'tipo'
  },
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    field: 'fecha'
  },
  idUsuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'idusuario'
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
  tableName: 'reporte',
  timestamps: false,
  freezeTableName: true
});

export default Reporte;