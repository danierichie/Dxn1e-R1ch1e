const steps = [
    {
        number: "01",
        icon: "🔍",
        title: "Browse & Choose",
        description:
            "Explore our verified inventory of premium COD:Mobile accounts. Filter by rank, skins, price, and more.",
    },
    {
        number: "02",
        icon: "🔒",
        title: "Secure Checkout",
        description:
            "Pay with confidence using our escrow system. Your funds are held safely until transfer is confirmed.",
    },
    {
        number: "03",
        icon: "🎮",
        title: "Play Instantly",
        description:
            "Receive full account credentials within minutes. Our team verifies every transfer in real-time.",
    },
];

export default function HowItWorks() {
    return (
        <section
            id="how-it-works"
            style={{
                padding: "100px 24px",
                background: "var(--bg-secondary)",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Subtle background accent */}
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 600,
                    height: 600,
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(21, 101, 192, 0.06) 0%, transparent 70%)",
                    filter: "blur(80px)",
                    pointerEvents: "none",
                }}
            />

            <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
                <div style={{ textAlign: "center", marginBottom: 72 }}>
                    <div
                        className="neon-tag"
                        style={{ marginBottom: 20, display: "inline-flex" }}
                    >
                        ⚡ SIMPLE PROCESS
                    </div>
                    <h2 className="section-title" style={{ textAlign: "center" }}>
                        How{" "}
                        <span style={{ color: "var(--accent)" }}>It Works</span>
                    </h2>
                    <p
                        className="section-subtitle"
                        style={{ margin: "0 auto", textAlign: "center" }}
                    >
                        Three simple steps to your next legendary account. Secured by
                        escrow, verified by experts.
                    </p>
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: 32,
                        position: "relative",
                    }}
                    className="steps-grid"
                >
                    {/* Connecting line (desktop) */}
                    <div
                        className="steps-connector"
                        style={{
                            position: "absolute",
                            top: 60,
                            left: "20%",
                            right: "20%",
                            height: 1,
                            background:
                                "linear-gradient(90deg, transparent, var(--border-accent), var(--accent-dim), var(--border-accent), transparent)",
                            pointerEvents: "none",
                        }}
                    />

                    {steps.map((step, i) => (
                        <div
                            key={step.number}
                            className={`glass-card reveal reveal-delay-${i + 1}`}
                            style={{
                                padding: "40px 32px",
                                textAlign: "center",
                                position: "relative",
                            }}
                        >
                            {/* Step Number */}
                            <div
                                style={{
                                    position: "absolute",
                                    top: -1,
                                    right: 24,
                                    fontFamily: "var(--font-mono, monospace)",
                                    fontSize: "0.7rem",
                                    fontWeight: 700,
                                    color: "var(--accent)",
                                    background: "var(--bg-secondary)",
                                    padding: "4px 12px",
                                    borderRadius: "0 0 8px 8px",
                                    border: "1px solid var(--border-accent)",
                                    borderTop: "none",
                                    letterSpacing: "0.08em",
                                }}
                            >
                                STEP {step.number}
                            </div>

                            {/* Icon */}
                            <div
                                style={{
                                    width: 72,
                                    height: 72,
                                    borderRadius: 20,
                                    background: "var(--accent-subtle)",
                                    border: "1px solid var(--border-accent)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: 28,
                                    margin: "0 auto 24px",
                                }}
                            >
                                {step.icon}
                            </div>

                            <h3
                                style={{
                                    fontSize: "1.2rem",
                                    fontWeight: 700,
                                    marginBottom: 12,
                                    letterSpacing: "-0.01em",
                                }}
                            >
                                {step.title}
                            </h3>

                            <p
                                style={{
                                    color: "var(--text-secondary)",
                                    fontSize: "0.9rem",
                                    lineHeight: 1.7,
                                }}
                            >
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        @media (max-width: 768px) {
          .steps-grid {
            grid-template-columns: 1fr !important;
            max-width: 440px;
            margin: 0 auto;
          }
          .steps-connector {
            display: none;
          }
        }
      `}</style>
        </section>
    );
}
