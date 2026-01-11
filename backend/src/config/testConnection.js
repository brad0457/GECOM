import sequelize from './database.js';

async function testDB() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos exitosa');
  } catch (error) {
    console.error('No se pudo conectar:', error);
  }
}

testDB();
