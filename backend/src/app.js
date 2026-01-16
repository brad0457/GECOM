import express from 'express';
import UsuarioRoutes from './routes/UsuarioRoutes.js';
import PacienteRoutes from './routes/PacienteRoutes.js';
import CitaRoutes from './routes/CitaRoutes.js';
import TareaRoutes from './routes/TareaRoutes.js';
import ReporteRoutes from './routes/ReporteRoutes.js';
import AuthRoutes from './routes/AuthRoutes.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173'
}));


app.use(express.json());

// Rutas principales
app.use('/usuarios', UsuarioRoutes);
app.use('/pacientes', PacienteRoutes);
app.use('/citas', CitaRoutes);
app.use('/tareas', TareaRoutes);
app.use('/reportes', ReporteRoutes);
app.use('/auth', AuthRoutes);

export default app;