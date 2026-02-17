"use client";

import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";

export default function Hero() {
    const { user } = useAuth();
    return (
        <section
            id="hero"
            style={{
                position: "relative",
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                padding: "120px 24px 80px",
            }}
        >
            {/* Background Effects */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background:
                        "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(21, 101, 192, 0.08) 0%, transparent 60%)",
                    pointerEvents: "none",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    top: "15%",
                    right: "10%",
                    width: 400,
                    height: 400,
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(21, 101, 192, 0.06) 0%, transparent 70%)",
                    filter: "blur(60px)",
                    pointerEvents: "none",
                    animation: "glow-pulse 6s ease-in-out infinite",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    bottom: "20%",
                    left: "5%",
                    width: 300,
                    height: 300,
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(21, 101, 192, 0.05) 0%, transparent 70%)",
                    filter: "blur(80px)",
                    pointerEvents: "none",
                    animation: "glow-pulse 8s ease-in-out infinite 2s",
                }}
            />

            {/* Grid overlay */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                    pointerEvents: "none",
                }}
            />

            {/* Content */}
            <div
                className="reveal"
                style={{
                    position: "relative",
                    zIndex: 1,
                    textAlign: "center",
                    maxWidth: 820,
                }}
            >
                {/* Welcome line */}
                <p
                    style={{
                        fontSize: "clamp(1rem, 2vw, 1.15rem)",
                        fontWeight: 600,
                        color: "var(--text-secondary)",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        marginBottom: 0,
                    }}
                >
                    Welcome to
                </p>

                <h1
                    style={{
                        fontSize: "clamp(2.8rem, 7vw, 5rem)",
                        fontWeight: 900,
                        letterSpacing: "-0.04em",
                        lineHeight: 1.05,
                        marginBottom: 8,
                    }}
                >
                    D-COD
                    <br />
                    <span
                        style={{
                            background:
                                "linear-gradient(90deg, var(--accent), rgba(21, 101, 192, 0.7))",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}
                    >
                        Marketplace
                    </span>
                </h1>

                <div
                    className="neon-tag"
                    style={{ marginBottom: 24, display: "inline-flex" }}
                >
                    <span
                        style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: "var(--accent)",
                            boxShadow: "0 0 8px var(--accent)",
                            display: "inline-block",
                        }}
                    />
                    Secure • Verified • Live Now
                </div>

                <p
                    style={{
                        color: "var(--text-secondary)",
                        fontSize: "clamp(1rem, 2vw, 1.25rem)",
                        lineHeight: 1.7,
                        maxWidth: 580,
                        margin: "0 auto 40px",
                    }}
                >
                    The premier marketplace for verified Call of Duty: Mobile accounts.
                    Legendary skins, max-rank profiles, and rare blueprints — all secured
                    with escrow protection.
                </p>

                {/* Additional message for non-authenticated users */}
                {!user && (
                    <p
                        style={{
                            fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)",
                            color: "var(--accent)",
                            marginBottom: 40,
                            lineHeight: 1.6,
                            maxWidth: 600,
                            margin: "0 auto 40px",
                            fontWeight: 500,
                        }}
                    >
                        Login or sign up to browse the full marketplace and start selling your accounts
                    </p>
                )}

                {/* CTAs */}
                <div
                    style={{
                        display: "flex",
                        gap: 16,
                        justifyContent: "center",
                        flexWrap: "wrap",
                    }}
                >
                    {user ? (
                        <>
                            <Link href="/marketplace" className="btn-primary">
                                <span>🎯</span> See Available Accounts
                            </Link>
                            <Link href="/how-it-works" className="btn-outline">
                                How It Works
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="btn-primary">
                                <span>🔐</span> Login
                            </Link>
                            <Link href="/signup" className="btn-outline">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>

                {/* Stats Bar - Only show for authenticated users */}
                {user && (
                    <div
                        style={{
                            display: "flex",
                            gap: 48,
                            justifyContent: "center",
                            flexWrap: "wrap",
                            marginTop: 64,
                            paddingTop: 40,
                            borderTop: "1px solid var(--border-glass)",
                        }}
                    >
                        {[
                            { value: "12,400+", label: "Accounts Sold" },
                            { value: "$2.1M+", label: "Total Volume" },
                            { value: "99.7%", label: "Success Rate" },
                        ].map((stat) => (
                            <div key={stat.label} style={{ textAlign: "center" }}>
                                <div
                                    style={{
                                        fontSize: "1.8rem",
                                        fontWeight: 800,
                                        color: "var(--accent)",
                                        letterSpacing: "-0.02em",
                                        fontFamily: "var(--font-mono, monospace)",
                                    }}
                                >
                                    {stat.value}
                                </div>
                                <div
                                    style={{
                                        fontSize: "0.85rem",
                                        color: "var(--text-tertiary)",
                                        marginTop: 4,
                                        fontWeight: 500,
                                    }}
                                >
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                        <p style={{ width: "100%", fontSize: "0.7rem", color: "var(--text-tertiary)", marginTop: 8, opacity: 0.8 }}>
                            Community stats — trusted by players worldwide
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
