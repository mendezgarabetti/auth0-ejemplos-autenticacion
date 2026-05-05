from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from auth.validator import verify_token

app = FastAPI(
    title="Auth0 FastAPI Backend",
    description="API REST con autenticación via JWT Bearer tokens de Auth0",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/publico")
def publico():
    """Endpoint público, no requiere autenticación."""
    return {"mensaje": "Este endpoint es público."}


@app.get("/api/datos")
def datos(payload: dict = Depends(verify_token)):
    """
    Endpoint protegido.

    Depends(verify_token) valida el JWT antes de ejecutar esta función.
    Si el token es inválido o ausente, FastAPI devuelve 401 automáticamente.
    """
    return {
        "mensaje": "Acceso autorizado.",
        "usuario": payload.get("sub"),
        "email": payload.get("email"),
        "permisos": payload.get("permissions", []),
    }
