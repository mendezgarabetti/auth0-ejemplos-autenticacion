const { Router } = require('express');
const { auth } = require('express-oauth2-jwt-bearer');

const router = Router();

// Middleware que valida el JWT Bearer en el header Authorization.
// Si el token es inválido o no está presente, devuelve 401 automáticamente.
const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
});

// Ruta pública
router.get('/publico', (req, res) => {
  res.json({ mensaje: 'Este endpoint es público.' });
});

// Ruta protegida: el frontend debe enviar el access_token en el header
// Authorization: Bearer <token>
router.get('/datos', checkJwt, (req, res) => {
  // req.auth.payload contiene los claims del JWT validado
  res.json({
    mensaje: 'Acceso autorizado.',
    usuario: req.auth.payload.sub,
    permisos: req.auth.payload.permissions || [],
  });
});

// Manejo de errores de autenticación
router.use((err, req, res, next) => {
  if (err.status === 401) return res.status(401).json({ error: 'Token inválido o ausente.' });
  if (err.status === 403) return res.status(403).json({ error: 'Sin permisos suficientes.' });
  next(err);
});

module.exports = router;
