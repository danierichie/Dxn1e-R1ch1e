"use client";

import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
import { Target, Lock } from "lucide-react";

export default function Hero() {
    const { user } = useAuth();
    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-20 px-6"
        >
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(21, 101, 192, 0.08) 0%, transparent 60%)"
                }}
            />
            <div
                className="absolute top-[15%] right-[10%] w-[400px] h-[400px] rounded-full pointer-events-none blur-[60px] animate-[glow-pulse_6s_ease-in-out_infinite]"
                style={{
                    background: "radial-gradient(circle, rgba(21, 101, 192, 0.06) 0%, transparent 70%)"
                }}
            />
            <div
                className="absolute bottom-[20%] left-[5%] w-[300px] h-[300px] rounded-full pointer-events-none blur-[80px] animate-[glow-pulse_8s_ease-in-out_infinite_2s]"
                style={{
                    background: "radial-gradient(circle, rgba(21, 101, 192, 0.05) 0%, transparent 70%)"
                }}
            />

            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
                    backgroundSize: "60px 60px"
                }}
            />

            <div className="reveal relative z-10 text-center max-w-[820px]">
                <h1 className="text-[clamp(2.8rem,7vw,5rem)] font-black tracking-tighter leading-none mb-2">
                    D-COD
                    <br />
                    <span className="bg-gradient-to-r from-[var(--accent)] to-[rgba(21,101,192,0.7)] bg-clip-text text-transparent">
                        Marketplace
                    </span>
                </h1>

                <div className="neon-tag inline-flex mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent)] inline-block" />
                    Secure • Verified • Live Now
                </div>

                <p className="text-[var(--text-secondary)] text-[clamp(1rem,2vw,1.25rem)] leading-relaxed max-w-[580px] mx-auto mb-10">
                    A secure place to pick up legendary CODM accounts. Hand-verified profiles,
                    rare weapon blueprints, and mythic skins — all handled safely
                    with escrow protection.
                </p>

                {!user && (
                    <p className="text-[clamp(0.9rem,1.5vw,1.05rem)] text-[var(--accent)] leading-relaxed max-w-[600px] mx-auto mb-10 font-medium">
                        Login or sign up to browse the full marketplace and start selling your accounts
                    </p>
                )}

                <div className="flex gap-4 justify-center flex-wrap">
                    {user ? (
                        <>
                            <Link href="/marketplace" className="btn-primary flex items-center gap-2">
                                <Target size={18} /> See Available Accounts
                            </Link>
                            <Link href="/how-it-works" className="btn-outline">
                                How to Buy/Sell
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="btn-primary flex items-center gap-2">
                                <Lock size={18} /> Login
                            </Link>
                            <Link href="/signup" className="btn-outline">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>

                {user && (
                    <div className="flex gap-12 justify-center flex-wrap mt-16 pt-10 border-t border-[var(--border-glass)]">
                        {[
                            { value: "12k+", label: "Successful Trades" },
                            { value: "Secure", label: "Escrow System" },
                            { value: "Instant", label: "Handover" },
                        ].map((stat) => (
                            <div key={stat.label} className="text-center">
                                <div className="text-3xl font-extrabold text-[var(--accent)] tracking-tight font-mono">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-[var(--text-tertiary)] mt-1 font-medium">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                        <p className="w-full text-[0.7rem] text-[var(--text-tertiary)] mt-2 opacity-80">
                            Community stats — trusted by players worldwide
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
