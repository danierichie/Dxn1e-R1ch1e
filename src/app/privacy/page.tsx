import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — D-COD MARKETPLACE",
  description: "Privacy policy for D-COD MARKETPLACE.",
};

export default function PrivacyPage() {
  return (
    <main style={{ padding: "120px 24px 80px", maxWidth: 720, margin: "0 auto" }}>
      <Link href="/" style={{ color: "var(--accent)", fontSize: "0.9rem", marginBottom: 24, display: "inline-block" }}>← Back</Link>
      <h1 className="section-title" style={{ marginBottom: 24 }}>Privacy Policy</h1>
      <p style={{ color: "var(--text-tertiary)", fontSize: "0.9rem", marginBottom: 32 }}>Last updated: 2026</p>
      <div style={{ color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "0.95rem" }}>
        <p style={{ marginBottom: 20 }}>
          D-COD MARKETPLACE (&quot;we&quot;) respects your privacy. This policy describes how we collect, use, and protect your information when you use our marketplace and services.
        </p>
        <h2 style={{ fontSize: "1.2rem", color: "var(--text-primary)", marginTop: 32, marginBottom: 12 }}>Information we collect</h2>
        <p style={{ marginBottom: 20 }}>We may collect information you provide when creating an account, making a purchase, or contacting us (e.g. name, email, WhatsApp, payment-related details). We also collect usage data to improve our site.</p>
        <h2 style={{ fontSize: "1.2rem", color: "var(--text-primary)", marginTop: 32, marginBottom: 12 }}>How we use it</h2>
        <p style={{ marginBottom: 20 }}>We use your information to process transactions, provide support, send updates, and improve our services. We do not sell your personal data to third parties.</p>
        <h2 style={{ fontSize: "1.2rem", color: "var(--text-primary)", marginTop: 32, marginBottom: 12 }}>Contact</h2>
        <p style={{ marginBottom: 20 }}>For privacy-related questions, contact us via the <Link href="/contact" style={{ color: "var(--accent)" }}>Contact</Link> page.</p>
      </div>
    </main>
  );
}
