"use client";

import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp, faTelegram, faDiscord } from "@fortawesome/free-brands-svg-icons";
import { ArrowLeft, LayoutGrid } from "lucide-react";

export default function CommunityPage() {
    const router = useRouter();

    return (
        <main className="community-page" style={{ padding: "120px 24px 80px", maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
                <h1 className="section-title">
                    Join Our <span style={{ color: "var(--accent)" }}>Elite Community</span>
                </h1>
                <p className="section-subtitle" style={{ margin: "0 auto" }}>
                    Connect with fellow gamers and stay updated with the latest high-tier accounts before they hit the marketplace.
                </p>
            </div>

            <div className="glass-card platform-card" style={{ padding: "60px 40px", textAlign: "center", border: "1px solid var(--accent-subtle)" }}>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--accent-subtle)] text-[var(--accent)] mb-6">
                    <LayoutGrid size={24} />
                </div>
                <h2 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: 12 }}>
                    Choose Your Platform
                </h2>
                <p style={{ color: "var(--text-secondary)", marginBottom: 40, fontSize: "1.1rem" }}>
                    Join our community on your preferred platform to get exclusive access to new listings.
                </p>

                <div className="platform-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, maxWidth: 1000, margin: "0 auto" }}>
                    {/* WhatsApp */}
                    <a href="https://chat.whatsapp.com/JOOjgOlepLyEYteUMAQjYI?mode=gi_c" target="_blank" rel="noopener noreferrer" className="community-btn whatsapp">
                        <div className="icon-wrapper">
                            <FontAwesomeIcon icon={faWhatsapp} size="2x" />
                        </div>
                        <div className="content">
                            <span className="platform-name">WhatsApp Hub</span>
                            <span className="platform-desc">Real-time alerts & community trade intel</span>
                        </div>
                    </a>

                    {/* Telegram */}
                    <a href="https://t.me/dcodmarketplace" target="_blank" rel="noopener noreferrer" className="community-btn telegram">
                        <div className="icon-wrapper">
                            <FontAwesomeIcon icon={faTelegram} size="2x" />
                        </div>
                        <div className="content">
                            <span className="platform-name">Telegram Channel</span>
                            <span className="platform-desc">Official drops & secure marketplace info</span>
                        </div>
                    </a>

                    {/* Discord */}
                    <a href="https://discord.com/users/dan1elcodm" target="_blank" rel="noopener noreferrer" className="community-btn discord">
                        <div className="icon-wrapper">
                            <FontAwesomeIcon icon={faDiscord} size="2x" />
                        </div>
                        <div className="content">
                            <span className="platform-name">Discord Server</span>
                            <span className="platform-desc">Voice chats, events & elite networking</span>
                        </div>
                    </a>
                </div>

                <div style={{ marginTop: 40 }}>
                    <button
                        onClick={() => router.back()}
                        className="btn-outline"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "12px 24px",
                            fontSize: "0.95rem"
                        }}
                    >
                        <ArrowLeft size={18} /> Back
                    </button>
                </div>
            </div>

            <style jsx global>{`
                .community-btn {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    padding: 24px;
                    border-radius: 20px;
                    text-decoration: none;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    text-align: left;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    position: relative;
                    overflow: hidden;
                }

                .icon-wrapper {
                    width: 64px;
                    height: 64px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 16px;
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(10px);
                    flex-shrink: 0;
                }

                .content {
                    display: flex;
                    flex-direction: column;
                }

                .platform-name {
                    font-size: 1.2rem;
                    font-weight: 800;
                    color: white;
                    margin-bottom: 4px;
                }

                .platform-desc {
                    font-size: 0.85rem;
                    color: rgba(255, 255, 255, 0.7);
                    line-height: 1.4;
                }

                /* Custom Brand Gradients */
                .whatsapp {
                    background: linear-gradient(135deg, rgba(37, 211, 102, 0.15) 0%, rgba(32, 185, 84, 0.05) 100%);
                    border-color: rgba(37, 211, 102, 0.2);
                }
                .whatsapp .icon-wrapper { color: #25D366; background: rgba(37, 211, 102, 0.1); }
                .whatsapp:hover { background: rgba(37, 211, 102, 0.2); border-color: #25D366; box-shadow: 0 0 30px rgba(37, 211, 102, 0.2); }

                .telegram {
                    background: linear-gradient(135deg, rgba(0, 136, 204, 0.15) 0%, rgba(0, 102, 153, 0.05) 100%);
                    border-color: rgba(0, 136, 204, 0.2);
                }
                .telegram .icon-wrapper { color: #0088cc; background: rgba(0, 136, 204, 0.1); }
                .telegram:hover { background: rgba(0, 136, 204, 0.2); border-color: #0088cc; box-shadow: 0 0 30px rgba(0, 136, 204, 0.2); }

                .discord {
                    background: linear-gradient(135deg, rgba(88, 101, 242, 0.15) 0%, rgba(71, 82, 196, 0.05) 100%);
                    border-color: rgba(88, 101, 242, 0.2);
                }
                .discord .icon-wrapper { color: #5865F2; background: rgba(88, 101, 242, 0.1); }
                .discord:hover { background: rgba(88, 101, 242, 0.2); border-color: #5865F2; box-shadow: 0 0 30px rgba(88, 101, 242, 0.2); }

                @media (max-width: 768px) {
                    .platform-card {
                        padding: 32px 20px !important;
                        margin: 0 12px;
                    }
                    .platform-card h2 {
                        font-size: 1.5rem !important;
                    }
                    .platform-card p {
                        font-size: 0.95rem !important;
                        margin-bottom: 32px !important;
                    }
                    .community-btn {
                        padding: 16px;
                        gap: 16px;
                        border-radius: 16px;
                    }
                    .icon-wrapper {
                        width: 48px;
                        height: 48px;
                        border-radius: 12px;
                    }
                    .icon-wrapper :global(svg) {
                        width: 24px;
                        height: 24px;
                    }
                    .platform-name {
                        font-size: 1.05rem;
                    }
                    .platform-desc {
                        font-size: 0.75rem;
                    }
                }
            `}</style>
        </main>
    );
}
