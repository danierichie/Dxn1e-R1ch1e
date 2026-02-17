"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function CommunitySection() {
    const router = useRouter();

    return (
        <section style={{ padding: "40px 24px", maxWidth: 1200, margin: "0 auto" }}>
            <div className="glass-card" style={{ padding: "40px 24px", textAlign: "center", border: "1px solid var(--accent-subtle)" }}>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: 16 }}>
                    Join the <span style={{ color: "var(--accent)" }}>Elite Community</span>
                </h3>
                <p style={{ color: "var(--text-secondary)", marginBottom: 32, fontSize: "1.1rem" }}>
                    Join our community to see recent available accounts before they hit the marketplace.
                </p>

                <button
                    className="btn-primary"
                    onClick={() => router.push('/community')}
                    style={{ padding: "16px 48px", fontSize: "1.1rem" }}
                >
                    Join Community
                </button>
            </div>
        </section>
    );
}
