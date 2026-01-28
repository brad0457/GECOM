import { body, validationResult } from 'express-validator';

// Validaciones para Usuario (crear)
export const validarUsuario = [
  body('nombre')
    .notEmpty().withMessage('El nombre es obligatorio'),
  body('correo')
    .isEmail().withMessage('Debe ser un correo válido'),
  body('password')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener mínimo 6 caracteres'),
  body('rol')
    .isIn(['admin', 'asistente', 'enfermera', 'doctor'])
    .withMessage('El rol debe ser admin, asistente, enfermera o doctor')
];

// Validaciones para Usuario (actualizar - password opcional)
export const validarActualizarUsuario = [
  body('nombre')
    .notEmpty().withMessage('El nombre es obligatorio'),
  body('correo')
    .isEmail().withMessage('Debe ser un correo válido'),
  body('password')
    .optional()
    .isLength({ min: 6 }).withMessage('La contraseña debe tener mínimo 6 caracteres'),
  body('rol')
    .isIn(['admin', 'asistente', 'enfermera', 'doctor'])
    .withMessage('El rol debe ser admin, asistente, enfermera o doctor')
];

// Validaciones para Cita (crear)
export const validarCita = [
  body('fecha')
    .isDate().withMessage('Debe ser una fecha válida'),
  body('hora')
    .notEmpty().withMessage('La hora es obligatoria'),
  body('motivo')
    .notEmpty().withMessage('El motivo es obligatorio'),
  body('estado')
    .optional()
    .isIn(['pendiente', 'completada', 'cancelada']).withMessage('Estado inválido'),
  body('observaciones')
    .optional(),
  body('idUsuario')
    .isInt().withMessage('Debe ser un ID de usuario válido'),
  body('idPaciente')
    .isInt().withMessage('Debe ser un ID de paciente válido')
];

// Validaciones para Cita (actualizar)
export const validarActualizarCita = [
  body('fecha')
    .isDate().withMessage('Debe ser una fecha válida'),
  body('hora')
    .notEmpty().withMessage('La hora es obligatoria'),
  body('motivo')
    .notEmpty().withMessage('El motivo es obligatorio'),
  body('estado')
    .optional()
    .isIn(['pendiente', 'completada', 'cancelada']).withMessage('Estado inválido'),
  body('observaciones')
    .optional(),
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

// Validaciones para Tarea (actualizar)
export const validarActualizarTarea = [
  body('titulo')
    .notEmpty().withMessage('El título es obligatorio'),
  body('descripcion')
    .optional(),
  body('fechaLimite')
    .isDate().withMessage('Debe ser una fecha válida'),
  body('estado')
    .optional()
    .isIn(['pendiente', 'completada', 'cancelada']).withMessage('Estado inválido'),
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

// Middleware para permitir solo a admin
export const soloAdmin = (req, res, next) => {
  if (req.usuarioRol === 'admin') {
    return next();
  }
  return res.status(403).json({ error: 'Acceso denegado: solo admin puede realizar esta acción' });
};

// Middleware genérico para varios roles
export const tieneRol = (...rolesPermitidos) => {
  return (req, res, next) => {
    if (rolesPermitidos.includes(req.usuarioRol)) {
      return next();
    }
    return res.status(403).json({ error: 'Acceso denegado: rol no autorizado' });
  };
};

// Validaciones para Paciente (crear)
export const validarPaciente = [
  body('nombre')
    .notEmpty().withMessage('El nombre es obligatorio'),
  body('documento')
    .notEmpty().withMessage('El documento es obligatorio'),
  body('fechaNacimiento')
    .isDate().withMessage('Debe ser una fecha válida'),
  body('contacto')
    .optional()
];

// Validaciones para Paciente (actualizar)
export const validarActualizarPaciente = [
  body('nombre')
    .notEmpty().withMessage('El nombre es obligatorio'),
  body('documento')
    .notEmpty().withMessage('El documento es obligatorio'),
  body('fechaNacimiento')
    .isDate().withMessage('Debe ser una fecha válida'),
  body('contacto')
    .optional()
];

// Middleware para admin y asistente
export const adminOAsistente = (req, res, next) => {
  if (req.usuarioRol === 'admin' || req.usuarioRol === 'asistente') {
    return next();
  }
  return res.status(403).json({ error: 'Acceso denegado: solo admin o asistente pueden realizar esta acción' });
};