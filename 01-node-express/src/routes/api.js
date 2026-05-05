const { Router } = require('express');
const { auth: jwtAuth } = require('express-oauth2-jwt-bearer');
const router = Router();

// Middleware que valida el JWT Bearer token en el header Authorization
// Uso: Authorization: Bearer <access_token>
const checkJwt = jwtAuth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
});

// Endpoint público de la API
router.get('/publico', (req, res) => {
  res.json({ mensaje: 'Este endpoint es público, no requiere token.' });
});

// Endpoint protegido: requiere un JWT Bearer válido
router.get('/datos', checkJwt, (req, res) => {
  // req.auth contiene el payload del JWT validado
  res.json({
    mensaje: 'Acceso autorizado al endpoint protegido.',
    usuario: req.auth.payload.sub,
    permisos: req.auth.payload.permissions || [],
  });
});

// Manejo de errores de autenticación
router.use((err, req, res, next) => {
  if (err.status === 401) {
    return res.status(401).json({ error: 'Token inválido o ausente.' });
  }
  if (err.status === 403) {
    return res.status(403).json({ error: 'Sin permisos para este recurso.' });
  }
  next(err);
});

module.exports = router;
