"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <nav
            style={{
                position: "fixed",
                top: 3,
                left: 0,
                right: 0,
                zIndex: 50,
                background: "rgba(13, 13, 13, 0.8)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
            }}
        >
            <div
                style={{
                    maxWidth: 1200,
                    margin: "0 auto",
                    padding: "0 24px",
                    height: 72,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                {/* Logo */}
                <Link
                    href="/"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        textDecoration: "none",
                        color: "var(--text-primary)",
                    }}
                >
                    <div
                        style={{
                            width: 36,
                            height: 36,
                            borderRadius: 10,
                            background:
                                "linear-gradient(135deg, var(--accent), rgba(21, 101, 192, 0.7))",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 900,
                            fontSize: 16,
                            color: "#0D0D0D",
                        }}
                    >
                        DM
                    </div>
                    <span
                        style={{
                            fontWeight: 800,
                            fontSize: "1.15rem",
                            letterSpacing: "-0.02em",
                        }}
                    >
                        D-COD
                        <span style={{ color: "var(--accent)" }}> MARKETPLACE</span>
                    </span>
                </Link>

                {/* Desktop Links */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 36,
                    }}
                    className="nav-desktop"
                >
                    {[
                        { label: "Home", href: "/" },
                        { label: "Marketplace", href: "/marketplace" },
                        { label: "Order History", href: "/order-history" },
                        { label: "Sell to Us", href: "/sell-to-us" },
                        { label: "How It Works", href: "/how-it-works" },
                        { label: "Contact", href: "/contact" },
                    ].map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            style={{
                                color: "var(--text-secondary)",
                                textDecoration: "none",
                                fontSize: "0.9rem",
                                fontWeight: 500,
                                transition: "color 0.2s",
                                letterSpacing: "0.01em",
                            }}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.color = "var(--accent)")
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.color = "var(--text-secondary)")
                            }
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="nav-mobile-toggle"
                    style={{
                        display: "none",
                        background: "none",
                        border: "none",
                        color: "var(--text-primary)",
                        fontSize: 24,
                        cursor: "pointer",
                        padding: 4,
                    }}
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? "✕" : "☰"}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div
                    className="nav-mobile-menu"
                    style={{
                        padding: "16px 24px 24px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 16,
                        borderTop: "1px solid rgba(255,255,255,0.06)",
                    }}
                >
                    {[
                        { label: "Home", href: "/" },
                        { label: "Marketplace", href: "/marketplace" },
                        { label: "Order History", href: "/order-history" },
                        { label: "Sell to Us", href: "/sell-to-us" },
                        { label: "How It Works", href: "/how-it-works" },
                        { label: "Contact", href: "/contact" },
                    ].map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            style={{
                                color: "var(--text-secondary)",
                                textDecoration: "none",
                                fontSize: "1rem",
                                fontWeight: 500,
                                padding: "8px 0",
                            }}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            )}

            <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-toggle { display: block !important; }
        }
      `}</style>
        </nav>
    );
}
