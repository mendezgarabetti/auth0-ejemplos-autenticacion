import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App.jsx';

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

// Auth0Provider es el contexto global de autenticación.
// Todos los componentes dentro pueden usar useAuth0().
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        // audience: indica para qué API queremos el access_token
        ...(audience && { audience }),
      }}
    >
      <App />
    </Auth0Provider>
  </StrictMode>
);
