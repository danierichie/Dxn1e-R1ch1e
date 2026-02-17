"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { initialListings } from "../data/seedData";
import CommunitySection from "../components/CommunitySection";
import ReviewSystem from "../components/ReviewSystem";
import ReviewForm from "../components/ReviewForm";
import AuthPrompt from "../components/AuthPrompt";
import { formatDualPrice, WHATSAPP_PRIVATE_URL } from "../../lib/utils";
import { getListings, getOrders, saveOrders } from "../../lib/data";
import { useAuth } from "../contexts/AuthContext";
import { SkeletonCard } from "../components/LoadingComponents";
import { usePerformanceMonitor } from "../components/PerformanceUtils";

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

const sortByPrice = (data: Listing[]) => [...data].sort((a, b) => a.price - b.price);

export default function MarketplacePage() {
    const { user } = useAuth();
    const router = useRouter();
    const [listings, setListings] = useState<Listing[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
    const [paymentStep, setPaymentStep] = useState<'details' | 'bank' | 'upload' | 'verify'>('details');
    const [uploadedScreenshot, setUploadedScreenshot] = useState<string | undefined>(undefined);
    const [orders, setOrders] = useState<Order[]>([]);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [purchasedListing, setPurchasedListing] = useState<Listing | null>(null);
    const [showAuthPrompt, setShowAuthPrompt] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Performance monitoring
    usePerformanceMonitor('MarketplacePage');

    const filteredListings = searchQuery.trim()
        ? listings.filter((l) =>
            l.title.toLowerCase().includes(searchQuery.toLowerCase().trim())
          )
        : listings;

    const loadListingsFromStorage = () => {
        const saved = localStorage.getItem("market_listings");
        if (saved) {
            const data = JSON.parse(saved);
            setListings(sortByPrice(data));
        } else {
            setListings(sortByPrice(initialListings));
            localStorage.setItem("market_listings", JSON.stringify(initialListings));
        }
    };

    useEffect(() => {
        let cancelled = false;
        setIsLoading(true);
        (async () => {
            const data = await getListings();
            if (cancelled) return;
            if (Array.isArray(data) && data.length > 0) {
                setListings(sortByPrice(data as Listing[]));
            } else {
                loadListingsFromStorage();
            }
            const orderData = await getOrders();
            if (cancelled) return;
            if (Array.isArray(orderData) && orderData.length >= 0) {
                setOrders(orderData as Order[]);
            } else {
                const savedOrders = localStorage.getItem("orders");
                if (savedOrders) setOrders(JSON.parse(savedOrders));
            }
            setIsLoading(false);
        })();
        return () => { cancelled = true; };
    }, []);

    // Re-sync when another tab (e.g. admin) updates listings, or when user returns to this tab
    useEffect(() => {
        const onStorage = (e: StorageEvent) => {
            if (e.key === "market_listings" && e.newValue) {
                const data = JSON.parse(e.newValue);
                setListings(sortByPrice(data));
            }
        };
        const onVisible = () => {
            if (document.visibilityState !== "visible") return;
            const saved = localStorage.getItem("market_listings");
            if (saved) {
                const data = JSON.parse(saved);
                setListings(sortByPrice(data));
            }
        };
        window.addEventListener("storage", onStorage);
        document.addEventListener("visibilitychange", onVisible);
        return () => {
            window.removeEventListener("storage", onStorage);
            document.removeEventListener("visibilitychange", onVisible);
        };
    }, []);

    return (
        <main style={{ padding: "120px 24px 80px", maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ marginBottom: 40, textAlign: "center" }}>
                <h1 className="section-title">
                    The <span style={{ color: "var(--accent)" }}>Marketplace</span>
                </h1>
                <p className="section-subtitle" style={{ margin: "0 auto" }}>
                    Browse our full inventory of verified high-tier accounts.
                </p>
            </div>

            {/* User Welcome Banner */}
            {user && (
                <div className="glass-card" style={{ 
                    padding: "20px", 
                    marginBottom: 32, 
                    background: "linear-gradient(135deg, rgba(21, 101, 192, 0.1), rgba(21, 101, 192, 0.05))",
                    border: "1px solid var(--accent-subtle)"
                }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        <div style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            background: "var(--accent)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            fontSize: "1rem",
                            fontWeight: "bold"
                        }}>
                            {user.fullName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <div style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-primary)" }}>
                                Welcome back, {user.fullName}!
                            </div>
                            <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                                Ready to find your next elite account?
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Search */}
            <div className="glass-card" style={{ padding: 20, marginBottom: 32 }}>
                <label htmlFor="marketplace-search" style={{ display: "block", fontSize: "0.8rem", color: "var(--text-tertiary)", marginBottom: 8 }}>Search by title</label>
                <input
                    id="marketplace-search"
                    type="search"
                    placeholder="e.g. Legendary, Mythic, Ghost..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "12px 16px",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid var(--border-glass)",
                        borderRadius: 8,
                        color: "var(--text-primary)",
                        fontSize: "1rem"
                    }}
                />
            </div>

            {/* Results - sorted lowest to highest price */}
            {isLoading ? (
                <div className="listings-grid" style={{ display: "grid", gap: 24 }}>
                    {Array.from({ length: 6 }, (_, i) => (
                        <SkeletonCard key={i} />
                    ))}
                </div>
            ) : filteredListings.length === 0 ? (
                <div style={{ textAlign: "center", padding: "100px 0" }}>
                    <div style={{ fontSize: "3rem", marginBottom: 20 }}>🔍</div>
                    <h3 style={{ fontSize: "1.2rem", marginBottom: 8 }}>{searchQuery.trim() ? "No accounts match your search" : "No accounts found"}</h3>
                    <p style={{ color: "var(--text-tertiary)" }}>{searchQuery.trim() ? "Try a different search term." : "Check back later for new listings."}</p>
                </div>
            ) : (
                <div className="listings-grid" style={{ display: "grid", gap: 24 }}>
                    {filteredListings.map((listing) => (
                        <div
                            key={listing.id}
                            className="glass-card"
                            style={{ padding: 0, overflow: "hidden" }}
                        >
                            <div style={{ height: 4, background: `linear-gradient(90deg, ${listing.rankColor || "var(--accent)"}, transparent)` }} />
                            <div style={{ padding: "24px 28px" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                                    <div>
                                        {listing.tag && (
                                            <span style={{ display: "inline-block", padding: "4px 8px", borderRadius: 4, background: "var(--accent-subtle)", color: "var(--accent)", fontSize: "0.65rem", fontWeight: 700, marginBottom: 8 }}>
                                                {listing.tag}
                                            </span>
                                        )}
                                        <h3 style={{ fontSize: "1.05rem", fontWeight: 700 }}>{listing.title}</h3>
                                    </div>
                                    <div style={{ textAlign: "right" }}>
                                        <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--accent)" }}>
                                            {formatDualPrice(listing.price)}
                                        </div>
                                        <div style={{ fontSize: "0.65rem", color: "var(--text-tertiary)" }}>NGN / USD</div>
                                    </div>
                                </div>

                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 20px", padding: "12px 0", borderTop: "1px solid var(--border-glass)", borderBottom: "1px solid var(--border-glass)", marginBottom: 20 }}>
                                    <div>
                                        <span style={{ display: "block", fontSize: "0.6rem", color: "var(--text-tertiary)", textTransform: "uppercase", marginBottom: 2 }}>Mythic Weps</span>
                                        <span style={{ fontSize: "0.85rem", fontWeight: 700 }}>{listing.mythicWeapons || 0}</span>
                                    </div>
                                    <div>
                                        <span style={{ display: "block", fontSize: "0.6rem", color: "var(--text-tertiary)", textTransform: "uppercase", marginBottom: 2 }}>Legendary Weps</span>
                                        <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--accent)" }}>{listing.legendaryWeapons || 0}</span>
                                    </div>
                                    <div>
                                        <span style={{ display: "block", fontSize: "0.6rem", color: "var(--text-tertiary)", textTransform: "uppercase", marginBottom: 2 }}>Mythic Skins</span>
                                        <span style={{ fontSize: "0.85rem", fontWeight: 700 }}>{listing.mythicSkins || 0}</span>
                                    </div>
                                    <div>
                                        <span style={{ display: "block", fontSize: "0.6rem", color: "var(--text-tertiary)", textTransform: "uppercase", marginBottom: 2 }}>Legendary Skins</span>
                                        <span style={{ fontSize: "0.85rem", fontWeight: 700 }}>{listing.legendarySkins || 0}</span>
                                    </div>
                                </div>

                                {user ? (
                                    <button
                                        className="btn-primary"
                                        style={{ width: "100%", padding: "12px" }}
                                        onClick={() => setSelectedListing(listing)}
                                    >
                                        View Details →
                                    </button>
                                ) : (
                                    <button
                                        className="btn-primary"
                                        style={{ 
                                            width: "100%", 
                                            padding: "12px",
                                            background: "var(--accent-dim)",
                                            cursor: "pointer",
                                            position: "relative"
                                        }}
                                        onClick={() => setShowAuthPrompt(true)}
                                        title="Sign in required to purchase"
                                    >
                                        🔒 Sign In Required
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {/* Detail Modal */}
            {selectedListing && (
                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "rgba(0,0,0,0.9)",
                    backdropFilter: "blur(10px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1000,
                    padding: 24
                }}>
                    <div className="glass-card" style={{
                        maxWidth: 900,
                        width: "100%",
                        maxHeight: "90vh",
                        overflowY: "auto",
                        position: "relative",
                        padding: 0,
                        border: "1px solid var(--accent-subtle)"
                    }}>
                        <button
                            onClick={() => {
                                setSelectedListing(null);
                                setPaymentStep('details');
                                setUploadedScreenshot(undefined);
                            }}
                            style={{
                                position: "absolute",
                                top: 20,
                                right: 20,
                                background: "rgba(0,0,0,0.5)",
                                border: "none",
                                color: "white",
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                                cursor: "pointer",
                                zIndex: 10,
                                fontSize: "1.5rem"
                            }}
                        >
                            ×
                        </button>

                        <div style={{ display: "flex", flexDirection: "column" }}>
                            {/* Video Section */}
                            <div style={{
                                background: "#000",
                                position: "relative",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "100%",
                                aspectRatio: "16 / 9"
                            }}>
                                {selectedListing.videoUrl ? (
                                    <video
                                        src={selectedListing.videoUrl}
                                        controls
                                        autoPlay
                                        loop
                                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                    />
                                ) : (
                                    <div style={{ textAlign: "center", padding: 40 }}>
                                        <div style={{ fontSize: "3rem", marginBottom: 16 }}>🎬</div>
                                        <p style={{ color: "var(--text-tertiary)" }}>No video preview available for this legacy listing.</p>
                                    </div>
                                )}
                            </div>

                            {/* Details Section */}
                            {paymentStep === 'details' && (
                            <div style={{ padding: "32px 24px" }}>
                                <div style={{ marginBottom: 32 }}>
                                    <div style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: 2, marginBottom: 8 }}>
                                        Verified Account
                                    </div>
                                    <h2 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: 12 }}>{selectedListing.title}</h2>
                                    <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                                        <span style={{ fontSize: "2rem", fontWeight: 800, color: "var(--accent)" }}>
                                            {formatDualPrice(selectedListing.price)}
                                        </span>
                                        <span style={{ color: "var(--text-tertiary)", fontSize: "0.9rem" }}>one-time payment</span>
                                    </div>
                                </div>

                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px 32px", marginBottom: 40 }}>
                                    {[
                                        { label: "Mythic Weapons", value: selectedListing.mythicWeapons || 0 },
                                        { label: "Legendary Weapons", value: selectedListing.legendaryWeapons || 0, color: "var(--accent)" },
                                        { label: "Mythic Skins", value: selectedListing.mythicSkins || 0 },
                                        { label: "Legendary Skins", value: selectedListing.legendarySkins || 0 },
                                        { label: "Legendary Vehicles", value: selectedListing.legendaryVehicles || 0 }
                                    ].map((stat, i) => (
                                        <div key={i}>
                                            <div style={{ fontSize: "0.7rem", color: "var(--text-tertiary)", textTransform: "uppercase", marginBottom: 4 }}>{stat.label}</div>
                                            <div style={{ fontSize: "1.1rem", fontWeight: 700, color: stat.color || "white" }}>{stat.value}</div>
                                        </div>
                                    ))}
                                </div>

                                <div style={{ borderTop: "1px solid var(--border-glass)", paddingTop: 32, marginBottom: 40, display: "flex", flexDirection: "column", gap: 24 }}>
                                    {selectedListing.rareSkins && (
                                        <div>
                                            <div style={{ fontSize: "0.7rem", color: "var(--text-tertiary)", textTransform: "uppercase", marginBottom: 8 }}>OG / Rare Skins</div>
                                            <div style={{ fontSize: "0.95rem", color: "white", lineHeight: 1.6, background: "rgba(21, 101, 192, 0.08)", padding: 16, borderRadius: 12, border: "1px solid rgba(21, 101, 192, 0.2)" }}>{selectedListing.rareSkins}</div>
                                        </div>
                                    )}
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                                        <div>
                                            <div style={{ fontSize: "0.7rem", color: "var(--text-tertiary)", textTransform: "uppercase", marginBottom: 8 }}>Account UID</div>
                                            <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontFamily: "monospace", wordBreak: "break-all" }}>{selectedListing.uid || "N/A"}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: "0.7rem", color: "var(--text-tertiary)", textTransform: "uppercase", marginBottom: 8 }}>Linked To</div>
                                            <div style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>{selectedListing.accountLinks || "Activision"}</div>
                                        </div>
                                    </div>
                                </div>

                                <button className="btn-primary" style={{ width: "100%", padding: "16px", fontSize: "1rem" }} onClick={() => setPaymentStep('bank')}>
                                    Buy This Account
                                </button>
                                <p style={{ textAlign: "center", color: "var(--text-tertiary)", fontSize: "0.8rem", marginTop: 16 }}>
                                    Secured via Escrow Protection
                                </p>
                            </div>
                            )}

                            {/* Bank Details Section */}
                            {paymentStep === 'bank' && (
                            <div style={{ padding: "32px 24px" }}>
                                <div style={{ marginBottom: 32 }}>
                                    <h2 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: 12 }}>Payment Details</h2>
                                    <p style={{ color: "var(--text-tertiary)", fontSize: "0.9rem" }}>Transfer the exact amount to the following account details in NGN.</p>
                                </div>

                                <div style={{ borderTop: "1px solid var(--border-glass)", paddingTop: 32, marginBottom: 40, display: "flex", flexDirection: "column", gap: 24 }}>
                                    <div>
                                        <div style={{ fontSize: "0.7rem", color: "var(--text-tertiary)", textTransform: "uppercase", marginBottom: 8 }}>Bank Name</div>
                                        <div style={{ fontSize: "1.1rem", fontWeight: 700 }}>MONIEPOINT MFB</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: "0.7rem", color: "var(--text-tertiary)", textTransform: "uppercase", marginBottom: 8 }}>Account Number</div>
                                        <div style={{ fontSize: "1.1rem", fontWeight: 700, fontFamily: "monospace" }}>6852143015</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: "0.7rem", color: "var(--text-tertiary)", textTransform: "uppercase", marginBottom: 8 }}>Account Name</div>
                                        <div style={{ fontSize: "1.1rem", fontWeight: 700 }}>D-CODE MARKETPLACELIMITED</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: "0.7rem", color: "var(--text-tertiary)", textTransform: "uppercase", marginBottom: 8 }}>Amount</div>
                                        <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--accent)" }}>
                                            {formatDualPrice(selectedListing.price)}
                                        </div>
                                    </div>
                                </div>

                                <button className="btn-primary" style={{ width: "100%", padding: "16px", fontSize: "1rem" }} onClick={() => setPaymentStep('upload')}>
                                    I Have Paid - Upload Screenshot
                                </button>
                                <p style={{ textAlign: "center", color: "var(--text-tertiary)", fontSize: "0.8rem", marginTop: 16 }}>
                                    Make sure to include the transaction reference in the screenshot
                                </p>
                            </div>
                            )}

                            {/* Upload Screenshot Section */}
                            {paymentStep === 'upload' && (
                            <div style={{ padding: "32px 24px" }}>
                                <div style={{ marginBottom: 32 }}>
                                    <h2 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: 12 }}>Upload Payment Screenshot</h2>
                                    <p style={{ color: "var(--text-tertiary)", fontSize: "0.9rem" }}>Please upload a clear screenshot of your payment confirmation showing the transaction details.</p>
                                </div>

                                <div style={{ borderTop: "1px solid var(--border-glass)", paddingTop: 32, marginBottom: 40, display: "flex", flexDirection: "column", gap: 24 }}>
                                    <div>
                                        <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 700, marginBottom: 8 }}>Select Screenshot</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    const reader = new FileReader();
                                                    reader.onload = (e) => {
                                                        setUploadedScreenshot(e.target?.result as string);
                                                        setPaymentStep('verify');
                                                    };
                                                    reader.readAsDataURL(file);
                                                }
                                            }}
                                            style={{
                                                width: "100%",
                                                padding: "12px",
                                                border: "1px solid var(--border-glass)",
                                                borderRadius: 8,
                                                background: "rgba(255,255,255,0.05)",
                                                color: "white"
                                            }}
                                        />
                                    </div>
                                </div>

                                <p style={{ textAlign: "center", color: "var(--text-tertiary)", fontSize: "0.8rem" }}>
                                    Supported formats: JPG, PNG, GIF. Max size: 5MB
                                </p>
                            </div>
                            )}

                            {/* Verify Payment Section */}
                            {paymentStep === 'verify' && (
                            <div style={{ padding: "32px 24px" }}>
                                <div style={{ marginBottom: 32 }}>
                                    <h2 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: 12 }}>Review Payment Screenshot</h2>
                                    <p style={{ color: "var(--text-tertiary)", fontSize: "0.9rem" }}>Please review the uploaded screenshot. If everything looks correct, click verify to contact support.</p>
                                </div>

                                <div style={{ borderTop: "1px solid var(--border-glass)", paddingTop: 32, marginBottom: 40, display: "flex", flexDirection: "column", gap: 24 }}>
                                    <div>
                                        <div style={{ fontSize: "0.7rem", color: "var(--text-tertiary)", textTransform: "uppercase", marginBottom: 8 }}>Uploaded Screenshot</div>
                                        {/* eslint-disable-next-line @next/next/no-img-element -- user-uploaded data URL */}
                                        <img
                                            src={uploadedScreenshot}
                                            alt="Payment Screenshot"
                                            style={{ width: "100%", maxHeight: 400, objectFit: "contain", borderRadius: 8, border: "1px solid var(--border-glass)" }}
                                        />
                                    </div>
                                </div>

                                <button
                                    className="btn-primary"
                                    style={{ width: "100%", padding: "16px", fontSize: "1rem" }}
                                    onClick={() => {
                                        const newOrder: Order = {
                                            id: Date.now(),
                                            listingId: selectedListing!.id,
                                            status: 'pending',
                                            timestamp: new Date().toISOString(),
                                            screenshot: uploadedScreenshot!,
                                        };
                                        const updatedOrders = [...orders, newOrder];
                                        setOrders(updatedOrders);
                                        localStorage.setItem("orders", JSON.stringify(updatedOrders));
                                        saveOrders(updatedOrders);
                                        window.open(WHATSAPP_PRIVATE_URL, '_blank');
                                        setPurchasedListing(selectedListing!);
                                        setShowReviewForm(true);
                                        setSelectedListing(null);
                                        setPaymentStep('details');
                                        setUploadedScreenshot(undefined);
                                    }}
                                >
                                    Verify Payment (Contact Support)
                                </button>
                                <p style={{ textAlign: "center", color: "var(--text-tertiary)", fontSize: "0.8rem", marginTop: 16 }}>
                                    This will open WhatsApp to discuss your payment verification
                                </p>
                            </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <ReviewSystem />

            <CommunitySection />

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
                                        .section-title {
                        font-size: 2.2rem !important;
                    }
                }
            `}</style>

            {/* Review Form */}
            {showReviewForm && purchasedListing && (
                <ReviewForm
                    listingId={purchasedListing.id}
                    listingTitle={purchasedListing.title}
                    onReviewSubmitted={(review) => {
                        console.log('Review submitted:', review);
                        setShowReviewForm(false);
                        setPurchasedListing(null);
                    }}
                    onClose={() => {
                        setShowReviewForm(false);
                        setPurchasedListing(null);
                    }}
                />
            )}

            {/* Auth Prompt */}
            {showAuthPrompt && (
                <AuthPrompt
                    onClose={() => setShowAuthPrompt(false)}
                    onSignIn={() => {
                        setShowAuthPrompt(false);
                        router.push("/login");
                    }}
                    onSignUp={() => {
                        setShowAuthPrompt(false);
                        router.push("/signup");
                    }}
                />
            )}
        </main>
    );
}
