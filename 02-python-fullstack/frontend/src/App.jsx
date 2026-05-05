import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './components/LoginButton.jsx';
import LogoutButton from './components/LogoutButton.jsx';
import Profile from './components/Profile.jsx';
import ApiCall from './components/ApiCall.jsx';

export default function App() {
  const { isLoading, isAuthenticated, error } = useAuth0();

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: 640, margin: '40px auto', padding: '0 20px' }}>
      <h1>Portal - Auth0 Python Full-Stack</h1>
      {isAuthenticated ? (
        <>
          <LogoutButton />
          <Profile />
          <ApiCall />
        </>
      ) : (
        <>
          <p>Iniciá sesión para acceder al portal.</p>
          <LoginButton />
        </>
      )}
    </div>
  );
}
