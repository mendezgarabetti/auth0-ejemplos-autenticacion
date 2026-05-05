import { useAuth0 } from '@auth0/auth0-react';

export default function Profile() {
  // user contiene los claims del id_token: nombre, email, foto, etc.
  const { user } = useAuth0();

  if (!user) return null;

  return (
    <div style={{ border: '1px solid #ccc', padding: 16, margin: '16px 0', borderRadius: 8 }}>
      <h2>Perfil</h2>
      <img src={user.picture} alt={user.name} width={60} style={{ borderRadius: '50%' }} />
      <p><strong>Nombre:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Sub (ID):</strong> {user.sub}</p>
      <details>
        <summary>Ver todos los claims del token</summary>
        <pre style={{ background: '#f5f5f5', padding: 8, fontSize: 12 }}>
          {JSON.stringify(user, null, 2)}
        </pre>
      </details>
    </div>
  );
}
