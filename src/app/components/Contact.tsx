"use client";

import { Phone, Mail, MessageSquare, Send, MessageCircle } from "lucide-react";

export default function Contact() {
    const contactMethods = [
        {
            icon: <Phone size={32} />,
            label: "Phone",
            value: "+234 816 992 5603",
            link: "tel:+2348169925603",
            color: "#00D2FF"
        },
        {
            icon: <Mail size={32} />,
            label: "Email",
            value: "danielcodmgaming@gmail.com",
            link: "mailto:danielcodmgaming@gmail.com",
            color: "#FF6B6B"
        },
        {
            icon: <MessageSquare size={32} />,
            label: "Discord",
            value: "Join our Discord",
            link: "https://discord.gg/your-discord-code",
            color: "#5865F2"
        },
        {
            icon: <Send size={32} />,
            label: "Telegram",
            value: "@dcodmarketplace",
            link: "https://t.me/dcodmarketplace",
            color: "#0088CC"
        }
    ];

    return (
        <section id="contact" className="section" style={{ background: "rgba(21, 101, 192, 0.04)", padding: "100px 24px" }}>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
                <div
                    className="neon-tag"
                    style={{ marginBottom: 20, display: "inline-flex", alignItems: "center", gap: 8 }}
                >
                    <MessageCircle size={16} /> GET IN TOUCH
                </div>
                <h2 className="section-title" style={{ textAlign: "center" }}>
                    Have Questions? Reach Out <span style={{ color: "var(--accent)" }}>Directly</span>
                </h2>
                <p
                    className="section-subtitle"
                    style={{ margin: "0 auto", textAlign: "center" }}
                >
                    Our team is available 24/7 to assist you with account inquiries,
                    security questions, or custom requests.
                </p>
            </div>

            <div className="contact-grid">
                {contactMethods.map((method, i) => (
                    <a
                        key={method.label}
                        href={method.link}
                        target={method.link.startsWith("http") ? "_blank" : undefined}
                        rel={method.link.startsWith("http") ? "noopener noreferrer" : undefined}
                        className={`glass-card reveal reveal-delay-${i + 1}`}
                        style={{
                            textDecoration: "none",
                            color: "inherit",
                            padding: "32px",
                            textAlign: "center",
                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 16
                        }}
                    >
                        <div style={{
                            color: method.color,
                            marginBottom: 8,
                            filter: `drop-shadow(0 0 10px ${method.color}66)`
                        }}>
                            {method.icon}
                        </div>
                        <div>
                            <h3 style={{
                                fontSize: "0.8rem",
                                color: "var(--text-secondary)",
                                textTransform: "uppercase",
                                letterSpacing: "0.1em",
                                marginBottom: 4
                            }}>
                                {method.label}
                            </h3>
                            <div style={{
                                fontSize: "1.1rem",
                                fontWeight: 700,
                                color: method.color
                            }}>
                                {method.value}
                            </div>
                        </div>
                    </a>
                ))}
            </div>

            <style>{`
                .contact-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 24px;
                    max-width: 1200px;
                    margin: 0 auto;
                }
                .contact-grid a:hover {
                    transform: translateY(-8px);
                    border-color: var(--accent) !important;
                    background: rgba(255, 255, 255, 0.05) !important;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(21, 101, 192, 0.15);
                }
                @media (max-width: 1024px) {
                    .contact-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }
                @media (max-width: 640px) {
                    .contact-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </section>
    );
}
