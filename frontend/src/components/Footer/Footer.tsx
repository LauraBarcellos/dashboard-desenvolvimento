export function Footer() {
  return (
    <footer
      style={{
        padding: 20,
        textAlign: "center",
        color: "#888",
        fontSize: 12,
        borderTop: "1px solid #2a2a35",
        marginTop: 40,
      }}
    >
      DevSight © {new Date().getFullYear()}
    </footer>
  );
}
