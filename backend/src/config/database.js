import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('gecom', 'laragon', '', {
  host: '172.20.160.1',
  port: 3306,
  dialect: 'mysql',
  logging: false
});

export default sequelize;
