# Auth0 - Ejemplos de Autenticación

Repositorio educativo con ejemplos funcionales de autenticación usando [Auth0](https://auth0.com).
Cada ejemplo incluye **frontend + backend** completos y funcionales.

## ¿Qué es Auth0?

Auth0 es una plataforma de autenticación y autorización como servicio (IDaaS) que implementa:

- **OAuth 2.0** — protocolo de autorización delegada
- **OpenID Connect (OIDC)** — capa de identidad sobre OAuth 2.0
- **JWT (JSON Web Tokens)** — formato estándar para tokens de acceso

## Ejemplos incluidos

| # | Stack | Frontend | Backend | Enfoque |
|---|-------|----------|---------|---------|
| [01-js-fullstack](./01-js-fullstack/) | JS full-stack | React + Vite | Node.js + Express | Arquitectura moderna SPA + API |
| [02-python-fullstack](./02-python-fullstack/) | Python full-stack | React + Vite | Python + FastAPI | Mismo frontend, backend en Python |
| [03-server-side](./03-server-side/) | Server-side clásico | HTML (EJS) | Node.js + Express | Sesión en servidor, sin JWT en cliente |

## Flujo general (ejemplos 01 y 02)

```
  FRONTEND (React)              AUTH0              BACKEND (API)
       │                          │                     │
       │──── loginWithRedirect ──►│                     │
       │◄─── id_token             │                     │
       │     access_token ────────┼─────────────────────┤
       │                          │                     │
       │──── GET /api/datos ──────┼── Bearer token ────►│
       │                          │                ┌────┤ valida JWT
       │◄───────── respuesta ─────┼────────────────┘    │
```

## Flujo (ejemplo 03 - server-side)

```
  NAVEGADOR                   EXPRESS (servidor)          AUTH0
       │                            │                       │
       │──── GET /login ───────────►│                       │
       │                            │──── redirect ────────►│
       │                            │◄─── /callback (code) ─│
       │                            │──── canjea code ─────►│
       │                            │◄─── tokens ───────────│
       │◄─── sesión + HTML ─────────│                       │
```

## Configuración inicial en Auth0

1. Crear cuenta gratuita en [auth0.com](https://auth0.com)
2. Ir a **Applications → Create Application**
   - `Single Page Application` → para los frontends React (01 y 02)
   - `Regular Web Application` → para el ejemplo 03
3. Ir a **APIs → Create API** → para los backends de 01 y 02
4. Copiar las credenciales en el `.env` de cada ejemplo

## Requisitos

- Node.js >= 18
- Python >= 3.10
- Cuenta gratuita en Auth0
