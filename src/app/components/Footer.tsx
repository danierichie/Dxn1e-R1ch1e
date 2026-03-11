"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter, faWhatsapp, faDiscord } from "@fortawesome/free-brands-svg-icons";
import { WHATSAPP_PRIVATE_URL } from "../../lib/utils";

const footerLinks = {
    Support: ["Help Center", "Contact Us"],
};

export default function Footer() {
    return (
        <footer className="border-t border-[var(--border-glass)] bg-[var(--bg-primary)]">
            <div className="max-w-[1200px] mx-auto pt-16 pb-8 px-6">
                <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-12">
                    {/* Brand Column */}
                    <div>
                        <div className="flex items-center gap-2.5 mb-5">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--accent)] to-[rgba(21,101,192,0.7)] flex items-center justify-center font-black text-sm text-[#0D0D0D]">
                                DM
                            </div>
                            <span className="font-extrabold text-base tracking-tight">
                                D-COD <span className="text-[var(--accent)]">MARKETPLACE</span>
                            </span>
                        </div>
                        <p className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-[300px] mb-6">
                            The premier marketplace for verified Call of Duty: Mobile accounts.
                            Secured by escrow. Trusted by thousands.
                        </p>
                        <div className="flex gap-3">
                            {[
                                { icon: faXTwitter, color: "#ffffff", bg: "#000000", href: "https://x.com/Dan1elcodm" },
                                { icon: faWhatsapp, color: "#ffffff", bg: "#25D366", href: WHATSAPP_PRIVATE_URL },
                                { icon: faDiscord, color: "#ffffff", bg: "#5865F2", href: "https://discord.com/users/dan1elcodm" }
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    {...(social.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                    className="w-10 h-10 rounded-lg flex items-center justify-center text-lg no-underline shadow-md hover:-translate-y-0.5 transition-transform duration-200"
                                    style={{ background: social.bg, color: social.color }}
                                >
                                    <FontAwesomeIcon icon={social.icon} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link Columns */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--text-primary)] mb-5">
                                {category}
                            </h4>
                            <ul className="list-none p-0 m-0 space-y-3">
                                {links.map((link) => {
                                    const href =
                                        category === "Support" && link === "Contact Us" ? "/contact" :
                                            category === "Support" && link === "Help Center" ? "/contact" : "#";
                                    return (
                                        <li key={link}>
                                            <a
                                                href={href}
                                                className="text-[var(--text-tertiary)] no-underline text-sm hover:text-[var(--accent)] transition-colors duration-200"
                                            >
                                                {link}
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-6 border-t border-[var(--border-glass)] flex justify-between items-center flex-wrap gap-4">
                    <p className="text-xs text-[var(--text-tertiary)]">
                        © 2026 D-COD MARKETPLACE. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <a href="/privacy" className="text-xs text-[var(--text-tertiary)] no-underline hover:text-[var(--text-secondary)] transition-colors duration-200">Privacy Policy</a>
                        <a href="/terms" className="text-xs text-[var(--text-tertiary)] no-underline hover:text-[var(--text-secondary)] transition-colors duration-200">Terms of Service</a>
                        <a href="/cookie-policy" className="text-xs text-[var(--text-tertiary)] no-underline hover:text-[var(--text-secondary)] transition-colors duration-200">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
