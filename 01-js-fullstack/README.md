# 01 - JS Full-Stack: React + Node.js/Express

Ejemplo completo con frontend en React y backend en Express.
El frontend maneja el login con Auth0 y llama al backend enviando el token.
El backend valida el token y responde con los datos protegidos.

## Estructura

```
01-js-fullstack/
├── frontend/   ← React + Vite (@auth0/auth0-react)
└── backend/    ← Node.js + Express (express-oauth2-jwt-bearer)
```

## Configuración en Auth0

### 1. Crear una Single Page Application (para el frontend)
- **Allowed Callback URLs:** `http://localhost:5173`
- **Allowed Logout URLs:** `http://localhost:5173`
- **Allowed Web Origins:** `http://localhost:5173`
- Copiar: Domain, Client ID

### 2. Crear una API (para el backend)
- Ir a **APIs → Create API**
- **Identifier:** `https://mi-node-api` (o el que prefieras)
- Copiar ese Identifier como `AUTH0_AUDIENCE`

## Instalación y ejecución

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Completar .env con Domain y Audience
npm start
# Corre en http://localhost:3000
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env
# Completar .env con Domain, Client ID y Audience
npm run dev
# Corre en http://localhost:5173
```

## Flujo completo

```
React                   Auth0               Express API
  │                       │                     │
  │── loginWithRedirect ──►│                     │
  │◄── access_token ───────│                     │
  │                        │                     │
  │── GET /api/datos ───────────── Bearer token ─►│
  │                        │              valida JWT
  │◄── { datos } ──────────────────────────────────│
```
