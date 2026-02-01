import { useEffect, useState } from "react";
import { api } from "./api/api";

function App() {
  const [status, setStatus] = useState("Conectando...");
  const [saved, setSaved] = useState<number | null>(null);

  useEffect(() => {
    api
      .get("/api")
      .then(() => setStatus("Backend conectado ✅"))
      .catch(() => setStatus("Erro ao conectar ❌"));
  }, []);

  const buscarDados = async () => {
    try {
      const res = await api.get("/test");
      setSaved(res.data.saved);
    } catch {
      setStatus("Erro ao buscar dados ❌");
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>DevSight</h1>
      <p>{status}</p>

      <button onClick={buscarDados}>
        Buscar dados do Azure
      </button>

      {saved !== null && (
        <p style={{ marginTop: 12 }}>
          Itens salvos no banco: <strong>{saved}</strong>
        </p>
      )}
    </div>
  );
}

export default App;
