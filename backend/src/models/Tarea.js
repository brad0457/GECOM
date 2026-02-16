import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Tarea = sequelize.define('Tarea', {
  idTarea: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: 'idtarea'
  },
  titulo: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'titulo'
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'descripcion'
  },
  fechaLimite: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    field: 'fechalimite'
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'completada', 'cancelada'),
    defaultValue: 'pendiente',
    field: 'estado'
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
  tableName: 'tarea',
  timestamps: false,
  freezeTableName: true
});

export default Tarea;