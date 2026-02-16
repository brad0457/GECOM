import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'gecom',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'gecom2025',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    port: process.env.DB_PORT || 5432,
    dialectOptions: process.env.NODE_ENV === 'production' ? {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    } : {},
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: true,
      underscored: false,
      freezeTableName: true
    }
  }
);

export default sequelize;