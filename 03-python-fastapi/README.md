# 03 - Python + FastAPI con Auth0

API REST con validación de JWT Bearer tokens emitidos por Auth0.

## ¿Qué hace este ejemplo?

- Endpoint público (sin autenticación)
- Endpoint protegido: valida el JWT Bearer token contra Auth0
- Decodifica y muestra los claims del token
- Manejo de errores de autenticación/autorización

## ¿Cómo funciona la validación del JWT?

```
Cliente           FastAPI              Auth0 JWKS Endpoint
   │                 │                       │
   │── Bearer token ►│                       │
   │                 │── GET /.well-known ───►│
   │                 │    /jwks.json          │
   │                 │◄── claves públicas ────│
   │                 │                       │
   │                 │  valida firma del JWT  │
   │                 │  verifica expiración   │
   │                 │  verifica audience     │
   │◄── respuesta ───│                       │
```

Auth0 firma los JWTs con su clave privada. FastAPI verifica la firma usando las **claves públicas** de Auth0 (JWKS), sin necesidad de guardar ningún secreto compartido.

## Librerías usadas

| Librería | Propósito |
|----------|-----------|
| `fastapi` | Framework web |
| `uvicorn` | Servidor ASGI |
| `python-jose[cryptography]` | Decodificación y validación de JWT |
| `httpx` | Cliente HTTP para obtener JWKS |
| `python-dotenv` | Variables de entorno |

## Configuración en Auth0

1. Ir a **APIs → Create API**
2. Definir un Identifier (ej: `https://mi-fastapi`)
3. Copiar ese Identifier como `AUTH0_AUDIENCE` en `.env`

## Instalación

```bash
python -m venv .venv
source .venv/bin/activate       # Linux/Mac
# .venv\Scripts\activate        # Windows

pip install -r requirements.txt
cp .env.example .env
# Completar .env con tus credenciales

uvicorn main:app --reload
```

## Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/` | Endpoint público |
| `GET` | `/protegido` | Requiere Bearer token válido |
| `GET` | `/mis-permisos` | Muestra permisos del token |
| `GET` | `/docs` | Swagger UI (documentación interactiva) |

## Probar con curl

```bash
# Obtener un token desde Auth0 (Machine-to-Machine o desde la SPA de React)
TOKEN="eyJ..."

# Llamar endpoint protegido
curl -H "Authorization: Bearer $TOKEN" http://localhost:8000/protegido
```
