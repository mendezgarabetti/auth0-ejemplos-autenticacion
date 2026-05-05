const { Router } = require('express');
const { requiresAuth } = require('express-openid-connect');
const router = Router();

// requiresAuth() redirige automáticamente al login si el usuario no está autenticado
router.get('/perfil', requiresAuth(), (req, res) => {
  // req.oidc.user contiene los claims del id_token (nombre, email, foto, etc.)
  const user = req.oidc.user;

  res.send(`
    <h1>Perfil de usuario</h1>
    <img src="${user.picture}" alt="Avatar" width="80" />
    <p><strong>Nombre:</strong> ${user.name}</p>
    <p><strong>Email:</strong> ${user.email}</p>
    <p><strong>Sub (ID único):</strong> ${user.sub}</p>
    <hr />
    <h3>Todos los claims del token:</h3>
    <pre>${JSON.stringify(user, null, 2)}</pre>
    <a href="/">← Volver al inicio</a>
  `);
});

module.exports = router;
