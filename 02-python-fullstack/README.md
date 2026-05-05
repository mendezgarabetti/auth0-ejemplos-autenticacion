# 02 - Python Full-Stack: React + FastAPI

Mismo portal React del ejemplo anterior, pero el backend está en Python con FastAPI.
Sirve para comparar cómo se valida el JWT en diferentes lenguajes.

## Estructura

```
02-python-fullstack/
├── frontend/   ← React + Vite (idéntico al ejemplo 01, llama a FastAPI)
└── backend/    ← Python + FastAPI (valida JWT con python-jose)
```

## Configuración en Auth0

### 1. Single Page Application (mismo que en el ejemplo 01)
- Podés reutilizar la misma aplicación SPA de Auth0

### 2. Crear una API para FastAPI
- Ir a **APIs → Create API**
- **Identifier:** `https://mi-fastapi` (o el que prefieras)
- Copiar ese Identifier como `AUTH0_AUDIENCE`

## Instalación y ejecución

### Backend
```bash
cd backend
python -m venv .venv
source .venv/bin/activate       # Linux/Mac
# .venv\Scripts\activate        # Windows

pip install -r requirements.txt
cp .env.example .env
# Completar .env con Domain y Audience
uvicorn main:app --reload
# Corre en http://localhost:8000
# Documentación interactiva en http://localhost:8000/docs
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env
# Completar .env (cambiar VITE_API_URL a http://localhost:8000)
npm run dev
# Corre en http://localhost:5173
```

## Diferencia clave con el ejemplo 01

| Aspecto | Node.js (01) | FastAPI (02) |
|---------|-------------|--------------|
| Validación JWT | `express-oauth2-jwt-bearer` | `python-jose` + JWKS manual |
| Obtención de claves | Automática | `GET /.well-known/jwks.json` |
| Documentación API | Manual | Automática en `/docs` |

## Probar el backend con curl

```bash
TOKEN="eyJ..."  # token obtenido desde el frontend
curl -H "Authorization: Bearer $TOKEN" http://localhost:8000/api/datos
```
