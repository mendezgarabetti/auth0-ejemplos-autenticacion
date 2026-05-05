# 03 - Server-Side Clásico: Node.js + Express + EJS

Enfoque tradicional donde el servidor maneja todo el ciclo de autenticación.
No hay JWT en el frontend ni llamadas a una API separada.
El servidor obtiene los tokens, guarda la sesión y renderiza el HTML.

## Estructura

```
03-server-side/
├── src/
│   ├── index.js          ← App principal + configuración Auth0
│   ├── routes/
│   │   ├── public.js     ← Rutas accesibles sin login
│   │   └── private.js    ← Rutas que requieren sesión activa
│   └── views/
│       ├── home.ejs      ← Página principal
│       └── perfil.ejs    ← Página de perfil (protegida)
```

## Comparación con los ejemplos 01 y 02

| Aspecto | Server-side (03) | SPA + API (01, 02) |
|---------|-----------------|-------------------|
| ¿Dónde vive el token? | Solo en el servidor | En el cliente (memoria) |
| ¿El frontend hace requests con token? | No | Sí (Bearer token) |
| ¿Hay una API separada? | No | Sí |
| Seguridad del token | Alta (nunca sale al cliente) | Media (en memoria del browser) |
| Arquitectura | Monolítica | Desacoplada |

## Configuración en Auth0

1. Crear una **Regular Web Application**
2. En *Settings*, configurar:
   - **Allowed Callback URLs:** `http://localhost:3000/callback`
   - **Allowed Logout URLs:** `http://localhost:3000`
3. Copiar: Domain, Client ID, Client Secret

## Instalación y ejecución

```bash
npm install
cp .env.example .env
# Completar .env con tus credenciales
npm start
# Corre en http://localhost:3000
```

## Rutas disponibles

| Ruta | Acceso | Descripción |
|------|--------|-------------|
| `GET /` | Público | Página principal |
| `GET /login` | Público | Inicia el flujo de login en Auth0 |
| `GET /logout` | Autenticado | Cierra sesión en app y en Auth0 |
| `GET /perfil` | Requiere login | Muestra datos del usuario |
