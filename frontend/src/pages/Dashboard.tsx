import { Card } from "../components/Card/Card";
import { DefaultLayout } from "../layouts/DefaultLayout";

export function Dashboard() {
  return (
    <DefaultLayout>
      <div style={{ display: "flex", gap: 20 }}>
        <Card
          title="Total de Itens"
          value={128}
          subtitle="Últimos 30 dias"
        />
      </div>
    </DefaultLayout>
  );
}
