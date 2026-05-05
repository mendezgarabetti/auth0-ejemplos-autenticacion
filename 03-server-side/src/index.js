require('dotenv').config();
const express = require('express');
const path = require('path');
const { auth } = require('express-openid-connect');

const publicRoutes = require('./routes/public');
const privateRoutes = require('./routes/private');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// express-openid-connect maneja automáticamente:
//   GET /login    → redirige a Auth0
//   GET /logout   → cierra sesión y redirige
//   GET /callback → recibe el código, obtiene tokens, crea sesión
app.use(auth({
  authRequired: false,
  auth0Logout: true,
  secret: process.env.APP_SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
}));

app.use('/', publicRoutes);
app.use('/', privateRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
