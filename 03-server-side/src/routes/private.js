const { Router } = require('express');
const { requiresAuth } = require('express-openid-connect');
const router = Router();

// requiresAuth() redirige a /login si el usuario no tiene sesión activa
router.get('/perfil', requiresAuth(), (req, res) => {
  // req.oidc.user contiene los claims del id_token: nombre, email, foto, etc.
  res.render('perfil', { user: req.oidc.user });
});

module.exports = router;
