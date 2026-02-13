"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { initialListings } from "../data/seedData";

interface Listing {
    id: number;
    title: string;
    rank: string;
    level: number;
    skins: number;
    blueprints: number;
    price: number;
    tag?: string | null;
    rankColor?: string;
}

export default function FeaturedListings() {
    const [listings, setListings] = useState<Listing[]>([]);

    useEffect(() => {
        queueMicrotask(() => {
            const saved = localStorage.getItem("market_listings");
            if (saved) {
                setListings(JSON.parse(saved));
            } else {
                setListings(initialListings);
                localStorage.setItem("market_listings", JSON.stringify(initialListings));
            }
        });
    }, []);

    // Show only the latest 6 for the featured section
    const featured = [...listings].reverse().slice(0, 6);

    return (
        <section id="marketplace" className="section">
            <div style={{ textAlign: "center", marginBottom: 60 }}>
                <div
                    className="neon-tag"
                    style={{ marginBottom: 20, display: "inline-flex" }}
                >
                    🔥 FEATURED ACCOUNTS
                </div>
                <h2 className="section-title" style={{ textAlign: "center" }}>
                    Top-Tier Accounts,{" "}
                    <span style={{ color: "var(--accent)" }}>Verified</span>
                </h2>
                <p
                    className="section-subtitle"
                    style={{ margin: "0 auto", textAlign: "center" }}
                >
                    Every account is manually verified — rank, skins, and purchase history
                    confirmed before listing.
                </p>
            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(340, 1fr))",
                    gap: 24,
                }}
                className="listings-grid"
            >
                {featured.map((listing, i) => (
                    <div
                        key={listing.id}
                        className={`glass-card reveal reveal-delay-${i + 1}`}
                        style={{ padding: 0, overflow: "hidden" }}
                    >
                        {/* Card Header Band */}
                        <div
                            style={{
                                height: 4,
                                background: `linear-gradient(90deg, ${listing.rankColor || "var(--accent)"}, transparent)`,
                            }}
                        />

                        <div style={{ padding: "24px 28px" }}>
                            {/* Tag + Price */}
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "flex-start",
                                    marginBottom: 16,
                                }}
                            >
                                <div>
                                    {listing.tag && (
                                        <span
                                            style={{
                                                display: "inline-block",
                                                padding: "4px 10px",
                                                borderRadius: 6,
                                                background: "var(--accent-subtle)",
                                                color: "var(--accent)",
                                                fontSize: "0.7rem",
                                                fontWeight: 700,
                                                letterSpacing: "0.06em",
                                                marginBottom: 10,
                                            }}
                                        >
                                            {listing.tag}
                                        </span>
                                    )}
                                    <h3
                                        style={{
                                            fontSize: "1.1rem",
                                            fontWeight: 700,
                                            letterSpacing: "-0.01em",
                                            lineHeight: 1.3,
                                        }}
                                    >
                                        {listing.title}
                                    </h3>
                                </div>
                                <div
                                    style={{
                                        textAlign: "right",
                                        flexShrink: 0,
                                        marginLeft: 16,
                                    }}
                                >
                                    <div
                                        style={{
                                            fontSize: "1.4rem",
                                            fontWeight: 800,
                                            color: "var(--accent)",
                                            fontFamily: "var(--font-mono, monospace)",
                                        }}
                                    >
                                        ${listing.price}
                                    </div>
                                    <div
                                        style={{
                                            fontSize: "0.7rem",
                                            color: "var(--text-tertiary)",
                                            marginTop: 2,
                                        }}
                                    >
                                        USD
                                    </div>
                                </div>
                            </div>

                            {/* Stats Grid */}
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "1fr 1fr",
                                    gap: "12px 20px",
                                    padding: "16px 0",
                                    borderTop: "1px solid var(--border-glass)",
                                    borderBottom: "1px solid var(--border-glass)",
                                    marginBottom: 20,
                                }}
                            >
                                <div>
                                    <div
                                        style={{
                                            fontSize: "0.7rem",
                                            color: "var(--text-tertiary)",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.06em",
                                            marginBottom: 4,
                                        }}
                                    >
                                        Rank
                                    </div>
                                    <div
                                        style={{
                                            fontSize: "0.9rem",
                                            fontWeight: 600,
                                            color: listing.rankColor || "var(--text-primary)",
                                        }}
                                    >
                                        {listing.rank}
                                    </div>
                                </div>
                                <div>
                                    <div
                                        style={{
                                            fontSize: "0.7rem",
                                            color: "var(--text-tertiary)",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.06em",
                                            marginBottom: 4,
                                        }}
                                    >
                                        Level
                                    </div>
                                    <div style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                                        {listing.level}
                                    </div>
                                </div>
                                <div>
                                    <div
                                        style={{
                                            fontSize: "0.7rem",
                                            color: "var(--text-tertiary)",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.06em",
                                            marginBottom: 4,
                                        }}
                                    >
                                        Skins
                                    </div>
                                    <div style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                                        {listing.skins}
                                    </div>
                                </div>
                                <div>
                                    <div
                                        style={{
                                            fontSize: "0.7rem",
                                            color: "var(--text-tertiary)",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.06em",
                                            marginBottom: 4,
                                        }}
                                    >
                                        Blueprints
                                    </div>
                                    <div style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                                        {listing.blueprints}
                                    </div>
                                </div>
                            </div>

                            {/* CTA */}
                            <button
                                className="btn-primary"
                                style={{
                                    width: "100%",
                                    padding: "12px 20px",
                                    fontSize: "0.85rem",
                                }}
                            >
                                View Details →
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ textAlign: "center", marginTop: 48 }}>
                <Link href="/marketplace" className="btn-outline">
                    View All Accounts →
                </Link>
            </div>

            <style>{`
        .listings-grid {
          grid-template-columns: repeat(3, 1fr) !important;
        }
        @media (max-width: 1024px) {
          .listings-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .listings-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
        </section>
    );
}
