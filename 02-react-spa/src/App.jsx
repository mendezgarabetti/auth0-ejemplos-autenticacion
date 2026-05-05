import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './components/LoginButton.jsx';
import LogoutButton from './components/LogoutButton.jsx';
import Profile from './components/Profile.jsx';
import ApiCall from './components/ApiCall.jsx';

export default function App() {
  // useAuth0 expone el estado y métodos de autenticación
  const { isLoading, isAuthenticated, error } = useAuth0();

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: 600, margin: '40px auto', padding: '0 20px' }}>
      <h1>Auth0 React SPA</h1>

      {isAuthenticated ? (
        <>
          <LogoutButton />
          <Profile />
          <ApiCall />
        </>
      ) : (
        <>
          <p>No has iniciado sesión.</p>
          <LoginButton />
        </>
      )}
    </div>
  );
}
