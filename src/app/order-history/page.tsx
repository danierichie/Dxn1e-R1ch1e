"use client";

import { useEffect, useState } from "react";
import { formatDualPrice } from "../../lib/utils";
import { getOrders, getListings, saveOrders } from "../../lib/data";

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
    videoUrl?: string;
    uid?: string;
    mythicWeapons?: number;
    legendaryWeapons?: number;
    mythicSkins?: number;
    legendarySkins?: number;
    rareSkins?: string;
    legendaryVehicles?: number;
    accountLinks?: string;
}

interface Order {
    id: number;
    listingId: number;
    status: 'pending' | 'completed';
    timestamp: string;
    screenshot: string;
}

export default function OrderHistoryPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [listings, setListings] = useState<Listing[]>([]);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            const [ordersData, listingsData] = await Promise.all([getOrders(), getListings()]);
            if (cancelled) return;
            if (Array.isArray(ordersData)) setOrders(ordersData as Order[]);
            else {
                const saved = localStorage.getItem("orders");
                if (saved) setOrders(JSON.parse(saved));
            }
            if (Array.isArray(listingsData)) setListings(listingsData as Listing[]);
            else {
                const saved = localStorage.getItem("market_listings");
                if (saved) setListings(JSON.parse(saved));
            }
        })();
        return () => { cancelled = true; };
    }, []);

    const completeOrder = (orderId: number) => {
        const updatedOrders = orders.map(order =>
            order.id === orderId ? { ...order, status: 'completed' as const } : order
        );
        setOrders(updatedOrders);
        localStorage.setItem("orders", JSON.stringify(updatedOrders));
        saveOrders(updatedOrders);
    };

    const getListingById = (id: number) => listings.find(listing => listing.id === id);

    return (
        <main style={{ padding: "120px 24px 80px", maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ marginBottom: 60, textAlign: "center" }}>
                <h1 className="section-title">
                    Order <span style={{ color: "var(--accent)" }}>History</span>
                </h1>
                <p className="section-subtitle" style={{ margin: "0 auto" }}>
                    Manage and track your account purchase orders.
                </p>
            </div>

            {orders.length === 0 ? (
                <div style={{ textAlign: "center", padding: "100px 0" }}>
                    <div style={{ fontSize: "3rem", marginBottom: 20 }}>📦</div>
                    <h3 style={{ fontSize: "1.2rem", marginBottom: 8 }}>No orders yet</h3>
                    <p style={{ color: "var(--text-tertiary)" }}>Your completed purchases will appear here.</p>
                </div>
            ) : (
                <div style={{ display: "grid", gap: 24 }}>
                    {orders.map((order) => {
                        const listing = getListingById(order.listingId);
                        return (
                            <div
                                key={order.id}
                                className="glass-card"
                                style={{ padding: 24, border: "1px solid var(--accent-subtle)" }}
                            >
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                                    <div>
                                        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 8 }}>
                                            {listing?.title || "Account"}
                                        </h3>
                                        <div style={{ fontSize: "0.8rem", color: "var(--text-tertiary)", marginBottom: 8 }}>
                                            Order ID: {order.id}
                                        </div>
                                        <div style={{ fontSize: "0.8rem", color: "var(--text-tertiary)" }}>
                                            {new Date(order.timestamp).toLocaleString()}
                                        </div>
                                    </div>
                                    <div style={{ textAlign: "right" }}>
                                        <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--accent)", marginBottom: 8 }}>
                                            {listing ? formatDualPrice(listing.price) : "N/A"}
                                        </div>
                                        <span
                                            style={{
                                                padding: "4px 8px",
                                                borderRadius: 12,
                                                fontSize: "0.7rem",
                                                fontWeight: 700,
                                                background: order.status === 'completed' ? "rgba(0, 255, 0, 0.1)" : "rgba(255, 165, 0, 0.1)",
                                                color: order.status === 'completed' ? "#00ff00" : "#ffa500",
                                            }}
                                        >
                                            {order.status.toUpperCase()}
                                        </span>
                                    </div>
                                </div>

                                <div style={{ borderTop: "1px solid var(--border-glass)", paddingTop: 16 }}>
                                    <div style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: 12 }}>
                                        Payment Screenshot:
                                    </div>
                                    {/* eslint-disable-next-line @next/next/no-img-element -- data URL from order */}
                                    <img
                                        src={order.screenshot}
                                        alt="Payment Screenshot"
                                        style={{ width: "100%", maxHeight: 200, objectFit: "contain", borderRadius: 8, border: "1px solid var(--border-glass)" }}
                                    />
                                </div>

                                {order.status === 'pending' && (
                                    <div style={{ marginTop: 16 }}>
                                        <button
                                            className="btn-primary"
                                            style={{ width: "100%", padding: "12px", fontSize: "1rem" }}
                                            onClick={() => completeOrder(order.id)}
                                        >
                                            Mark as Completed
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </main>
    );
}
