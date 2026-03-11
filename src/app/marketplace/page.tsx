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
import { Search, Lock, X, Video, ArrowRight } from "lucide-react";

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

    usePerformanceMonitor('MarketplacePage');

    const filteredListings = searchQuery.trim()
        ? listings.filter((l) =>
            l.title.toLowerCase().includes(searchQuery.toLowerCase().trim())
        )
        : listings;

    const loadListingsFromStorage = () => {
        const saved = localStorage.getItem("market_listings_v2");
        if (saved) {
            const data = JSON.parse(saved);
            setListings(sortByPrice(data));
        } else {
            setListings(sortByPrice(initialListings));
            localStorage.setItem("market_listings_v2", JSON.stringify(initialListings));
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

    useEffect(() => {
        const onStorage = (e: StorageEvent) => {
            if (e.key === "market_listings_v2" && e.newValue) {
                const data = JSON.parse(e.newValue);
                setListings(sortByPrice(data));
            }
        };
        const onVisible = () => {
            if (document.visibilityState !== "visible") return;
            const saved = localStorage.getItem("market_listings_v2");
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
        <main className="pt-28 pb-20 px-6 max-w-[1200px] mx-auto">
            {/* Page Header */}
            <div className="mb-10 text-center">
                <h1 className="section-title">
                    The <span className="text-[var(--accent)]">Marketplace</span>
                </h1>
                <p className="section-subtitle mx-auto">
                    Browse our full inventory of verified high-tier accounts.
                </p>
            </div>

            {/* User Welcome Banner */}
            {user && (
                <div className="glass-card p-5 mb-8 bg-gradient-to-br from-[rgba(21,101,192,0.1)] to-[rgba(21,101,192,0.05)] border border-[var(--accent-subtle)]">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--accent)] flex items-center justify-center text-white text-sm font-bold">
                            {user.fullName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <div className="text-base font-semibold text-[var(--text-primary)]">
                                Welcome back, {user.fullName}!
                            </div>
                            <div className="text-sm text-[var(--text-secondary)]">
                                Ready to find your next elite account?
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Search */}
            <div className="glass-card p-5 mb-8">
                <label htmlFor="marketplace-search" className="block text-xs text-[var(--text-tertiary)] mb-2">
                    Search by title
                </label>
                <input
                    id="marketplace-search"
                    type="search"
                    placeholder="e.g. Legendary, Mythic, Ghost..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-[var(--border-glass)] rounded-lg text-[var(--text-primary)] text-base placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                />
            </div>

            {/* Results */}
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }, (_, i) => (
                        <SkeletonCard key={i} />
                    ))}
                </div>
            ) : filteredListings.length === 0 ? (
                <div className="text-center py-24">
                    <div className="flex justify-center mb-5">
                        <Search size={48} className="text-[var(--text-tertiary)]" />
                    </div>
                    <h3 className="text-lg mb-2">{searchQuery.trim() ? "No accounts match your search" : "No accounts found"}</h3>
                    <p className="text-[var(--text-tertiary)]">{searchQuery.trim() ? "Try a different search term." : "Check back later for new listings."}</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredListings.map((listing) => (
                        <div
                            key={listing.id}
                            className="glass-card overflow-hidden"
                        >
                            <div className="h-1" style={{ background: `linear-gradient(90deg, ${listing.rankColor || "var(--accent)"}, transparent)` }} />
                            <div className="p-5">
                                <div className="flex justify-between mb-4">
                                    <div>
                                        {listing.tag && (
                                            <span className="inline-block px-2 py-1 rounded bg-[var(--accent-subtle)] text-[var(--accent)] text-[0.65rem] font-bold mb-2">
                                                {listing.tag}
                                            </span>
                                        )}
                                        <h3 className="text-base font-bold">{listing.title}</h3>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-lg font-extrabold text-[var(--accent)]">
                                            {formatDualPrice(listing.price)}
                                        </div>
                                        <div className="text-[0.65rem] text-[var(--text-tertiary)]">NGN / USD</div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-x-5 gap-y-2.5 py-3 border-y border-[var(--border-glass)] mb-5">
                                    <div>
                                        <span className="block text-[0.6rem] text-[var(--text-tertiary)] uppercase mb-0.5">Mythic Weps</span>
                                        <span className="text-sm font-bold">{listing.mythicWeapons || 0}</span>
                                    </div>
                                    <div>
                                        <span className="block text-[0.6rem] text-[var(--text-tertiary)] uppercase mb-0.5">Legendary Weps</span>
                                        <span className="text-sm font-bold text-[var(--accent)]">{listing.legendaryWeapons || 0}</span>
                                    </div>
                                    <div>
                                        <span className="block text-[0.6rem] text-[var(--text-tertiary)] uppercase mb-0.5">Mythic Skins</span>
                                        <span className="text-sm font-bold">{listing.mythicSkins || 0}</span>
                                    </div>
                                    <div>
                                        <span className="block text-[0.6rem] text-[var(--text-tertiary)] uppercase mb-0.5">Legendary Skins</span>
                                        <span className="text-sm font-bold">{listing.legendarySkins || 0}</span>
                                    </div>
                                </div>

                                {user ? (
                                    <button
                                        className="btn-primary w-full py-3 flex items-center justify-center gap-2"
                                        onClick={() => setSelectedListing(listing)}
                                    >
                                        View Details <ArrowRight size={16} />
                                    </button>
                                ) : (
                                    <button
                                        className="btn-primary w-full py-3 !bg-[var(--accent-dim)] cursor-pointer relative flex items-center justify-center gap-2"
                                        onClick={() => setShowAuthPrompt(true)}
                                        title="Sign in required to purchase"
                                    >
                                        <Lock size={16} /> Sign In Required
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Detail Modal */}
            {selectedListing && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-lg flex items-center justify-center z-[1000] p-6">
                    <div className="glass-card max-w-[900px] w-full max-h-[90vh] overflow-y-auto relative border border-[var(--accent-subtle)]">
                        <button
                            onClick={() => {
                                setSelectedListing(null);
                                setPaymentStep('details');
                                setUploadedScreenshot(undefined);
                            }}
                            className="absolute top-4 right-4 bg-black/50 border-none text-white w-10 h-10 rounded-full cursor-pointer z-10 flex items-center justify-center hover:bg-black/70 transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <div className="flex flex-col">
                            {/* Video Section */}
                            <div className="bg-black relative flex items-center justify-center w-full aspect-video">
                                {selectedListing.videoUrl ? (
                                    selectedListing.videoUrl.includes("youtube.com") ||
                                        selectedListing.videoUrl.includes("youtu.be") ||
                                        selectedListing.videoUrl.includes("vimeo.com") ? (
                                        <iframe
                                            src={selectedListing.videoUrl
                                                .replace("watch?v=", "embed/")
                                                .replace("vimeo.com/", "player.vimeo.com/video/")
                                            }
                                            className="w-full h-full border-none"
                                            allow="autoplay; encrypted-media; picture-in-picture"
                                            allowFullScreen
                                        />
                                    ) : (
                                        <video
                                            src={selectedListing.videoUrl}
                                            controls
                                            autoPlay
                                            muted
                                            playsInline
                                            loop
                                            className="w-full h-full object-contain"
                                        />
                                    )
                                ) : (
                                    <div className="text-center p-10">
                                        <div className="flex justify-center mb-4">
                                            <Video size={48} className="text-[var(--text-tertiary)]" />
                                        </div>
                                        <p className="text-[var(--text-tertiary)]">No video preview available for this legacy listing.</p>
                                    </div>
                                )}
                            </div>

                            {/* Details Section */}
                            {paymentStep === 'details' && (
                                <div className="p-6 md:p-8">
                                    <div className="mb-6">
                                        <div className="text-[var(--accent)] font-bold text-xs uppercase tracking-widest mb-2">
                                            Verified Account
                                        </div>
                                        <h2 className="text-2xl md:text-3xl font-extrabold mb-3">{selectedListing.title}</h2>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-2xl md:text-3xl font-extrabold text-[var(--accent)]">
                                                {formatDualPrice(selectedListing.price)}
                                            </span>
                                            <span className="text-[var(--text-tertiary)] text-sm">one-time payment</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4 mb-8">
                                        {[
                                            { label: "Mythic Weapons", value: selectedListing.mythicWeapons || 0 },
                                            { label: "Legendary Weapons", value: selectedListing.legendaryWeapons || 0, color: "text-[var(--accent)]" },
                                            { label: "Mythic Skins", value: selectedListing.mythicSkins || 0 },
                                            { label: "Legendary Skins", value: selectedListing.legendarySkins || 0 },
                                            { label: "Legendary Vehicles", value: selectedListing.legendaryVehicles || 0 }
                                        ].map((stat, i) => (
                                            <div key={i}>
                                                <div className="text-[0.7rem] text-[var(--text-tertiary)] uppercase mb-1">{stat.label}</div>
                                                <div className={`text-lg font-bold ${stat.color || 'text-white'}`}>{stat.value}</div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="border-t border-[var(--border-glass)] pt-6 mb-8 flex flex-col gap-5">
                                        {selectedListing.rareSkins && (
                                            <div>
                                                <div className="text-[0.7rem] text-[var(--text-tertiary)] uppercase mb-2">OG / Rare Skins</div>
                                                <div className="text-sm text-white leading-relaxed bg-[rgba(21,101,192,0.08)] p-4 rounded-xl border border-[rgba(21,101,192,0.2)]">
                                                    {selectedListing.rareSkins}
                                                </div>
                                            </div>
                                        )}
                                        <div className="grid grid-cols-2 gap-5">
                                            <div>
                                                <div className="text-[0.7rem] text-[var(--text-tertiary)] uppercase mb-2">Account UID</div>
                                                <div className="text-sm text-[var(--text-secondary)] font-mono break-all">{selectedListing.uid || "N/A"}</div>
                                            </div>
                                            <div>
                                                <div className="text-[0.7rem] text-[var(--text-tertiary)] uppercase mb-2">Linked To</div>
                                                <div className="text-sm text-[var(--text-secondary)]">{selectedListing.accountLinks || "Activision"}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <button className="btn-primary w-full py-4 text-base" onClick={() => setPaymentStep('bank')}>
                                        Buy This Account
                                    </button>
                                    <p className="text-center text-[var(--text-tertiary)] text-xs mt-4">
                                        Secured via Escrow Protection
                                    </p>
                                </div>
                            )}

                            {/* Bank Details */}
                            {paymentStep === 'bank' && (
                                <div className="p-6 md:p-8">
                                    <div className="mb-6">
                                        <h2 className="text-2xl md:text-3xl font-extrabold mb-3">Payment Details</h2>
                                        <p className="text-[var(--text-tertiary)] text-sm">Transfer the exact amount to the following account details in NGN.</p>
                                    </div>

                                    <div className="border-t border-[var(--border-glass)] pt-6 mb-8 flex flex-col gap-5">
                                        <div>
                                            <div className="text-[0.7rem] text-[var(--text-tertiary)] uppercase mb-2">Bank Name</div>
                                            <div className="text-lg font-bold">MONIEPOINT MFB</div>
                                        </div>
                                        <div>
                                            <div className="text-[0.7rem] text-[var(--text-tertiary)] uppercase mb-2">Account Number</div>
                                            <div className="text-lg font-bold font-mono">6852143015</div>
                                        </div>
                                        <div>
                                            <div className="text-[0.7rem] text-[var(--text-tertiary)] uppercase mb-2">Account Name</div>
                                            <div className="text-lg font-bold">D-CODE MARKETPLACELIMITED</div>
                                        </div>
                                        <div>
                                            <div className="text-[0.7rem] text-[var(--text-tertiary)] uppercase mb-2">Amount</div>
                                            <div className="text-lg font-bold text-[var(--accent)]">
                                                {formatDualPrice(selectedListing.price)}
                                            </div>
                                        </div>
                                    </div>

                                    <button className="btn-primary w-full py-4 text-base" onClick={() => setPaymentStep('upload')}>
                                        I Have Paid - Upload Screenshot
                                    </button>
                                    <p className="text-center text-[var(--text-tertiary)] text-xs mt-4">
                                        Make sure to include the transaction reference in the screenshot
                                    </p>
                                </div>
                            )}

                            {/* Upload Screenshot */}
                            {paymentStep === 'upload' && (
                                <div className="p-6 md:p-8">
                                    <div className="mb-6">
                                        <h2 className="text-2xl md:text-3xl font-extrabold mb-3">Upload Payment Screenshot</h2>
                                        <p className="text-[var(--text-tertiary)] text-sm">Please upload a clear screenshot of your payment confirmation showing the transaction details.</p>
                                    </div>

                                    <div className="border-t border-[var(--border-glass)] pt-6 mb-8 flex flex-col gap-5">
                                        <div>
                                            <label className="block text-sm font-bold mb-2">Select Screenshot</label>
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
                                                className="w-full p-3 border border-[var(--border-glass)] rounded-lg bg-white/5 text-white"
                                            />
                                        </div>
                                    </div>

                                    <p className="text-center text-[var(--text-tertiary)] text-xs">
                                        Supported formats: JPG, PNG, GIF. Max size: 5MB
                                    </p>
                                </div>
                            )}

                            {/* Verify Payment */}
                            {paymentStep === 'verify' && (
                                <div className="p-6 md:p-8">
                                    <div className="mb-6">
                                        <h2 className="text-2xl md:text-3xl font-extrabold mb-3">Review Payment Screenshot</h2>
                                        <p className="text-[var(--text-tertiary)] text-sm">Please review the uploaded screenshot. If everything looks correct, click verify to contact support.</p>
                                    </div>

                                    <div className="border-t border-[var(--border-glass)] pt-6 mb-8 flex flex-col gap-5">
                                        <div>
                                            <div className="text-[0.7rem] text-[var(--text-tertiary)] uppercase mb-2">Uploaded Screenshot</div>
                                            {/* eslint-disable-next-line @next/next/no-img-element -- user-uploaded data URL */}
                                            <img
                                                src={uploadedScreenshot}
                                                alt="Payment Screenshot"
                                                className="w-full max-h-[400px] object-contain rounded-lg border border-[var(--border-glass)]"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        className="btn-primary w-full py-4 text-base"
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
                                    <p className="text-center text-[var(--text-tertiary)] text-xs mt-4">
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
