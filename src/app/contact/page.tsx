"use client";

import Contact from "../components/Contact";
import CommunitySection from "../components/CommunitySection";

export default function ContactPage() {
    return (
        <main className="pt-20">
            <div className="py-10">
                <Contact />
                <CommunitySection />
            </div>
        </main>
    );
}
