import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function ApiCall() {
  const { getAccessTokenSilently } = useAuth0();
  const [respuesta, setRespuesta] = useState(null);
  const [cargando, setCargando] = useState(false);

  const llamarApi = async () => {
    setCargando(true);
    try {
      const token = await getAccessTokenSilently();

      const res = await fetch(`${API_URL}/api/datos`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setRespuesta(await res.json());
    } catch (err) {
      setRespuesta({ error: err.message });
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={{ border: '1px solid #ddd', padding: 16, margin: '16px 0', borderRadius: 8 }}>
      <h2>Llamada al backend (FastAPI)</h2>
      <p>Llama a <code>GET /api/datos</code> enviando el Bearer token en el header.</p>
      <button onClick={llamarApi} disabled={cargando}>
        {cargando ? 'Llamando...' : 'Llamar API'}
      </button>
      {respuesta && (
        <pre style={{ background: '#f5f5f5', padding: 8, marginTop: 8, fontSize: 12 }}>
          {JSON.stringify(respuesta, null, 2)}
        </pre>
      )}
    </div>
  );
}
