const { Router } = require('express');
const router = Router();

// Ruta pública: cualquiera puede acceder
router.get('/', (req, res) => {
  const isLoggedIn = req.oidc.isAuthenticated();

  res.send(`
    <h1>Inicio</h1>
    <p>Estado: ${isLoggedIn ? 'Autenticado ✅' : 'No autenticado ❌'}</p>
    ${isLoggedIn
      ? '<a href="/perfil">Ver perfil</a> | <a href="/logout">Cerrar sesión</a>'
      : '<a href="/login">Iniciar sesión</a>'
    }
  `);
});

module.exports = router;
