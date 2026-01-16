import app from './app.js';
import 'dotenv/config';
import { sequelize } from './models/index.js';


const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.sync();
    console.log('Base de datos sincronizada');

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error);
  }
})();
