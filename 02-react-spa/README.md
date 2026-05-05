# 02 - React SPA con Auth0

Single Page Application con autenticación Auth0 usando el flujo PKCE.

## ¿Por qué PKCE para SPAs?

Las SPAs no pueden guardar secretos (el código fuente es público en el navegador).
PKCE (Proof Key for Code Exchange) resuelve esto sin necesitar un `client_secret`:

```
1. App genera un code_verifier (aleatorio) y su hash: code_challenge
2. Envía code_challenge a Auth0 al iniciar el login
3. Auth0 devuelve un code
4. App envía el code + code_verifier original
5. Auth0 verifica que el hash coincida → entrega el token
```

El SDK `@auth0/auth0-react` hace todo esto automáticamente.

## Librerías usadas

| Librería | Propósito |
|----------|-----------|
| `@auth0/auth0-react` | SDK oficial de Auth0 para React |
| `vite` | Build tool moderno |

## Configuración en Auth0

1. Crear una **Single Page Application**
2. En *Settings*, configurar:
   - **Allowed Callback URLs:** `http://localhost:5173`
   - **Allowed Logout URLs:** `http://localhost:5173`
   - **Allowed Web Origins:** `http://localhost:5173`
3. Si vas a llamar una API protegida, crear también un **API** en Auth0 y copiar el Identifier como `VITE_AUTH0_AUDIENCE`

## Instalación

```bash
npm install
cp .env.example .env
# Completar .env con tus credenciales
npm run dev
```

## Componentes

| Componente | Descripción |
|------------|-------------|
| `Auth0Provider` | Envuelve la app, provee contexto de autenticación |
| `LoginButton` | Dispara el flujo de login |
| `LogoutButton` | Cierra la sesión |
| `Profile` | Muestra datos del usuario autenticado |
| `ProtectedPage` | Página que requiere estar autenticado |
| `ApiCall` | Ejemplo de llamada a API con Bearer token |
