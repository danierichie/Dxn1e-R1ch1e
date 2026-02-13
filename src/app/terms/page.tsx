import Link from "next/link";

export const metadata = {
  title: "Terms of Service — D-COD MARKETPLACE",
  description: "Terms of service for D-COD MARKETPLACE.",
};

export default function TermsPage() {
  return (
    <main style={{ padding: "120px 24px 80px", maxWidth: 720, margin: "0 auto" }}>
      <Link href="/" style={{ color: "var(--accent)", fontSize: "0.9rem", marginBottom: 24, display: "inline-block" }}>← Back</Link>
      <h1 className="section-title" style={{ marginBottom: 24 }}>Terms of Service</h1>
      <p style={{ color: "var(--text-tertiary)", fontSize: "0.9rem", marginBottom: 32 }}>Last updated: 2026</p>
      <div style={{ color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "0.95rem" }}>
        <p style={{ marginBottom: 20 }}>
          By using D-COD MARKETPLACE you agree to these terms. Our platform facilitates the buying and selling of Call of Duty: Mobile account credentials. You must be of legal age and comply with the game&apos;s terms and applicable laws.
        </p>
        <h2 style={{ fontSize: "1.2rem", color: "var(--text-primary)", marginTop: 32, marginBottom: 12 }}>Eligibility</h2>
        <p style={{ marginBottom: 20 }}>You must be at least 18 years old and able to enter into binding agreements. You are responsible for the accuracy of information you provide.</p>
        <h2 style={{ fontSize: "1.2rem", color: "var(--text-primary)", marginTop: 32, marginBottom: 12 }}>Transactions</h2>
        <p style={{ marginBottom: 20 }}>All sales are subject to our escrow and verification process. Refunds and disputes are handled on a case-by-case basis. We are not responsible for account bans or issues arising from the game&apos;s policies.</p>
        <h2 style={{ fontSize: "1.2rem", color: "var(--text-primary)", marginTop: 32, marginBottom: 12 }}>Contact</h2>
        <p style={{ marginBottom: 20 }}>For questions about these terms, visit our <Link href="/contact" style={{ color: "var(--accent)" }}>Contact</Link> page.</p>
      </div>
    </main>
  );
}
