"use client";

import { useState, useEffect } from "react";

interface TrustBadge {
  id: number;
  icon: string;
  title: string;
  description: string;
  verified?: boolean;
  link?: string;
}

const trustBadges: TrustBadge[] = [
  {
    id: 1,
    icon: "🔒",
    title: "SSL Secured",
    description: "256-bit encryption for all transactions",
    verified: true
  },
  {
    id: 2,
    icon: "✓",
    title: "Verified Accounts",
    description: "All accounts manually verified",
    verified: true
  },
  {
    id: 3,
    icon: "🛡️",
    title: "Escrow Protection",
    description: "Your money is safe until delivery",
    verified: true
  },
  {
    id: 4,
    icon: "⚡",
    title: "Instant Delivery",
    description: "98% of orders delivered within 5 minutes",
    verified: true
  },
  {
    id: 5,
    icon: "💬",
    title: "24/7 Support",
    description: "Round-the-clock customer assistance",
    verified: true
  },
  {
    id: 6,
    icon: "🏆",
    title: "1000+ Happy Customers",
    description: "Trusted by gamers worldwide",
    verified: true
  }
];

const stats = [
  { label: "Happy Customers", value: "1,247", suffix: "+" },
  { label: "Accounts Sold", value: "3,892", suffix: "+" },
  { label: "Success Rate", value: "99.8", suffix: "%" },
  { label: "Response Time", value: "< 2", suffix: "min" }
];

export default function TrustBadges() {
  const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0));

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedStats(stats.map(stat => {
        const numValue = parseFloat(stat.value.replace(/[^\d.]/g, ''));
        return numValue;
      }));
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section style={{ padding: "80px 24px", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <div className="neon-tag" style={{ marginBottom: 20, display: "inline-flex" }}>
          🛡️ TRUST & SECURITY
        </div>
        <h2 className="section-title" style={{ textAlign: "center" }}>
          Why <span style={{ color: "var(--accent)" }}>Trust Us</span>
        </h2>
        <p className="section-subtitle" style={{ margin: "0 auto", textAlign: "center" }}>
          We're committed to providing a safe and secure marketplace for all your gaming needs.
        </p>
      </div>

      {/* Stats Section */}
      <div className="glass-card" style={{ padding: "40px", marginBottom: 60, background: "linear-gradient(135deg, rgba(21, 101, 192, 0.1), rgba(21, 101, 192, 0.05))" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 40, textAlign: "center" }}>
          {stats.map((stat, index) => (
            <div key={index} className="reveal reveal-delay-${index + 1}">
              <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--accent)", marginBottom: 8 }}>
                {animatedStats[index] > 0 ? (
                  <>
                    {stat.value.includes('.') ? animatedStats[index].toFixed(1) : Math.floor(animatedStats[index]).toLocaleString()}
                    {stat.suffix}
                  </>
                ) : (
                  "0"
                )}
              </div>
              <div style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Badges Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginBottom: 60 }}>
        {trustBadges.map((badge, index) => (
          <div 
            key={badge.id}
            className="glass-card reveal reveal-delay-${index + 1}"
            style={{ 
              padding: "32px 24px", 
              textAlign: "center",
              position: "relative",
              overflow: "hidden"
            }}
          >
            {badge.verified && (
              <div style={{
                position: "absolute",
                top: 12,
                right: 12,
                background: "rgba(76, 175, 80, 0.2)",
                color: "#4CAF50",
                padding: "4px 8px",
                borderRadius: "12px",
                fontSize: "0.6rem",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 4
              }}>
                <span>✓</span> Verified
              </div>
            )}
            
            <div style={{ fontSize: "3rem", marginBottom: 16 }}>
              {badge.icon}
            </div>
            
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 8, margin: 0 }}>
              {badge.title}
            </h3>
            
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.5, margin: 0 }}>
              {badge.description}
            </p>
          </div>
        ))}
      </div>

      {/* Security Features */}
      <div className="glass-card" style={{ padding: "40px" }}>
        <h3 style={{ textAlign: "center", fontSize: "1.5rem", fontWeight: 700, marginBottom: 32 }}>
          Advanced <span style={{ color: "var(--accent)" }}>Security Features</span>
        </h3>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 32 }}>
          <div>
            <h4 style={{ color: "var(--accent)", marginBottom: 16, fontSize: "1.1rem" }}>🔐 Payment Security</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li style={{ marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: "#4CAF50" }}>✓</span>
                <span style={{ color: "var(--text-secondary)" }}>256-bit SSL encryption</span>
              </li>
              <li style={{ marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: "#4CAF50" }}>✓</span>
                <span style={{ color: "var(--text-secondary)" }}>PCI-DSS compliant</span>
              </li>
              <li style={{ marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: "#4CAF50" }}>✓</span>
                <span style={{ color: "var(--text-secondary)" }}>Escrow protection</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: "#4CAF50" }}>✓</span>
                <span style={{ color: "var(--text-secondary)" }}>Fraud detection system</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 style={{ color: "var(--accent)", marginBottom: 16, fontSize: "1.1rem" }}>🛡️ Account Safety</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li style={{ marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: "#4CAF50" }}>✓</span>
                <span style={{ color: "var(--text-secondary)" }}>Manual verification process</span>
              </li>
              <li style={{ marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: "#4CAF50" }}>✓</span>
                <span style={{ color: "var(--text-secondary)" }}>Secure transfer protocol</span>
              </li>
              <li style={{ marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: "#4CAF50" }}>✓</span>
                <span style={{ color: "var(--text-secondary)" }}>24/7 monitoring</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: "#4CAF50" }}>✓</span>
                <span style={{ color: "var(--text-secondary)" }}>Money-back guarantee</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .glass-card[style*="grid-template-columns: repeat(4, 1fr)"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          
          .glass-card[style*="grid-template-columns: repeat(3, 1fr)"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        
        @media (max-width: 640px) {
          .glass-card[style*="grid-template-columns: repeat(4, 1fr)"],
          .glass-card[style*="grid-template-columns: repeat(3, 1fr)"],
          .glass-card[style*="grid-template-columns: repeat(2, 1fr)"] {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
