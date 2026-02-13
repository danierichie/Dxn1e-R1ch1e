"use client";

import Contact from "../components/Contact";
import CommunitySection from "../components/CommunitySection";

export default function ContactPage() {
    return (
        <main style={{ paddingTop: "80px" }}>
            <div style={{ padding: "40px 0" }}>
                <Contact />
                <CommunitySection />
            </div>
        </main>
    );
}
