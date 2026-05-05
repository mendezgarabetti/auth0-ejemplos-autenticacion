# Auth0 - Ejemplos de Autenticación

Repositorio educativo con ejemplos funcionales de autenticación usando [Auth0](https://auth0.com).

## ¿Qué es Auth0?

Auth0 es una plataforma de autenticación y autorización como servicio (IDaaS). Implementa los protocolos estándar de la industria:

- **OAuth 2.0** — protocolo de autorización delegada
- **OpenID Connect (OIDC)** — capa de identidad sobre OAuth 2.0
- **JWT (JSON Web Tokens)** — formato estándar para tokens de acceso

## Ejemplos incluidos

| # | Stack | Descripción |
|---|-------|-------------|
| [01-node-express](./01-node-express/) | Node.js + Express | Web app con sesión y rutas protegidas |
| [02-react-spa](./02-react-spa/) | React + Vite | SPA con flujo PKCE y llamadas a API protegida |
| [03-python-fastapi](./03-python-fastapi/) | Python + FastAPI | API REST con validación de JWT Bearer tokens |

## Configuración inicial en Auth0

1. Crear cuenta gratuita en [auth0.com](https://auth0.com)
2. Ir a **Applications → Create Application**
3. Elegir el tipo según el ejemplo:
   - `Regular Web Application` → para Node.js Express
   - `Single Page Application` → para React
   - `API` → para FastAPI (en APIs → Create API)
4. Copiar las credenciales al archivo `.env` de cada ejemplo

## Conceptos clave

### Flujos de autenticación (Flows)

```
SPA / Mobile          Web App tradicional       API (Machine-to-Machine)
     │                        │                           │
  PKCE Flow            Authorization Code Flow       Client Credentials
     │                        │                           │
  Token en cliente    Token en servidor (sesión)    Token en servidor
```

### Tokens

| Token | Propósito | Dónde vive |
|-------|-----------|------------|
| `id_token` | Identidad del usuario (JWT) | Cliente |
| `access_token` | Acceso a APIs (JWT) | Cliente → se envía al API |
| `refresh_token` | Renovar access_token | Servidor / Storage seguro |

## Requisitos previos

- Node.js >= 18
- Python >= 3.10
- Cuenta gratuita en Auth0
