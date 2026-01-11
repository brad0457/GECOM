import { body, validationResult } from 'express-validator';

// Validaciones para Usuario
export const validarUsuario = [
  body('nombre')
    .notEmpty().withMessage('El nombre es obligatorio'),
  body('correo')
    .isEmail().withMessage('Debe ser un correo válido'),
  body('contraseña')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener mínimo 6 caracteres')
];

// Validaciones para Paciente
export const validarPaciente = [
  body('nombre')
    .notEmpty().withMessage('El nombre es obligatorio'),
  body('documento')
    .notEmpty().withMessage('El documento es obligatorio'),
  body('fechaNacimiento')
    .isDate().withMessage('Debe ser una fecha válida'),
  body('contacto')
    .notEmpty().withMessage('El contacto es obligatorio')
];

// Validaciones para Cita
export const validarCita = [
  body('fecha')
    .isDate().withMessage('Debe ser una fecha válida'),
  body('hora')
    .notEmpty().withMessage('La hora es obligatoria'),
  body('motivo')
    .notEmpty().withMessage('El motivo es obligatorio'),
  body('idUsuario')
    .isInt().withMessage('Debe ser un ID de usuario válido'),
  body('idPaciente')
    .isInt().withMessage('Debe ser un ID de paciente válido')
];

// Validaciones para Tarea
export const validarTarea = [
  body('titulo')
    .notEmpty().withMessage('El título es obligatorio'),
  body('descripcion')
    .notEmpty().withMessage('La descripción es obligatoria'),
  body('estado')
    .isIn(['pendiente', 'completada']).withMessage('El estado debe ser pendiente o completada'),
  body('idUsuario')
    .isInt().withMessage('Debe ser un ID de usuario válido')
];

// Validaciones para Reporte
export const validarReporte = [
  body('tipo')
    .notEmpty().withMessage('El tipo es obligatorio'),
  body('fecha')
    .isDate().withMessage('Debe ser una fecha válida'),
  body('idUsuario')
    .isInt().withMessage('Debe ser un ID de usuario válido')
];

// Middleware para manejar errores de validación
export const manejarValidaciones = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ success: false, errors: errores.array() });
  }
  next();
};