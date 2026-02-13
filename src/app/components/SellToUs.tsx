"use client";

import { useState } from "react";
import { WHATSAPP_PRIVATE_URL } from "../../lib/utils";
import { addSubmission } from "../../lib/data";

const steps = [
    {
        number: "01",
        icon: "⚡",
        title: "Fast Appraisal",
        description:
            "Submit your UID and screenshots. We'll verify your assets and send a competitive offer within 24 hours.",
    },
];

const whatWeBuy = [
    {
        icon: "🏆",
        title: "Legendary & Mythic Accounts",
        description: "High-rank accounts with rare skins and exclusive items",
    },
    {
        icon: "🎨",
        title: "Rare Skin Collections",
        description: "Accounts with OG season skins, battle pass exclusives, and limited drops",
    },
    {
        icon: "⚔️",
        title: "Competitive Ranked Accounts",
        description: "Master and above ranked accounts with strong K/D stats",
    },
    {
        icon: "💎",
        title: "Blueprint Collections",
        description: "Accounts loaded with rare weapon blueprints and camos like Damascus",
    },
];

export default function SellToUs() {
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [whatsappNumber, setWhatsappNumber] = useState("");
    const [accountUID, setAccountUID] = useState("");
    const [ign, setIgn] = useState("");
    const [accountLinks, setAccountLinks] = useState<string[]>([]);
    const [, setSettingsFile] = useState<File | null>(null);
    const [details, setDetails] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        const submission = {
            id: Date.now(),
            whatsapp: whatsappNumber,
            uid: accountUID,
            ign: ign,
            accountLink: accountLinks.join(", "),
            description: details,
            timestamp: new Date().toLocaleString()
        };

        // Save to local storage and API (Supabase) for admin view
        const existing = localStorage.getItem("sell_submissions");
        const list = existing ? JSON.parse(existing) : [];
        localStorage.setItem("sell_submissions", JSON.stringify([...list, submission]));
        addSubmission(submission);

        // Open your private DM with pre-filled sell request details
        const message = `*New Sell Request*\n\n*WhatsApp:* ${whatsappNumber}\n*Account UID:* ${accountUID}\n*IGN:* ${ign}\n*Account Link:* ${accountLinks.join(", ")}\n*Details:* ${details}`;
        const privateDmUrl = `${WHATSAPP_PRIVATE_URL}?text=${encodeURIComponent(message)}`;

        setTimeout(() => {
            setSubmitting(false);
            setSubmitted(true);
            window.open(privateDmUrl, "_blank");
        }, 800);
    };

    return (
        <section
            style={{
                padding: "120px 24px 100px",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Background effect */}
            <div
                style={{
                    position: "absolute",
                    top: "20%",
                    right: "-10%",
                    width: 600,
                    height: 600,
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(21, 101, 192, 0.06) 0%, transparent 70%)",
                    filter: "blur(80px)",
                    pointerEvents: "none",
                }}
            />

            <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
                {/* Header */}
                <div style={{ textAlign: "center", marginBottom: 80 }}>
                    <div
                        className="neon-tag"
                        style={{ marginBottom: 20, display: "inline-flex" }}
                    >
                        💸 SELL YOUR ACCOUNT
                    </div>
                    <h1
                        className="section-title"
                        style={{ textAlign: "center", marginBottom: 20 }}
                    >
                        Cash Out Your{" "}
                        <span style={{ color: "var(--accent)" }}>CODM Account</span>
                    </h1>
                    <p
                        className="section-subtitle"
                        style={{ margin: "0 auto", textAlign: "center", maxWidth: 620 }}
                    >
                        Got a stacked Call of Duty: Mobile account? We buy premium accounts at
                        competitive prices. Fast payments, zero hassle.
                    </p>
                </div>

                {/* How Selling Works */}
                <div style={{ marginBottom: 60, display: "flex", justifyContent: "center" }}>
                    {steps.map((step, i) => (
                        <div
                            key={step.number}
                            className={`glass-card reveal reveal-delay-${i + 1}`}
                            style={{
                                padding: "40px 32px",
                                textAlign: "center",
                                position: "relative",
                                maxWidth: 440,
                                width: "100%"
                            }}
                        >
                            <div
                                style={{
                                    position: "absolute",
                                    top: -1,
                                    right: 24,
                                    fontFamily: "var(--font-mono, monospace)",
                                    fontSize: "0.7rem",
                                    fontWeight: 700,
                                    color: "var(--accent)",
                                    background: "var(--bg-primary)",
                                    padding: "4px 12px",
                                    borderRadius: "0 0 8px 8px",
                                    border: "1px solid var(--border-accent)",
                                    borderTop: "none",
                                    letterSpacing: "0.08em",
                                }}
                            >
                                HOW IT WORKS
                            </div>

                            <div
                                style={{
                                    width: 72,
                                    height: 72,
                                    borderRadius: 20,
                                    background: "var(--accent-subtle)",
                                    border: "1px solid var(--border-accent)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: 28,
                                    margin: "0 auto 24px",
                                }}
                            >
                                {step.icon}
                            </div>

                            <h3
                                style={{
                                    fontSize: "1.2rem",
                                    fontWeight: 700,
                                    marginBottom: 12,
                                    letterSpacing: "-0.01em",
                                }}
                            >
                                {step.title}
                            </h3>

                            <p
                                style={{
                                    color: "var(--text-secondary)",
                                    fontSize: "0.9rem",
                                    lineHeight: 1.7,
                                }}
                            >
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Submission Form */}
                <div style={{ maxWidth: 800, margin: "0 auto 100px" }}>
                    <div className="glass-card" style={{ padding: 48 }}>
                        {submitted ? (
                            <div style={{ textAlign: "center", padding: "40px 0" }}>
                                <div style={{ fontSize: "3rem", marginBottom: 20 }}>🚀</div>
                                <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: 16 }}>Submission Received!</h2>
                                <p style={{ color: "var(--text-secondary)", marginBottom: 24 }}>Our team will review your account details and contact you within 24 hours.</p>
                                <button onClick={() => setSubmitted(false)} className="btn-outline">Submit Another Account</button>
                            </div>
                        ) : (
                            <>
                                <h2 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: 12, textAlign: "center" }}>Ready to Sell?</h2>
                                <p style={{ textAlign: "center", color: "var(--text-secondary)", marginBottom: 40 }}>Fill out the details below to get a free appraisal.</p>

                                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                                    <div>
                                        <label style={{ display: "block", marginBottom: 10, fontSize: "0.9rem", color: "var(--text-secondary)" }}>WhatsApp Number</label>
                                        <input
                                            type="tel"
                                            required
                                            value={whatsappNumber}
                                            onChange={(e) => setWhatsappNumber(e.target.value)}
                                            style={{ width: "100%", padding: 16, borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid var(--border-glass)", color: "white" }}
                                            placeholder="+234..."
                                        />
                                    </div>

                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                                        <div>
                                            <label style={{ display: "block", marginBottom: 10, fontSize: "0.9rem", color: "var(--text-secondary)" }}>Account UID</label>
                                            <input
                                                type="text"
                                                required
                                                value={accountUID}
                                                onChange={(e) => setAccountUID(e.target.value)}
                                                style={{ width: "100%", padding: 16, borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid var(--border-glass)", color: "white" }}
                                                placeholder="672..."
                                            />
                                        </div>
                                        <div>
                                            <label style={{ display: "block", marginBottom: 10, fontSize: "0.9rem", color: "var(--text-secondary)" }}>In-Game Name (IGN)</label>
                                            <input
                                                type="text"
                                                required
                                                value={ign}
                                                onChange={(e) => setIgn(e.target.value)}
                                                style={{ width: "100%", padding: 16, borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid var(--border-glass)", color: "white" }}
                                                placeholder="Pro_Player"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label style={{ display: "block", marginBottom: 12, fontSize: "0.9rem", color: "var(--text-secondary)" }}>Linked To (Select all that apply)</label>
                                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 12 }}>
                                            {["Apple", "Facebook", "Activision", "Google", "Line", "Guest/Gamecentre"].map(link => (
                                                <label key={link} style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 10,
                                                    padding: "12px 16px",
                                                    borderRadius: 10,
                                                    background: accountLinks.includes(link) ? "rgba(21, 101, 192, 0.15)" : "rgba(255,255,255,0.03)",
                                                    border: accountLinks.includes(link) ? "1px solid var(--accent)" : "1px solid var(--border-glass)",
                                                    cursor: "pointer",
                                                    fontSize: "0.85rem",
                                                    transition: "0.2s"
                                                }}>
                                                    <input
                                                        type="checkbox"
                                                        checked={accountLinks.includes(link)}
                                                        onChange={(e) => {
                                                            if (e.target.checked) setAccountLinks([...accountLinks, link]);
                                                            else setAccountLinks(accountLinks.filter(l => l !== link));
                                                        }}
                                                        style={{ accentColor: "var(--accent)" }}
                                                    />
                                                    {link}
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label style={{ display: "block", marginBottom: 10, fontSize: "0.9rem", color: "var(--text-secondary)" }}>Upload Account Settings (Screenshots)</label>
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={(e) => setSettingsFile(e.target.files?.[0] || null)}
                                            style={{ width: "100%", padding: 16, borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid var(--border-glass)", color: "white" }}
                                        />
                                    </div>

                                    <div>
                                        <label style={{ display: "block", marginBottom: 10, fontSize: "0.9rem", color: "var(--text-secondary)" }}>Additional Account Details</label>
                                        <textarea
                                            required
                                            value={details}
                                            onChange={(e) => setDetails(e.target.value)}
                                            style={{ width: "100%", padding: 16, borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid var(--border-glass)", color: "white", minHeight: 120 }}
                                            placeholder="Tell us more about the skins, blueprints, or achievements..."
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn-primary"
                                        disabled={submitting}
                                        style={{ padding: "18px", fontSize: "1rem" }}
                                    >
                                        {submitting ? "Processing..." : "📋 Submit Your Account"}
                                    </button>
                                </form>

                                <div style={{ marginTop: 32, textAlign: "center", borderTop: "1px solid var(--border-glass)", paddingTop: 32 }}>
                                    <p style={{ color: "var(--text-tertiary)", fontSize: "0.85rem", marginBottom: 16 }}>
                                        Prefer instant communication?
                                    </p>
                                    <a
                                        href={WHATSAPP_PRIVATE_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-outline"
                                        style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: 10,
                                            borderColor: "#25D366",
                                            color: "#25D366",
                                            padding: "14px 28px",
                                            fontSize: "0.95rem"
                                        }}
                                    >
                                        <span style={{ fontSize: "1.2rem" }}>💬</span>
                                        Chat with us directly for quick trade
                                    </a>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* What We Buy */}
                <div>
                    <h2
                        style={{
                            fontSize: "1.3rem",
                            fontWeight: 700,
                            textAlign: "center",
                            marginBottom: 48,
                            letterSpacing: "-0.01em",
                        }}
                    >
                        What We{" "}
                        <span style={{ color: "var(--accent)" }}>Buy</span>
                    </h2>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(2, 1fr)",
                            gap: 24,
                        }}
                        className="sell-buy-grid"
                    >
                        {whatWeBuy.map((item, i) => (
                            <div
                                key={item.title}
                                className={`glass-card reveal reveal-delay-${i + 1}`}
                                style={{
                                    padding: "32px",
                                    display: "flex",
                                    gap: 20,
                                    alignItems: "flex-start",
                                }}
                            >
                                <div
                                    style={{
                                        width: 56,
                                        height: 56,
                                        borderRadius: 16,
                                        background: "var(--accent-subtle)",
                                        border: "1px solid var(--border-accent)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: 24,
                                        flexShrink: 0,
                                    }}
                                >
                                    {item.icon}
                                </div>
                                <div>
                                    <h3
                                        style={{
                                            fontSize: "1.05rem",
                                            fontWeight: 700,
                                            marginBottom: 8,
                                        }}
                                    >
                                        {item.title}
                                    </h3>
                                    <p
                                        style={{
                                            color: "var(--text-secondary)",
                                            fontSize: "0.88rem",
                                            lineHeight: 1.6,
                                        }}
                                    >
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                @media (max-width: 768px) {
                    .sell-buy-grid {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </section>
    );
}
