"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";
import ThemeToggle from "./ThemeToggle";
import NotificationSystem from "./NotificationSystem";

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const { user, logout } = useAuth();
    const pathname = usePathname();

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(0);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        if (distance > 50 && mobileOpen) {
            setMobileOpen(false);
        }
    };

    const navLinks = user ? [
        { label: "Home", href: "/" },
        { label: "Marketplace", href: "/marketplace" },
        { label: "Order History", href: "/order-history" },
        { label: "Sell to Us", href: "/sell-to-us" },
        { label: "How to Buy/Sell", href: "/how-it-works" },
        { label: "Contact", href: "/contact" },
    ] : [
        { label: "Home", href: "/" },
        { label: "Marketplace", href: "/marketplace" },
        { label: "How to Buy/Sell", href: "/how-it-works" },
        { label: "Contact", href: "/contact" },
    ];

    return (
        <nav className="fixed top-[3px] left-0 right-0 z-50 bg-[var(--bg-glass)] backdrop-blur-xl border-b border-[var(--border-glass)] shadow-sm">
            <div className="max-w-[1200px] mx-auto px-6 h-[72px] flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/" className="flex items-center gap-2.5 no-underline text-[var(--text-primary)]">
                        <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-[var(--accent)] to-[rgba(21,101,192,0.7)] flex items-center justify-center font-black text-base text-[#0D0D0D]">
                            DM
                        </div>
                        <span className="font-extrabold text-lg tracking-tight">
                            D-COD<span className="text-[var(--accent)]"> MARKETPLACE</span>
                        </span>
                    </Link>
                    <NotificationSystem />
                </div>

                <div className="hidden md:flex items-center gap-8">
                    <div className="flex gap-6">
                        {navLinks.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`no-underline text-sm tracking-wide relative transition-colors duration-200 hover:text-[var(--accent)]
                                    ${pathname === item.href
                                        ? 'text-[var(--accent)] font-semibold'
                                        : 'text-[var(--text-secondary)] font-medium'
                                    }`}
                            >
                                {item.label}
                                {pathname === item.href && (
                                    <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-[var(--accent)] rounded-sm" />
                                )}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        {user ? (
                            <div className="flex items-center gap-3">
                                <Link
                                    href="/profile"
                                    className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-glass)] border border-[var(--border-glass)] rounded-full no-underline text-[var(--text-primary)] text-sm transition-all duration-200 hover:bg-[var(--bg-glass-hover)] hover:border-[var(--border-accent)]"
                                >
                                    <div className="w-6 h-6 rounded-full bg-[var(--accent)] flex items-center justify-center text-white text-[0.7rem] font-bold">
                                        {(user.fullName || user.email || "?").charAt(0).toUpperCase()}
                                    </div>
                                    <span>{user.fullName || user.email.split('@')[0]}</span>
                                </Link>
                                <button
                                    onClick={logout}
                                    className="bg-transparent border border-[var(--border-glass)] text-[var(--text-secondary)] px-4 py-2 rounded-full text-sm cursor-pointer transition-all duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)]"
                                >
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link
                                    href="/login"
                                    className="btn-primary !py-2.5 !px-6 !text-sm no-underline flex items-center gap-2"
                                >
                                    Sign In
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="md:hidden bg-transparent border-none text-[var(--text-primary)] text-2xl cursor-pointer p-1"
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? "✕" : "☰"}
                </button>
            </div>

            {mobileOpen && (
                <div
                    className="md:hidden px-6 py-4 pb-6 flex flex-col gap-4 border-t border-[var(--border-glass)] max-h-[calc(100vh-72px)] overflow-y-auto select-none touch-pan-y"
                    style={{ WebkitOverflowScrolling: "touch", overscrollBehavior: "contain" }}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <div className="flex items-center justify-between py-2 border-b border-[var(--border-glass)] mb-2">
                        <span className="text-sm text-[var(--text-secondary)] font-medium">Theme</span>
                        <ThemeToggle />
                    </div>

                    {user && (
                        <div className="flex items-center gap-3 p-3 bg-[var(--bg-glass)] rounded-xl border border-[var(--border-glass)] mb-2">
                            <div className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center text-white text-sm font-bold">
                                {(user.fullName || user.email || "?").charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1">
                                <div className="text-sm font-semibold text-[var(--text-primary)] mb-0.5">{user.fullName || user.email.split('@')[0]}</div>
                                <div className="text-xs text-[var(--text-secondary)]">{user.email}</div>
                            </div>
                            <Link
                                href="/profile"
                                onClick={() => setMobileOpen(false)}
                                className="px-3 py-1.5 bg-[var(--accent)] text-white no-underline rounded-lg text-xs font-semibold"
                            >
                                Profile
                            </Link>
                        </div>
                    )}

                    {navLinks.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className={`no-underline text-base py-3 px-2 rounded-lg active:bg-[var(--bg-glass-hover)] active:scale-[0.98] transition-all touch-manipulation select-none
                                ${pathname === item.href
                                    ? 'text-[var(--accent)] font-semibold border-l-[3px] border-l-[var(--accent)] pl-3'
                                    : 'text-[var(--text-secondary)] font-medium'
                                }`}
                        >
                            {item.label}
                        </Link>
                    ))}

                    {!user && (
                        <div className="border-t border-[var(--border-glass)] mt-2 pt-4">
                            <Link
                                href="/login"
                                onClick={() => setMobileOpen(false)}
                                className="btn-primary block w-full !text-center no-underline text-base font-semibold py-3"
                            >
                                Sign In
                            </Link>
                        </div>
                    )}

                    {user && (
                        <div className="border-t border-[var(--border-glass)] mt-2 pt-4">
                            <button
                                onClick={() => {
                                    logout();
                                    setMobileOpen(false);
                                }}
                                className="w-full bg-transparent border border-[var(--border-glass)] text-[var(--text-secondary)] py-2.5 px-4 rounded-lg text-sm cursor-pointer transition-all duration-200 hover:border-red-500 hover:text-red-500 active:scale-95 touch-manipulation select-none"
                            >
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
}
