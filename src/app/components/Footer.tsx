"use client";

import React from "react";

const footerLinks = {
    Support: ["Help Center", "Contact Us", "Dispute Resolution", "Trust & Safety"],
};

export default function Footer() {
    return (
        <footer
            style={{
                borderTop: "1px solid var(--border-glass)",
                background: "var(--bg-primary)",
            }}
        >
            <div
                style={{
                    maxWidth: 1200,
                    margin: "0 auto",
                    padding: "64px 24px 32px",
                }}
            >
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "2fr 1fr",
                        gap: 48,
                    }}
                    className="footer-grid"
                >
                    {/* Brand Column */}
                    <div>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                marginBottom: 20,
                            }}
                        >
                            <div
                                style={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: 8,
                                    background:
                                        "linear-gradient(135deg, var(--accent), rgba(21, 101, 192, 0.7))",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontWeight: 900,
                                    fontSize: 14,
                                    color: "#0D0D0D",
                                }}
                            >
                                DM
                            </div>
                            <span
                                style={{
                                    fontWeight: 800,
                                    fontSize: "1.05rem",
                                    letterSpacing: "-0.02em",
                                }}
                            >
                                D-COD <span style={{ color: "var(--accent)" }}>MARKETPLACE</span>
                            </span>
                        </div>
                        <p
                            style={{
                                color: "var(--text-secondary)",
                                fontSize: "0.9rem",
                                lineHeight: 1.7,
                                maxWidth: 300,
                                marginBottom: 24,
                            }}
                        >
                            The premier marketplace for verified Call of Duty: Mobile accounts.
                            Secured by escrow. Trusted by thousands.
                        </p>
                        <div style={{ display: "flex", gap: 12 }}>
                            {[
                                { icon: "𝕏", color: "#000000", bg: "#ffffff", href: "#" },
                                { icon: "📱", color: "#ffffff", bg: "#25D366", href: "https://chat.whatsapp.com/JOOjgOlepLyEYteUMAQjYI?mode=gi_c" },
                                { icon: "💬", color: "#ffffff", bg: "#5865F2", href: "#" }
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    {...(social.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 10,
                                        background: social.bg,
                                        color: social.color,
                                        border: "none",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: 18,
                                        textDecoration: "none",
                                        transition: "transform 0.2s",
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = "translateY(-2px)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = "translateY(0)";
                                    }}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link Columns */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h4
                                style={{
                                    fontSize: "0.8rem",
                                    fontWeight: 700,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.08em",
                                    color: "var(--text-primary)",
                                    marginBottom: 20,
                                }}
                            >
                                {category}
                            </h4>
                            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                {links.map((link) => {
                                    const href =
                                        category === "Support" && link === "Contact Us" ? "/contact" :
                                        category === "Support" && link === "Help Center" ? "/contact" :
                                        category === "Support" && link === "Dispute Resolution" ? "/contact" :
                                        category === "Support" && link === "Trust & Safety" ? "/how-it-works" : "#";
                                    return (
                                        <li key={link} style={{ marginBottom: 12 }}>
                                            <a
                                                href={href}
                                                style={{
                                                    color: "var(--text-tertiary)",
                                                    textDecoration: "none",
                                                    fontSize: "0.88rem",
                                                    transition: "color 0.2s",
                                                }}
                                                onMouseEnter={(e) =>
                                                    (e.currentTarget.style.color = "var(--accent)")
                                                }
                                                onMouseLeave={(e) =>
                                                    (e.currentTarget.style.color = "var(--text-tertiary)")
                                                }
                                            >
                                                {link}
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div
                    style={{
                        marginTop: 48,
                        paddingTop: 24,
                        borderTop: "1px solid var(--border-glass)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: 16,
                    }}
                >
                    <p
                        style={{
                            fontSize: "0.8rem",
                            color: "var(--text-tertiary)",
                        }}
                    >
                        © 2026 D-COD MARKETPLACE. All rights reserved.
                    </p>
                    <div style={{ display: "flex", gap: 24 }}>
                        <a href="/privacy" style={{ fontSize: "0.8rem", color: "var(--text-tertiary)", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-secondary)")} onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-tertiary)")}>Privacy Policy</a>
                        <a href="/terms" style={{ fontSize: "0.8rem", color: "var(--text-tertiary)", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-secondary)")} onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-tertiary)")}>Terms of Service</a>
                        <a href="/cookie-policy" style={{ fontSize: "0.8rem", color: "var(--text-tertiary)", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-secondary)")} onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-tertiary)")}>Cookie Policy</a>
                    </div>
                </div>
            </div>

            <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
        </footer>
    );
}
