"use client";

import React, { useState } from "react";

export default function CommunitySection() {
    const [showCommunity, setShowCommunity] = useState(false);

    return (
        <section style={{ padding: "40px 24px", maxWidth: 1200, margin: "0 auto" }}>
            <div className="glass-card" style={{ padding: "40px 24px", textAlign: "center", border: "1px solid var(--accent-subtle)" }}>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: 16 }}>
                    Join the <span style={{ color: "var(--accent)" }}>Elite Community</span>
                </h3>
                <p style={{ color: "var(--text-secondary)", marginBottom: 32, fontSize: "1.1rem" }}>
                    Join our community to see recent available accounts before they hit the marketplace.
                </p>

                {/* Toggle Button */}
                {!showCommunity ? (
                    <button
                        className="btn-primary"
                        onClick={() => setShowCommunity(true)}
                        style={{ padding: "16px 48px", fontSize: "1.1rem" }}
                    >
                        Join Community
                    </button>
                ) : (
                    <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", animation: "fadeIn 0.5s ease" }}>
                        <a href="https://chat.whatsapp.com/JOOjgOlepLyEYteUMAQjYI?mode=gi_c" target="_blank" rel="noopener noreferrer" style={{
                            display: "flex", alignItems: "center", gap: 10,
                            background: "#25D366", color: "white", padding: "14px 28px", borderRadius: 12,
                            textDecoration: "none", fontWeight: 700, transition: "transform 0.2s"
                        }} onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
                            <span>📱</span> WhatsApp Group
                        </a>
                        <a href="#" style={{
                            display: "flex", alignItems: "center", gap: 10,
                            background: "#0088cc", color: "white", padding: "14px 28px", borderRadius: 12,
                            textDecoration: "none", fontWeight: 700, transition: "transform 0.2s"
                        }} onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
                            <span>✈️</span> Telegram Channel
                        </a>
                        <a href="#" style={{
                            display: "flex", alignItems: "center", gap: 10,
                            background: "#5865F2", color: "white", padding: "14px 28px", borderRadius: 12,
                            textDecoration: "none", fontWeight: 700, transition: "transform 0.2s"
                        }} onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
                            <span>💬</span> Discord Community
                        </a>
                    </div>
                )}
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </section>
    );
}
