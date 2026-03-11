"use client";

import { useState } from "react";
import { Lock, Check, UserPlus, ShieldCheck, X } from "lucide-react";

interface AuthPromptProps {
  onClose: () => void;
  onSignIn: () => void;
  onSignUp: () => void;
}

export default function AuthPrompt({ onClose, onSignIn, onSignUp }: AuthPromptProps) {
  const [isHoveringSignIn, setIsHoveringSignIn] = useState(false);
  const [isHoveringSignUp, setIsHoveringSignUp] = useState(false);
  const [isHoveringClose, setIsHoveringClose] = useState(false);

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0,0,0,0.85)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1002,
      padding: "20px",
      animation: "fadeIn 0.3s ease"
    }}>
      <div
        className="glass-card"
        style={{
          maxWidth: "420px",
          width: "100%",
          position: "relative",
          border: "1px solid var(--accent-subtle)",
          background: "linear-gradient(135deg, rgba(21, 101, 192, 0.1), rgba(21, 101, 192, 0.05))",
          boxShadow: "0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(21, 101, 192, 0.15)",
          animation: "slideUp 0.4s ease"
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => onClose()}
          onMouseEnter={() => setIsHoveringClose(true)}
          onMouseLeave={() => setIsHoveringClose(false)}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: isHoveringClose ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "white",
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
            zIndex: 10,
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: isHoveringClose ? "scale(1.1) rotate(90deg)" : "scale(1) rotate(0deg)",
          }}
        >
          <X size={18} />
        </button>

        <div style={{ padding: "48px 32px", textAlign: "center" }}>
          {/* Lock Icon with Animation */}
          <div style={{
            width: "80px",
            height: "80px",
            background: "linear-gradient(135deg, var(--accent), var(--accent-dim))",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 32px",
            color: "white",
            boxShadow: "0 8px 32px rgba(21, 101, 192, 0.4)",
            animation: "pulse 2s infinite",
            position: "relative"
          }}>
            <Lock size={32} />
            <div style={{
              position: "absolute",
              top: "-2px",
              left: "-2px",
              right: "-2px",
              bottom: "-2px",
              background: "linear-gradient(135deg, var(--accent), transparent)",
              borderRadius: "50%",
              zIndex: -1,
              animation: "rotate 3s linear infinite"
            }} />
          </div>

          {/* Title */}
          <h2 style={{
            fontSize: "1.8rem",
            fontWeight: 800,
            marginBottom: "12px",
            color: "var(--text-primary)",
            lineHeight: 1.2,
            textShadow: "0 2px 4px rgba(0,0,0,0.3)"
          }}>
            Authentication Required
          </h2>

          {/* Subtitle */}
          <div style={{
            display: "inline-block",
            padding: "6px 16px",
            background: "rgba(21, 101, 192, 0.1)",
            border: "1px solid rgba(21, 101, 192, 0.3)",
            borderRadius: "20px",
            marginBottom: "24px",
            fontSize: "0.75rem",
            color: "var(--accent)",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.05em"
          }}>
            Premium Access Only
          </div>

          {/* Description */}
          <p style={{
            color: "var(--text-secondary)",
            marginBottom: "36px",
            lineHeight: 1.6,
            fontSize: "1rem",
            maxWidth: "300px",
            margin: "0 auto 36px"
          }}>
            Sign in or create an account to purchase premium COD Mobile accounts and unlock exclusive marketplace features.
          </p>

          {/* Benefits */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
            marginBottom: "32px",
            textAlign: "left"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "var(--text-secondary)",
              fontSize: "0.85rem"
            }}>
              <Check size={16} style={{ color: "#4CAF50" }} />
              <span>Secure Trading</span>
            </div>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "var(--text-secondary)",
              fontSize: "0.85rem"
            }}>
              <Check size={16} style={{ color: "#4CAF50" }} />
              <span>Verified Accounts</span>
            </div>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "var(--text-secondary)",
              fontSize: "0.85rem"
            }}>
              <Check size={16} style={{ color: "#4CAF50" }} />
              <span>Instant Delivery</span>
            </div>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "var(--text-secondary)",
              fontSize: "0.85rem"
            }}>
              <Check size={16} style={{ color: "#4CAF50" }} />
              <span>24/7 Support</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
            <button
              onClick={() => onSignIn()}
              onMouseEnter={() => setIsHoveringSignIn(true)}
              onMouseLeave={() => setIsHoveringSignIn(false)}
              className="btn-primary"
              style={{
                flex: 1,
                padding: "14px 24px",
                fontSize: "0.95rem",
                fontWeight: 700,
                background: isHoveringSignIn ? "var(--text-primary)" : "var(--accent)",
                color: isHoveringSignIn ? "var(--accent)" : "white",
                transform: isHoveringSignIn ? "translateY(-2px)" : "translateY(0)",
                boxShadow: isHoveringSignIn ? "0 8px 25px rgba(21, 101, 192, 0.4)" : "none",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px"
              }}
            >
              <Lock size={18} /> Sign In
            </button>
            <button
              onClick={() => onSignUp()}
              onMouseEnter={() => setIsHoveringSignUp(true)}
              onMouseLeave={() => setIsHoveringSignUp(false)}
              className="btn-outline"
              style={{
                flex: 1,
                padding: "14px 24px",
                fontSize: "0.95rem",
                fontWeight: 600,
                background: isHoveringSignUp ? "var(--accent)" : "transparent",
                color: isHoveringSignUp ? "white" : "var(--accent)",
                borderColor: isHoveringSignUp ? "var(--accent)" : "var(--border-glass)",
                transform: isHoveringSignUp ? "translateY(-2px)" : "translateY(0)",
                boxShadow: isHoveringSignUp ? "0 8px 25px rgba(21, 101, 192, 0.3)" : "none",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px"
              }}
            >
              <UserPlus size={18} /> Sign Up
            </button>
          </div>

          {/* Trust Badge */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 16px",
            background: "rgba(76, 175, 80, 0.1)",
            border: "1px solid rgba(76, 175, 80, 0.2)",
            borderRadius: "20px",
            fontSize: "0.75rem",
            color: "#4CAF50",
            fontWeight: 600
          }}>
            <ShieldCheck size={16} />
            <span>Secure & Trusted</span>
          </div>
        </div>

        {/* CSS Animations */}
        <style jsx>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes slideUp {
            from { 
              opacity: 0; 
              transform: translateY(30px) scale(0.9);
            }
            to { 
              opacity: 1; 
              transform: translateY(0) scale(1);
            }
          }
          
          @keyframes pulse {
            0%, 100% { 
              transform: scale(1);
              box-shadow: 0 8px 32px rgba(21, 101, 192, 0.4);
            }
            50% { 
              transform: scale(1.05);
              box-shadow: 0 12px 40px rgba(21, 101, 192, 0.6);
            }
          }
          
          @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
}
