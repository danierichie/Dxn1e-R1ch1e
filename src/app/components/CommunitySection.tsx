"use client";

import { useRouter } from "next/navigation";
import { Users } from "lucide-react";

export default function CommunitySection() {
    const router = useRouter();

    return (
        <section className="py-12 px-6 max-w-[1200px] mx-auto">
            <div className="glass-card p-10 text-center border border-[var(--accent-subtle)] relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-[0.03] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">
                    <Users size={160} />
                </div>
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-[var(--accent-subtle)] text-[var(--accent)] mb-8 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_30px_var(--accent-glow)]">
                    <Users size={40} />
                </div>
                <h3 className="text-3xl font-extrabold mb-4">
                    Join Our <span className="text-[var(--accent)]">Community Hub</span>
                </h3>
                <p className="text-[var(--text-secondary)] mb-10 text-lg max-w-xl mx-auto leading-relaxed">
                    Gain exclusive access to high-tier listings, participate in community discussions, and connect with elite collectors.
                </p>
                <button
                    className="btn-primary py-4 px-12 text-lg flex items-center gap-3 mx-auto transition-all hover:gap-5"
                    onClick={() => router.push('/community')}
                >
                    <Users size={22} /> Enter Hub — Check it out
                </button>
            </div>
        </section>
    );
}
