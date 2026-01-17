import jwt from 'jsonwebtoken';

export const verificarToken = (req, res, next) => {
  // El token se envía en el header: Authorization: Bearer <token>
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(403).json({ error: 'Token requerido' });
  }

  try {
    // Verificar token con la clave secreta
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Guardamos datos útiles en la request
    req.usuarioId = decoded.id;   // ID del usuario
    req.usuarioRol = decoded.rol; // Rol del usuario

    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
};