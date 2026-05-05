import os
import httpx
from jose import jwt, JWTError
from fastapi import HTTPException, Security
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

AUTH0_DOMAIN = os.getenv("AUTH0_DOMAIN")
AUTH0_AUDIENCE = os.getenv("AUTH0_AUDIENCE")
ALGORITHMS = ["RS256"]

security = HTTPBearer()


def get_jwks() -> dict:
    """Obtiene las claves públicas de Auth0 para verificar la firma del JWT."""
    url = f"https://{AUTH0_DOMAIN}/.well-known/jwks.json"
    response = httpx.get(url)
    response.raise_for_status()
    return response.json()


def verify_token(credentials: HTTPAuthorizationCredentials = Security(security)) -> dict:
    """
    Dependency de FastAPI que valida el Bearer token.

    Pasos:
    1. Extrae el token del header Authorization
    2. Obtiene las claves públicas de Auth0 (JWKS)
    3. Verifica firma, expiración, issuer y audience
    4. Retorna el payload del token si todo es válido
    """
    token = credentials.credentials

    try:
        jwks = get_jwks()

        # Decodifica y valida el JWT en un solo paso
        payload = jwt.decode(
            token,
            jwks,
            algorithms=ALGORITHMS,
            audience=AUTH0_AUDIENCE,
            issuer=f"https://{AUTH0_DOMAIN}/",
        )
        return payload

    except JWTError as e:
        raise HTTPException(status_code=401, detail=f"Token inválido: {str(e)}")
    except httpx.HTTPError as e:
        raise HTTPException(status_code=503, detail=f"No se pudieron obtener las claves de Auth0: {str(e)}")
