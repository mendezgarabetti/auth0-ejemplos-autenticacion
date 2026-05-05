from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from auth.validator import verify_token

app = FastAPI(
    title="Auth0 FastAPI Example",
    description="API REST con autenticación via JWT Bearer tokens de Auth0",
    version="1.0.0",
)

# CORS: permite llamadas desde la SPA de React en desarrollo
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def publico():
    """Endpoint público, no requiere autenticación."""
    return {"mensaje": "Este endpoint es público."}


@app.get("/protegido")
def protegido(payload: dict = Depends(verify_token)):
    """
    Endpoint protegido.

    Requiere: Authorization: Bearer <access_token>

    `Depends(verify_token)` ejecuta la validación del JWT antes de
    llegar a esta función. Si el token es inválido, retorna 401 automáticamente.
    """
    return {
        "mensaje": "Acceso autorizado.",
        "usuario_id": payload.get("sub"),
        "email": payload.get("email"),
    }


@app.get("/mis-permisos")
def mis_permisos(payload: dict = Depends(verify_token)):
    """Muestra los permisos (scopes) incluidos en el token."""
    permisos = payload.get("permissions", [])
    scope = payload.get("scope", "")

    return {
        "usuario_id": payload.get("sub"),
        "permisos": permisos,
        "scope": scope,
        "payload_completo": payload,
    }
