import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export default function ApiCall() {
  const { getAccessTokenSilently } = useAuth0();
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const callApi = async () => {
    setLoading(true);
    try {
      // getAccessTokenSilently obtiene el access_token sin redirigir al usuario.
      // Si el token expiró, lo renueva automáticamente en segundo plano.
      const token = await getAccessTokenSilently();

      const res = await fetch('http://localhost:3000/api/datos', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setResponse({ error: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: 16, margin: '16px 0', borderRadius: 8 }}>
      <h2>Llamada a API protegida</h2>
      <p>Llama al endpoint <code>GET /api/datos</code> del ejemplo Node.js con el Bearer token.</p>
      <button onClick={callApi} disabled={loading}>
        {loading ? 'Llamando...' : 'Llamar API'}
      </button>
      {response && (
        <pre style={{ background: '#f5f5f5', padding: 8, marginTop: 8, fontSize: 12 }}>
          {JSON.stringify(response, null, 2)}
        </pre>
      )}
    </div>
  );
}
