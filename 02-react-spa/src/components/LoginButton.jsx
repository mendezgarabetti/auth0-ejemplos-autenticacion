import { useAuth0 } from '@auth0/auth0-react';

export default function LoginButton() {
  // loginWithRedirect redirige al usuario a la página de login de Auth0
  const { loginWithRedirect } = useAuth0();

  return (
    <button onClick={() => loginWithRedirect()}>
      Iniciar sesión
    </button>
  );
}
