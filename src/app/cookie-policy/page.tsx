import Link from "next/link";

export const metadata = {
  title: "Cookie Policy — D-COD MARKETPLACE",
  description: "Cookie policy for D-COD MARKETPLACE.",
};

export default function CookiePolicyPage() {
  return (
    <main style={{ padding: "120px 24px 80px", maxWidth: 720, margin: "0 auto" }}>
      <Link href="/" style={{ color: "var(--accent)", fontSize: "0.9rem", marginBottom: 24, display: "inline-block" }}>← Back</Link>
      <h1 className="section-title" style={{ marginBottom: 24 }}>Cookie Policy</h1>
      <p style={{ color: "var(--text-tertiary)", fontSize: "0.9rem", marginBottom: 32 }}>Last updated: 2026</p>
      <div style={{ color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "0.95rem" }}>
        <p style={{ marginBottom: 20 }}>
          D-COD MARKETPLACE may use cookies and similar technologies to provide and improve our service, remember your preferences, and analyze site usage.
        </p>
        <h2 style={{ fontSize: "1.2rem", color: "var(--text-primary)", marginTop: 32, marginBottom: 12 }}>What we use</h2>
        <p style={{ marginBottom: 20 }}>We use essential cookies for site functionality (e.g. keeping you logged in, storing cart or listing data in your browser). We may use analytics cookies to understand how visitors use our site.</p>
        <h2 style={{ fontSize: "1.2rem", color: "var(--text-primary)", marginTop: 32, marginBottom: 12 }}>Your choices</h2>
        <p style={{ marginBottom: 20 }}>You can control or delete cookies via your browser settings. Disabling essential cookies may affect how the marketplace works.</p>
        <h2 style={{ fontSize: "1.2rem", color: "var(--text-primary)", marginTop: 32, marginBottom: 12 }}>Contact</h2>
        <p style={{ marginBottom: 20 }}>Questions? Reach out via our <Link href="/contact" style={{ color: "var(--accent)" }}>Contact</Link> page.</p>
      </div>
    </main>
  );
}
