"use client";

import { useRouter } from "next/navigation";

export default function CommunityPage() {
    const router = useRouter();

    return (
        <main style={{ padding: "120px 24px 80px", maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
                <h1 className="section-title">
                    Join Our <span style={{ color: "var(--accent)" }}>Elite Community</span>
                </h1>
                <p className="section-subtitle" style={{ margin: "0 auto" }}>
                    Connect with fellow gamers and stay updated with the latest high-tier accounts before they hit the marketplace.
                </p>
            </div>

            <div className="glass-card" style={{ padding: "60px 40px", textAlign: "center", border: "1px solid var(--accent-subtle)" }}>
                <h2 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: 16 }}>
                    Choose Your Platform
                </h2>
                <p style={{ color: "var(--text-secondary)", marginBottom: 48, fontSize: "1.1rem" }}>
                    Join our community on your preferred platform to get exclusive access to new listings and updates.
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, maxWidth: 900, margin: "0 auto" }}>
                    <a href="https://chat.whatsapp.com/JOOjgOlepLyEYteUMAQjYI?mode=gi_c" target="_blank" rel="noopener noreferrer" style={{
                        display: "flex", flexDirection: "column", alignItems: "center", gap: 16,
                        background: "linear-gradient(135deg, #25D366, #20B954)", color: "white", padding: "32px 24px", borderRadius: 16,
                        textDecoration: "none", fontWeight: 700, transition: "transform 0.2s, box-shadow 0.2s",
                        boxShadow: "0 8px 32px rgba(37, 211, 102, 0.3)"
                    }} onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(37, 211, 102, 0.4)"; }}
                       onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(37, 211, 102, 0.3)"; }}>
                        <span style={{ fontSize: "3rem" }}>📱</span>
                        <div>
                            <div style={{ fontSize: "1.3rem", marginBottom: 8 }}>WhatsApp Group</div>
                            <div style={{ fontSize: "0.9rem", opacity: 0.9 }}>Real-time discussions and instant updates</div>
                        </div>
                    </a>

                    <a href="https://t.me/dcodmarketplace" target="_blank" rel="noopener noreferrer" style={{
                        display: "flex", flexDirection: "column", alignItems: "center", gap: 16,
                        background: "linear-gradient(135deg, #0088cc, #006699)", color: "white", padding: "32px 24px", borderRadius: 16,
                        textDecoration: "none", fontWeight: 700, transition: "transform 0.2s, box-shadow 0.2s",
                        boxShadow: "0 8px 32px rgba(0, 136, 204, 0.3)"
                    }} onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0, 136, 204, 0.4)"; }}
                       onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 136, 204, 0.3)"; }}>
                        <span style={{ fontSize: "3rem" }}>✈️</span>
                        <div>
                            <div style={{ fontSize: "1.3rem", marginBottom: 8 }}>Telegram Channel</div>
                            <div style={{ fontSize: "0.9rem", opacity: 0.9 }}>Official announcements and marketplace updates</div>
                        </div>
                    </a>

                    <a href="https://discord.com/users/dan1elcodm" target="_blank" rel="noopener noreferrer" style={{
                        display: "flex", flexDirection: "column", alignItems: "center", gap: 16,
                        background: "linear-gradient(135deg, #5865F2, #4752C4)", color: "white", padding: "32px 24px", borderRadius: 16,
                        textDecoration: "none", fontWeight: 700, transition: "transform 0.2s, box-shadow 0.2s",
                        boxShadow: "0 8px 32px rgba(88, 101, 242, 0.3)"
                    }} onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(88, 101, 242, 0.4)"; }}
                       onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(88, 101, 242, 0.3)"; }}>
                        <span style={{ fontSize: "3rem" }}>💬</span>
                        <div>
                            <div style={{ fontSize: "1.3rem", marginBottom: 8 }}>Discord Community</div>
                            <div style={{ fontSize: "0.9rem", opacity: 0.9 }}>Voice chats, gaming sessions, and community events</div>
                        </div>
                    </a>
                </div>

                <div style={{ marginTop: 48 }}>
                    <button
                        onClick={() => router.back()}
                        style={{
                            background: "rgba(255,255,255,0.1)",
                            border: "1px solid var(--border-glass)",
                            color: "var(--text-primary)",
                            padding: "12px 24px",
                            borderRadius: 8,
                            cursor: "pointer",
                            fontWeight: 600
                        }}
                    >
                        ← Back to Marketplace
                    </button>
                </div>
            </div>

            <style jsx>{`
                @media (max-width: 640px) {
                    .section-title {
                        font-size: 2.2rem !important;
                    }
                }
            `}</style>
        </main>
    );
}
