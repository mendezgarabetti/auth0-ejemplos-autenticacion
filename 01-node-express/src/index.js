require('dotenv').config();
const express = require('express');
const { auth } = require('express-openid-connect');

const publicRoutes = require('./routes/public');
const privateRoutes = require('./routes/private');
const apiRoutes = require('./routes/api');

const app = express();

// Configuración del middleware de Auth0
// express-openid-connect maneja automáticamente:
//   - GET /login  → redirige a Auth0
//   - GET /logout → cierra sesión y redirige
//   - GET /callback → recibe el código y obtiene tokens
const authConfig = {
  authRequired: false,       // No requerir login en todas las rutas
  auth0Logout: true,         // Usar el logout de Auth0 (borra sesión en Auth0 también)
  secret: process.env.APP_SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
};

app.use(auth(authConfig));
app.use(express.json());

app.use('/', publicRoutes);
app.use('/', privateRoutes);
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
