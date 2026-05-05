# 01 - Node.js + Express con Auth0

Web app tradicional con login, logout, sesión de usuario y rutas protegidas.

## ¿Qué hace este ejemplo?

- Login/logout con redirección a Auth0
- Sesión del usuario almacenada en el servidor
- Rutas públicas y rutas protegidas (requieren login)
- Muestra el perfil del usuario autenticado
- Endpoint de API protegido con JWT Bearer token

## Librerías usadas

| Librería | Propósito |
|----------|-----------|
| `express-openid-connect` | Maneja el flujo OAuth/OIDC completo |
| `express-oauth2-jwt-bearer` | Valida JWT Bearer tokens en rutas de API |

## Configuración en Auth0

1. Crear una **Regular Web Application**
2. En *Settings*, configurar:
   - **Allowed Callback URLs:** `http://localhost:3000/callback`
   - **Allowed Logout URLs:** `http://localhost:3000`
3. Copiar: Domain, Client ID, Client Secret

## Instalación

```bash
npm install
cp .env.example .env
# Completar .env con tus credenciales de Auth0
npm start
```

## Rutas disponibles

| Ruta | Descripción |
|------|-------------|
| `GET /` | Página principal (pública) |
| `GET /login` | Inicia el flujo de login |
| `GET /logout` | Cierra la sesión |
| `GET /perfil` | Perfil del usuario (requiere login) |
| `GET /api/datos` | Endpoint protegido con Bearer token |

## Flujo de autenticación

```
Usuario          Express App          Auth0
   │                  │                 │
   │─── GET /login ──►│                 │
   │                  │──── redirect ──►│
   │                  │                 │ (usuario ingresa credenciales)
   │                  │◄── /callback ───│
   │                  │  (code)         │
   │                  │──── /token ────►│
   │                  │◄─── tokens ─────│
   │◄── sesión ───────│                 │
```
