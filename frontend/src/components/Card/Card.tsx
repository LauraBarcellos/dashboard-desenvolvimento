type CardProps = {
  title: string;
  value: string | number;
  subtitle?: string;
};

export function Card({ title, value, subtitle }: CardProps) {
  return (
    <div
      style={{
        background: "var(--card)",
        borderRadius: 16,
        padding: 24,
        minWidth: 240,
        border: "1px solid var(--border)",
      }}
    >
      <p style={{ color: "var(--muted)", fontSize: 12 }}>{title}</p>

      <h2 style={{ margin: "8px 0", fontSize: 32 }}>{value}</h2>

      {subtitle && (
        <p style={{ fontSize: 12, color: "var(--muted)" }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
