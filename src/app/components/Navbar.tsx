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

    // Touch gesture handlers for mobile menu
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
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        // Swipe left to close menu (common mobile pattern)
        if (isLeftSwipe && mobileOpen) {
            setMobileOpen(false);
        }
    };

    return (
        <nav
            style={{
                position: "fixed",
                top: 3,
                left: 0,
                right: 0,
                zIndex: 50,
                background: "var(--bg-glass)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                borderBottom: "1px solid var(--border-glass)",
                boxShadow: "0 1px 3px var(--bg-primary)",
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
                {/* Logo and Notification Bell */}
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
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

                    {/* Notification Bell */}
                    <NotificationSystem />
                </div>

                {/* Desktop Navigation */}
                <div
                    className="nav-desktop"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 32,
                    }}
                >
                    {/* Navigation Links */}
                    <div style={{ display: "flex", gap: 24 }}>
                        {(user ? [
                            { label: "Home", href: "/" },
                            { label: "Marketplace", href: "/marketplace" },
                            { label: "Order History", href: "/order-history" },
                            { label: "Sell to Us", href: "/sell-to-us" },
                            { label: "How It Works", href: "/how-it-works" },
                            { label: "Contact", href: "/contact" },
                        ] : [
                            { label: "Home", href: "/" },
                            { label: "Marketplace", href: "/marketplace" },
                            { label: "Contact", href: "/contact" },
                        ]).map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                style={{
                                    color: pathname === item.href ? "var(--accent)" : "var(--text-secondary)",
                                    textDecoration: "none",
                                    fontSize: "0.9rem",
                                    fontWeight: pathname === item.href ? 600 : 500,
                                    transition: "color 0.2s",
                                    letterSpacing: "0.01em",
                                    position: "relative",
                                }}
                                onMouseEnter={(e) => {
                                    if (pathname !== item.href) {
                                        e.currentTarget.style.color = "var(--accent)";
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (pathname !== item.href) {
                                        e.currentTarget.style.color = "var(--text-secondary)";
                                    }
                                }}
                            >
                                {item.label}
                                {pathname === item.href && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            bottom: "-8px",
                                            left: 0,
                                            right: 0,
                                            height: "2px",
                                            background: "var(--accent)",
                                            borderRadius: "1px",
                                        }}
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Auth Section */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <ThemeToggle />
                        {user ? (
                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                <Link
                                    href="/profile"
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 8,
                                        padding: "8px 16px",
                                        background: "var(--bg-glass)",
                                        border: "1px solid var(--border-glass)",
                                        borderRadius: "20px",
                                        textDecoration: "none",
                                        color: "var(--text-primary)",
                                        fontSize: "0.9rem",
                                        transition: "all 0.2s",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = "var(--bg-glass-hover)";
                                        e.currentTarget.style.borderColor = "var(--border-accent)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = "var(--bg-glass)";
                                        e.currentTarget.style.borderColor = "var(--border-glass)";
                                    }}
                                >
                                    <div style={{
                                        width: "24px",
                                        height: "24px",
                                        borderRadius: "50%",
                                        background: "var(--accent)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "white",
                                        fontSize: "0.7rem",
                                        fontWeight: "bold"
                                    }}>
                                        {user.fullName.charAt(0).toUpperCase()}
                                    </div>
                                    <span>{user.fullName}</span>
                                </Link>
                                <button
                                    onClick={logout}
                                    style={{
                                        background: "none",
                                        border: "1px solid var(--border-glass)",
                                        color: "var(--text-secondary)",
                                        padding: "8px 16px",
                                        borderRadius: "20px",
                                        fontSize: "0.9rem",
                                        cursor: "pointer",
                                        transition: "all 0.2s",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = "var(--accent)";
                                        e.currentTarget.style.color = "var(--accent)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = "var(--border-glass)";
                                        e.currentTarget.style.color = "var(--text-secondary)";
                                    }}
                                >
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                <Link
                                    href="/login"
                                    style={{
                                        background: "none",
                                        border: "1px solid var(--border-glass)",
                                        color: "var(--text-secondary)",
                                        padding: "8px 16px",
                                        borderRadius: "20px",
                                        fontSize: "0.9rem",
                                        cursor: "pointer",
                                        transition: "all 0.2s",
                                        textDecoration: "none",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = "var(--accent)";
                                        e.currentTarget.style.color = "var(--accent)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = "var(--border-glass)";
                                        e.currentTarget.style.color = "var(--text-secondary)";
                                    }}
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/signup"
                                    className="btn-primary"
                                    style={{ padding: "10px 20px", fontSize: "0.9rem", textDecoration: "none" }}
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
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
                        borderTop: "1px solid var(--border-glass)",
                    }}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    {/* Mobile Theme Toggle */}
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "8px 0",
                        borderBottom: "1px solid var(--border-glass)",
                        marginBottom: "8px"
                    }}>
                        <span style={{
                            fontSize: "0.9rem",
                            color: "var(--text-secondary)",
                            fontWeight: 500
                        }}>
                            Theme
                        </span>
                        <ThemeToggle />
                    </div>

                    {/* Mobile User Profile (if logged in) */}
                    {user && (
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            padding: "12px",
                            background: "var(--bg-glass)",
                            borderRadius: "12px",
                            border: "1px solid var(--border-glass)",
                            marginBottom: "8px"
                        }}>
                            <div style={{
                                width: "32px",
                                height: "32px",
                                borderRadius: "50%",
                                background: "var(--accent)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "white",
                                fontSize: "0.8rem",
                                fontWeight: "bold"
                            }}>
                                {user.fullName.charAt(0).toUpperCase()}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{
                                    fontSize: "0.9rem",
                                    fontWeight: 600,
                                    color: "var(--text-primary)",
                                    marginBottom: "2px"
                                }}>
                                    {user.fullName}
                                </div>
                                <div style={{
                                    fontSize: "0.8rem",
                                    color: "var(--text-secondary)"
                                }}>
                                    {user.email}
                                </div>
                            </div>
                            <Link
                                href="/profile"
                                onClick={() => setMobileOpen(false)}
                                style={{
                                    padding: "6px 12px",
                                    background: "var(--accent)",
                                    color: "white",
                                    textDecoration: "none",
                                    borderRadius: "8px",
                                    fontSize: "0.8rem",
                                    fontWeight: 600
                                }}
                            >
                                Profile
                            </Link>
                        </div>
                    )}

                    {/* Mobile Navigation Links */}
                    {(user ? [
                        { label: "Home", href: "/" },
                        { label: "Marketplace", href: "/marketplace" },
                        { label: "Order History", href: "/order-history" },
                        { label: "Sell to Us", href: "/sell-to-us" },
                        { label: "How It Works", href: "/how-it-works" },
                        { label: "Contact", href: "/contact" },
                    ] : [
                        { label: "Home", href: "/" },
                        { label: "Marketplace", href: "/marketplace" },
                        { label: "Contact", href: "/contact" },
                    ]).map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            style={{
                                color: pathname === item.href ? "var(--accent)" : "var(--text-secondary)",
                                textDecoration: "none",
                                fontSize: "1rem",
                                fontWeight: pathname === item.href ? 600 : 500,
                                padding: "8px 0",
                                borderLeft: pathname === item.href ? "3px solid var(--accent)" : "none",
                                paddingLeft: pathname === item.href ? "12px" : "0",
                            }}
                        >
                            {item.label}
                        </Link>
                    ))}
                    
                    {/* Mobile Auth Links (only for non-logged-in users) */}
                    {!user && (
                        <>
                            <div style={{ borderTop: "1px solid var(--border-glass)", marginTop: "8px", paddingTop: "16px" }}>
                                <Link
                                    href="/login"
                                    onClick={() => setMobileOpen(false)}
                                    style={{
                                        color: "var(--accent)",
                                        textDecoration: "none",
                                        fontSize: "1rem",
                                        fontWeight: 600,
                                        padding: "12px 0",
                                        display: "block"
                                    }}
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/signup"
                                    onClick={() => setMobileOpen(false)}
                                    style={{
                                        color: "var(--accent)",
                                        textDecoration: "none",
                                        fontSize: "1rem",
                                        fontWeight: 600,
                                        padding: "8px 0",
                                        display: "block"
                                    }}
                                >
                                    Sign Up
                                </Link>
                            </div>
                        </>
                    )}

                    {/* Mobile Logout (only for logged-in users) */}
                    {user && (
                        <div style={{ borderTop: "1px solid var(--border-glass)", marginTop: "8px", paddingTop: "16px" }}>
                            <button
                                onClick={() => {
                                    logout();
                                    setMobileOpen(false);
                                }}
                                style={{
                                    background: "none",
                                    border: "1px solid var(--border-glass)",
                                    color: "var(--text-secondary)",
                                    padding: "10px 16px",
                                    borderRadius: "8px",
                                    fontSize: "0.9rem",
                                    cursor: "pointer",
                                    width: "100%",
                                    transition: "all 0.2s"
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = "#ff4757";
                                    e.currentTarget.style.color = "#ff4757";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = "var(--border-glass)";
                                    e.currentTarget.style.color = "var(--text-secondary)";
                                }}
                            >
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            )}

            <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-toggle { display: block !important; }
          
          /* Enhanced mobile menu interactions */
          .nav-mobile-menu {
            -webkit-overflow-scrolling: touch;
            overscroll-behavior: contain;
            touch-action: pan-y;
            max-height: calc(100vh - 72px);
            overflow-y: auto;
          }
          
          /* Better touch feedback for menu items */
          .nav-mobile-menu a {
            transition: background-color 0.2s ease;
            border-radius: 8px;
            padding: 12px 8px !important;
            margin: 2px 0;
            touch-action: manipulation;
          }
          
          .nav-mobile-menu a:active {
            background-color: var(--bg-glass-hover) !important;
            transform: scale(0.98);
          }
          
          /* Better button touch feedback */
          .nav-mobile-menu button {
            touch-action: manipulation;
            transition: transform 0.1s ease;
          }
          
          .nav-mobile-menu button:active {
            transform: scale(0.95);
          }
          
          /* Prevent text selection in menu */
          .nav-mobile-menu {
            -webkit-user-select: none;
            user-select: none;
          }
          
          .nav-mobile-menu a,
          .nav-mobile-menu button {
            -webkit-user-select: none;
            user-select: none;
          }
        }
        
        @media (max-width: 480px) {
          .nav-mobile-menu {
            padding: 12px 16px 20px;
          }
          
          .nav-mobile-menu a {
            padding: 14px 8px !important;
            font-size: 1.1rem !important;
          }
        }
      `}</style>
        </nav>
    );
}
