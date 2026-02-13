export default function Loading() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg-primary)",
        zIndex: 9999,
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div className="loading-spinner" style={{ margin: "0 auto 16px" }} />
        <p style={{ fontSize: "0.9rem", color: "var(--text-tertiary)" }}>Loading...</p>
      </div>
    </div>
  );
}
