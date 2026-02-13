"use client";

import { useState, useEffect, useRef } from "react";
import { formatDualPrice } from "../../lib/utils";
import { getListings, getOrders, getSubmissions, addListing, saveListings, saveOrders } from "../../lib/data";

interface Listing {
    id: number;
    title: string;
    rank: string;
    price: number;
    level: number;
    skins: number;
    blueprints: number;
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

interface Submission {
    id: number;
    email: string;
    whatsapp?: string;
    uid?: string;
    ign?: string;
    accountLink?: string;
    description: string;
    timestamp: string;
}

interface Order {
    id: number;
    listingId: number;
    status: 'pending' | 'completed';
    timestamp: string;
    screenshot: string;
}

export default function AdminPage() {
    const [listings, setListings] = useState<Listing[]>([]);
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [activeTab, setActiveTab] = useState<"listings" | "submissions" | "orders">("listings");

    // Form states
    const [newListing, setNewListing] = useState({
        title: "",
        price: "",
        uid: "",
        mythicWeapons: "",
        legendaryWeapons: "",
        mythicSkins: "",
        legendarySkins: "",
        rareSkins: "",
        legendaryVehicles: "",
        accountLinks: ""
    });
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [videoUrlInput, setVideoUrlInput] = useState("");
    const [isVideoValidating, setIsVideoValidating] = useState(false);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            const [listingsData, ordersData, submissionsData] = await Promise.all([
                getListings(),
                getOrders(),
                getSubmissions()
            ]);
            if (cancelled) return;
            if (Array.isArray(listingsData) && listingsData.length >= 0) setListings(listingsData as Listing[]);
            else {
                const saved = localStorage.getItem("market_listings");
                if (saved) setListings(JSON.parse(saved));
            }
            if (Array.isArray(ordersData) && ordersData.length >= 0) setOrders(ordersData as Order[]);
            else {
                const saved = localStorage.getItem("orders");
                if (saved) setOrders(JSON.parse(saved));
            }
            if (Array.isArray(submissionsData) && submissionsData.length >= 0) setSubmissions(submissionsData as Submission[]);
            else {
                const saved = localStorage.getItem("sell_submissions");
                if (saved) setSubmissions(JSON.parse(saved));
            }
        })();
        return () => { cancelled = true; };
    }, []);

    const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsVideoValidating(true);
        const video = document.createElement("video");
        video.preload = "metadata";

        video.onloadedmetadata = () => {
            window.URL.revokeObjectURL(video.src);
            const duration = video.duration;

            if (duration < 30) {
                alert("Video is too short! Minimum length is 30 seconds.");
                e.target.value = "";
                setVideoFile(null);
            } else if (duration > 120) {
                alert("Video is too long! Maximum length is 2 minutes.");
                e.target.value = "";
                setVideoFile(null);
            } else {
                setVideoFile(file);
            }
            setIsVideoValidating(false);
        };

        video.src = URL.createObjectURL(file);
    };

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUploadListing = async (e: React.FormEvent) => {
        e.preventDefault();

        const useUrl = videoUrlInput.trim().length > 0;
        if (!useUrl && !videoFile) {
            alert("Please add a Video URL (instant) or select a video file (30s–2min).");
            return;
        }

        const newId = Date.now();
        const colors = ["#FFD700", "#C77DFF", "#FF6B6B", "#00D2FF", "#7DF9FF"];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        // If URL provided: save listing with video immediately (no encoding delay)
        const listing: Listing = {
            id: newId,
            title: newListing.title,
            rank: "Legendary",
            price: parseFloat(newListing.price),
            level: 150,
            skins: 0,
            blueprints: 0,
            uid: newListing.uid,
            mythicWeapons: parseInt(newListing.mythicWeapons) || 0,
            legendaryWeapons: parseInt(newListing.legendaryWeapons) || 0,
            mythicSkins: parseInt(newListing.mythicSkins) || 0,
            legendarySkins: parseInt(newListing.legendarySkins) || 0,
            rareSkins: newListing.rareSkins,
            legendaryVehicles: parseInt(newListing.legendaryVehicles) || 0,
            accountLinks: newListing.accountLinks,
            rankColor: randomColor,
            videoUrl: useUrl ? videoUrlInput.trim() : ""
        };

        if (useUrl) {
            const updated = [...listings, listing];
            setListings(updated);
            localStorage.setItem("market_listings", JSON.stringify(updated));
            addListing(listing);
            setNewListing({
                title: "", price: "", uid: "", mythicWeapons: "", legendaryWeapons: "",
                mythicSkins: "", legendarySkins: "", rareSkins: "", legendaryVehicles: "", accountLinks: ""
            });
            setVideoUrlInput("");
            alert("Listing saved and is live on the marketplace with your video link.");
            return;
        }

        // Otherwise: save listing first, then attach video from file in background
        const updated = [...listings, listing];
        setListings(updated);
        localStorage.setItem("market_listings", JSON.stringify(updated));
        addListing(listing);

        setNewListing({
            title: "", price: "", uid: "", mythicWeapons: "", legendaryWeapons: "",
            mythicSkins: "", legendarySkins: "", rareSkins: "", legendaryVehicles: "", accountLinks: ""
        });
        setVideoFile(null);
        setVideoUrlInput("");
        if (fileInputRef.current) fileInputRef.current.value = "";

        alert("Listing saved and is live. Video is encoding in the background (may take a minute).");

        const fileToEncode = videoFile;
        const reader = new FileReader();
        reader.readAsDataURL(fileToEncode!);
        reader.onload = () => {
            const videoUrl = reader.result as string;
            const saved = localStorage.getItem("market_listings");
            const data = saved ? JSON.parse(saved) : [];
            const withVideo = data.map((l: Listing) =>
                l.id === newId ? { ...l, videoUrl } : l
            );
            localStorage.setItem("market_listings", JSON.stringify(withVideo));
            setListings(withVideo);
            saveListings(withVideo);
        };
    };

    const completeOrder = (orderId: number) => {
        const updatedOrders = orders.map(order =>
            order.id === orderId ? { ...order, status: 'completed' as const } : order
        );
        setOrders(updatedOrders);
        localStorage.setItem("orders", JSON.stringify(updatedOrders));
        saveOrders(updatedOrders);
    };

    const [isAuthenticated, setIsAuthenticated] = useState(() =>
        typeof window !== "undefined" && sessionStorage.getItem("admin_auth") === "true"
    );
    const [passwordInput, setPasswordInput] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordInput === "admin123") {
            setIsAuthenticated(true);
            sessionStorage.setItem("admin_auth", "true");
        } else {
            alert("Incorrect password");
        }
    };

    if (!isAuthenticated) {
        return (
            <main style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
                <div className="glass-card" style={{ padding: 40, width: "100%", maxWidth: 400, textAlign: "center" }}>
                    <div style={{ fontSize: "3rem", marginBottom: 20 }}>🔒</div>
                    <h1 style={{ fontSize: "1.5rem", marginBottom: 8, fontWeight: 700 }}>Admin Access</h1>
                    <p style={{ color: "var(--text-tertiary)", marginBottom: 24, fontSize: "0.9rem" }}>
                        Enter password to view dashboard
                    </p>
                    <form onSubmit={handleLogin}>
                        <input
                            type="password"
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                            placeholder="Password"
                            style={{
                                width: "100%",
                                padding: "12px",
                                borderRadius: 8,
                                background: "rgba(255,255,255,0.05)",
                                border: "1px solid var(--border-glass)",
                                color: "white",
                                marginBottom: 16,
                                textAlign: "center"
                            }}
                            autoFocus
                        />
                        <button
                            className="btn-primary"
                            style={{ width: "100%", padding: "12px" }}
                        >
                            Unlock Dashboard
                        </button>
                    </form>
                </div>
            </main>
        );
    }

    return (
        <main className="admin-main" style={{ padding: "120px 24px 60px", maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ marginBottom: 48, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                    <h1 className="section-title" style={{ textAlign: "left", marginBottom: 12 }}>
                        Admin <span style={{ color: "var(--accent)" }}>Dashboard</span>
                    </h1>
                    <p className="section-subtitle" style={{ margin: 0 }}>
                        Manage account listings and view seller submissions.
                    </p>
                </div>
                <button
                    onClick={() => {
                        setIsAuthenticated(false);
                        sessionStorage.removeItem("admin_auth");
                    }}
                    style={{
                        padding: "8px 16px",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid var(--border-glass)",
                        borderRadius: 8,
                        color: "var(--text-secondary)",
                        cursor: "pointer",
                        fontSize: "0.85rem"
                    }}
                >
                    Log Out
                </button>
            </div>

            {/* Tabs */}
            <div style={{
                display: "flex",
                gap: 32,
                borderBottom: "1px solid var(--border-glass)",
                marginBottom: 40
            }}>
                <button
                    onClick={() => setActiveTab("listings")}
                    style={{
                        padding: "12px 0",
                        background: "none",
                        border: "none",
                        color: activeTab === "listings" ? "var(--accent)" : "var(--text-secondary)",
                        borderBottom: activeTab === "listings" ? "2px solid var(--accent)" : "none",
                        cursor: "pointer",
                        fontWeight: 600,
                        fontSize: "1rem"
                    }}
                >
                    Available Accounts
                </button>
                <button
                    onClick={() => setActiveTab("orders")}
                    style={{
                        padding: "12px 0",
                        background: "none",
                        border: "none",
                        color: activeTab === "orders" ? "var(--accent)" : "var(--text-secondary)",
                        borderBottom: activeTab === "orders" ? "2px solid var(--accent)" : "none",
                        cursor: "pointer",
                        fontWeight: 600,
                        fontSize: "1rem"
                    }}
                >
                    Orders
                </button>
                <button
                    onClick={() => setActiveTab("submissions")}
                    style={{
                        padding: "12px 0",
                        background: "none",
                        border: "none",
                        color: activeTab === "submissions" ? "var(--accent)" : "var(--text-secondary)",
                        borderBottom: activeTab === "submissions" ? "2px solid var(--accent)" : "none",
                        cursor: "pointer",
                        fontWeight: 600,
                        fontSize: "1rem"
                    }}
                >
                    Sell Submissions
                </button>
            </div>

            {activeTab === "listings" ? (
                <div className="admin-grid">
                    {/* Add Form */}
                    <div className="glass-card" style={{ padding: 32, height: "fit-content" }}>
                        <h3 style={{ marginBottom: 24, fontSize: "1.2rem", fontWeight: 700 }}>Upload New Account</h3>
                        <form onSubmit={handleUploadListing} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            <div>
                                <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-tertiary)", marginBottom: 8 }}>Account Title</label>
                                <input
                                    type="text"
                                    required
                                    value={newListing.title}
                                    onChange={(e) => setNewListing({ ...newListing, title: e.target.value })}
                                    style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-glass)", borderRadius: 8, padding: "12px", color: "white" }}
                                    placeholder="e.g. Legendary Ghost Account"
                                />
                            </div>
                            <div className="form-row">
                                <div style={{ width: "100%" }}>
                                    <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-tertiary)", marginBottom: 8 }}>Price ($)</label>
                                    <input
                                        type="number"
                                        required
                                        value={newListing.price}
                                        onChange={(e) => setNewListing({ ...newListing, price: e.target.value })}
                                        style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-glass)", borderRadius: 8, padding: "12px", color: "white" }}
                                        placeholder="299"
                                    />
                                </div>
                            </div>

                            <div className="stats-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                                <div>
                                    <label style={{ display: "block", fontSize: "0.7rem", color: "var(--text-tertiary)", marginBottom: 8 }}>Mythic Weapons</label>
                                    <input type="number" value={newListing.mythicWeapons} onChange={(e) => setNewListing({ ...newListing, mythicWeapons: e.target.value })} style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-glass)", borderRadius: 8, padding: "12px", color: "white" }} />
                                </div>
                                <div>
                                    <label style={{ display: "block", fontSize: "0.7rem", color: "var(--text-tertiary)", marginBottom: 8 }}>Legendary Weapons</label>
                                    <input type="number" value={newListing.legendaryWeapons} onChange={(e) => setNewListing({ ...newListing, legendaryWeapons: e.target.value })} style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-glass)", borderRadius: 8, padding: "12px", color: "white" }} />
                                </div>
                            </div>

                            <div className="stats-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                                <div>
                                    <label style={{ display: "block", fontSize: "0.7rem", color: "var(--text-tertiary)", marginBottom: 8 }}>Mythic Skins</label>
                                    <input type="number" value={newListing.mythicSkins} onChange={(e) => setNewListing({ ...newListing, mythicSkins: e.target.value })} style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-glass)", borderRadius: 8, padding: "12px", color: "white" }} />
                                </div>
                                <div>
                                    <label style={{ display: "block", fontSize: "0.7rem", color: "var(--text-tertiary)", marginBottom: 8 }}>Legendary Skins</label>
                                    <input type="number" value={newListing.legendarySkins} onChange={(e) => setNewListing({ ...newListing, legendarySkins: e.target.value })} style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-glass)", borderRadius: 8, padding: "12px", color: "white" }} />
                                </div>
                            </div>

                            <div className="stats-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                                <div>
                                    <label style={{ display: "block", fontSize: "0.7rem", color: "var(--text-tertiary)", marginBottom: 8 }}>Legendary Vehicles</label>
                                    <input type="number" value={newListing.legendaryVehicles} onChange={(e) => setNewListing({ ...newListing, legendaryVehicles: e.target.value })} style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-glass)", borderRadius: 8, padding: "12px", color: "white" }} />
                                </div>
                                <div>
                                    <label style={{ display: "block", fontSize: "0.7rem", color: "var(--text-tertiary)", marginBottom: 8 }}>Account UID</label>
                                    <input type="text" value={newListing.uid} onChange={(e) => setNewListing({ ...newListing, uid: e.target.value })} style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-glass)", borderRadius: 8, padding: "12px", color: "white" }} />
                                </div>
                            </div>

                            <div>
                                <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-tertiary)", marginBottom: 8 }}>OG / Rare Skins List</label>
                                <textarea
                                    value={newListing.rareSkins}
                                    onChange={(e) => setNewListing({ ...newListing, rareSkins: e.target.value })}
                                    style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-glass)", borderRadius: 8, padding: "12px", color: "white", minHeight: 80 }}
                                    placeholder="e.g. Ghost Plasma, Outrider Skeleton..."
                                ></textarea>
                            </div>

                            <div>
                                <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-tertiary)", marginBottom: 8 }}>Account Links</label>
                                <input
                                    type="text"
                                    value={newListing.accountLinks}
                                    onChange={(e) => setNewListing({ ...newListing, accountLinks: e.target.value })}
                                    style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-glass)", borderRadius: 8, padding: "12px", color: "white" }}
                                    placeholder="e.g. Activision, Facebook, Apple"
                                />
                            </div>
                            <div>
                                <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-tertiary)", marginBottom: 8 }}>
                                    Video URL <span style={{ color: "var(--accent)", fontWeight: 600 }}>— recommended (instant)</span>
                                </label>
                                <input
                                    type="url"
                                    value={videoUrlInput}
                                    onChange={(e) => setVideoUrlInput(e.target.value)}
                                    placeholder="https://... (Google Drive, Dropbox, Streamable, etc.)"
                                    style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-glass)", borderRadius: 8, padding: "12px", color: "white", marginBottom: 8 }}
                                />
                                <p style={{ fontSize: "0.7rem", color: "var(--text-tertiary)", marginBottom: 12 }}>
                                    Paste a direct video link — listing goes live immediately. No upload wait.
                                </p>
                            </div>
                            <div>
                                <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-tertiary)", marginBottom: 8 }}>Or upload video file (30s–2min, slower)</label>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="video/*"
                                    onChange={handleVideoChange}
                                    style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-glass)", borderRadius: 8, padding: "12px", color: "white" }}
                                />
                                {isVideoValidating && <p style={{ fontSize: "0.75rem", color: "var(--accent)", marginTop: 4 }}>Validating video duration...</p>}
                            </div>
                            <button
                                className="btn-primary"
                                style={{ marginTop: 12, padding: "14px", opacity: isVideoValidating ? 0.5 : 1 }}
                                disabled={isVideoValidating}
                            >
                                {isVideoValidating ? "Processing..." : "Upload Account"}
                            </button>
                        </form>
                    </div>

                    {/* Listings Table */}
                    <div className="glass-card" style={{ padding: 0, overflow: "hidden" }}>
                        <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border-glass)" }}>
                            <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Published Listings</h3>
                            <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", marginTop: 6, marginBottom: 0 }}>Saved in this browser — listings persist when you reload the page.</p>
                        </div>
                        <div style={{ padding: 12 }}>
                            {listings.length === 0 ? (
                                <p style={{ color: "var(--text-tertiary)", textAlign: "center", padding: 40 }}>No accounts uploaded yet.</p>
                            ) : (
                                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                    <thead style={{ borderBottom: "1px solid var(--border-glass)" }}>
                                        <tr>
                                            <th style={{ textAlign: "left", padding: "12px 16px", fontSize: "0.8rem", color: "var(--text-tertiary)" }}>Title</th>
                                            <th style={{ textAlign: "left", padding: "12px 16px", fontSize: "0.8rem", color: "var(--text-tertiary)" }}>Price</th>
                                            <th style={{ textAlign: "left", padding: "12px 16px", fontSize: "0.8rem", color: "var(--text-tertiary)" }}>Video</th>
                                            <th style={{ textAlign: "right", padding: "12px 16px", fontSize: "0.8rem", color: "var(--text-tertiary)" }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listings.map(l => (
                                            <tr key={l.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                                                <td style={{ padding: "16px", fontSize: "0.9rem" }}>{l.title}</td>
                                                <td style={{ padding: "16px", fontSize: "0.9rem", color: "var(--accent)" }}>
                                                    {formatDualPrice(l.price)}
                                                </td>
                                                <td style={{ padding: "16px", fontSize: "0.9rem" }}>
                                                    {l.videoUrl ? <span style={{ color: "var(--accent)" }}>✅ Attached</span> : <span style={{ color: "#FF6B6B" }}>❌ Missing</span>}
                                                </td>
                                                <td style={{ padding: "16px", textAlign: "right" }}>
                                                    <button
                                                        onClick={() => {
                                                            const updated = listings.filter(item => item.id !== l.id);
                                                            setListings(updated);
                                                            localStorage.setItem("market_listings", JSON.stringify(updated));
                                                            saveListings(updated);
                                                        }}
                                                        style={{ background: "none", border: "none", color: "#FF6B6B", cursor: "pointer", fontSize: "0.8rem" }}>Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            ) : activeTab === "orders" ? (
                <div className="glass-card" style={{ padding: "24px" }}>
                    <div style={{ marginBottom: 32 }}>
                        <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: 8 }}>Order Management</h3>
                        <p style={{ color: "var(--text-tertiary)", fontSize: "0.9rem" }}>View and manage customer orders.</p>
                    </div>

                    {orders.length === 0 ? (
                        <div style={{ textAlign: "center", padding: "60px 0" }}>
                            <div style={{ fontSize: "3rem", marginBottom: 20 }}>📦</div>
                            <p style={{ color: "var(--text-tertiary)" }}>No orders yet.</p>
                        </div>
                    ) : (
                        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                            {orders.map((order) => {
                                const listing = listings.find(l => l.id === order.listingId);
                                return (
                                    <div key={order.id} style={{
                                        padding: 24,
                                        background: "rgba(255,255,255,0.02)",
                                        border: "1px solid var(--border-glass)",
                                        borderRadius: 12
                                    }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                                            <div>
                                                <div style={{ fontWeight: 700, color: "var(--accent)", fontSize: "1.1rem" }}>{listing?.title || "Account"}</div>
                                                <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: 4 }}>Order ID: {order.id}</div>
                                                <div style={{ fontSize: "0.8rem", color: "var(--text-tertiary)" }}>{new Date(order.timestamp).toLocaleString()}</div>
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
                                            {/* eslint-disable-next-line @next/next/no-img-element -- data URL from user upload */}
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
                </div>
            ) : (
                /* Submissions List */
                <div className="glass-card" style={{ padding: "24px" }}>
                    <div style={{ marginBottom: 32 }}>
                        <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: 8 }}>Incoming Sell Requests</h3>
                        <p style={{ color: "var(--text-tertiary)", fontSize: "0.9rem" }}>Requests from users looking to sell their accounts.</p>
                    </div>

                    {submissions.length === 0 ? (
                        <div style={{ textAlign: "center", padding: "60px 0" }}>
                            <div style={{ fontSize: "3rem", marginBottom: 20 }}>📬</div>
                            <p style={{ color: "var(--text-tertiary)" }}>No submissions yet. Try the &quot;Sell to Us&quot; page!</p>
                        </div>
                    ) : (
                        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                            {submissions.map(sub => (
                                <div key={sub.id} style={{
                                    padding: 24,
                                    background: "rgba(255,255,255,0.02)",
                                    border: "1px solid var(--border-glass)",
                                    borderRadius: 12
                                }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                                        <div>
                                            <div style={{ fontWeight: 700, color: "var(--accent)", fontSize: "1.1rem" }}>{sub.email}</div>
                                            <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: 4 }}>WhatsApp: {sub.whatsapp || "N/A"}</div>
                                        </div>
                                        <div style={{ textAlign: "right" }}>
                                            <div style={{ fontSize: "0.8rem", color: "var(--text-tertiary)" }}>{sub.timestamp}</div>
                                            <div style={{ fontSize: "0.75rem", background: "rgba(255,255,0,0.1)", color: "var(--accent)", padding: "2px 8px", borderRadius: 4, marginTop: 4, display: "inline-block" }}>
                                                {sub.accountLink || "Link N/A"}
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, background: "rgba(255,255,255,0.03)", padding: 16, borderRadius: 8, marginBottom: 16 }}>
                                        <div>
                                            <span style={{ display: "block", fontSize: "0.7rem", color: "var(--text-tertiary)", textTransform: "uppercase" }}>UID</span>
                                            <span style={{ fontSize: "0.9rem", color: "white" }}>{sub.uid || "N/A"}</span>
                                        </div>
                                        <div>
                                            <span style={{ display: "block", fontSize: "0.7rem", color: "var(--text-tertiary)", textTransform: "uppercase" }}>IGN</span>
                                            <span style={{ fontSize: "0.9rem", color: "white" }}>{sub.ign || "N/A"}</span>
                                        </div>
                                    </div>
                                    <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "var(--text-secondary)" }}>{sub.description}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
            <style>{`
                .admin-grid {
                    display: grid;
                    grid-template-columns: 1fr 2fr;
                    gap: 32px;
                }
                .form-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 16px;
                }
                .stats-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr;
                    gap: 12px;
                }
                @media (max-width: 900px) {
                    .admin-grid {
                        grid-template-columns: 1fr;
                    }
                }
                @media (max-width: 640px) {
                    .form-row {
                        grid-template-columns: 1fr;
                    }
                    .stats-row {
                        grid-template-columns: 1fr 1fr;
                    }
                    .admin-main {
                        padding: 80px 16px 40px !important;
                    }
                }
            `}</style>
        </main>
    );
}
