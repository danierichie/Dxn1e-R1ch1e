"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Lock, ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await login(formData.email, formData.password);
      if (!result.success) {
        setError(result.error || "Login failed");
      } else {
        router.push("/marketplace");
      }
    } catch (error) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg-primary)",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Main Content */}
      <div style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 24px 40px",
        background: "linear-gradient(135deg, var(--bg-primary), var(--bg-secondary))",
      }}>
        <div className="glass-card" style={{
          maxWidth: "480px",
          width: "100%",
          border: "1px solid var(--accent-subtle)",
          background: "linear-gradient(135deg, var(--bg-secondary), var(--bg-tertiary))"
        }}>
          {/* Header with Gradient */}
          <div style={{
            background: "linear-gradient(135deg, var(--accent), var(--accent-dim))",
            padding: "40px 32px 32px",
            margin: "-1px -1px 32px -1px",
            borderRadius: "var(--radius-lg) var(--radius-lg) 0 0",
            textAlign: "center"
          }}>
            <div style={{
              width: "60px",
              height: "60px",
              background: "rgba(255,255,255,0.2)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
              color: "white"
            }}>
              <Lock size={30} />
            </div>

            <h2 style={{
              fontSize: "1.8rem",
              fontWeight: 800,
              marginBottom: "8px",
              margin: 0,
              color: "white"
            }}>
              Welcome Back
            </h2>

            <p style={{
              color: "rgba(255,255,255,0.9)",
              marginBottom: 0,
              fontSize: "0.95rem",
              lineHeight: 1.5
            }}>
              Sign in to access your elite gaming account marketplace
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ padding: "0 32px 32px" }}>
            {/* Error Message */}
            {error && (
              <div style={{
                background: "rgba(244, 67, 54, 0.1)",
                border: "1px solid rgba(244, 67, 54, 0.3)",
                color: "#F44336",
                padding: "12px 16px",
                borderRadius: "8px",
                marginBottom: "24px",
                fontSize: "0.85rem",
                textAlign: "center",
                backdropFilter: "blur(10px)"
              }}>
                {error}
              </div>
            )}

            {/* Form Fields */}
            <div style={{ display: "grid", gap: "20px" }}>
              {/* Email */}
              <div>
                <label style={{
                  display: "block",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  marginBottom: "8px",
                  color: "var(--text-secondary)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em"
                }}>
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid var(--border-glass)",
                    borderRadius: "8px",
                    color: "var(--text-primary)",
                    fontSize: "1rem",
                    transition: "all 0.3s ease",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "var(--accent)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "var(--border-glass)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  }}
                />
              </div>

              {/* Password */}
              <div>
                <label style={{
                  display: "block",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  marginBottom: "8px",
                  color: "var(--text-secondary)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em"
                }}>
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  required
                  minLength={6}
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid var(--border-glass)",
                    borderRadius: "8px",
                    color: "var(--text-primary)",
                    fontSize: "1rem",
                    transition: "all 0.3s ease",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "var(--accent)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "var(--border-glass)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  }}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary"
              style={{
                width: "100%",
                padding: "16px",
                fontSize: "1.1rem",
                fontWeight: 700,
                marginTop: "32px",
                opacity: isLoading ? 0.5 : 1,
                cursor: isLoading ? "not-allowed" : "pointer",
                background: isLoading ? "var(--accent-dim)" : "var(--accent)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 10px 30px rgba(21, 101, 192, 0.4)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }
              }}
            >
              {isLoading
                ? "Signing In..."
                : "Sign In to Your Account"
              }
            </button>

            {/* Switch to Signup */}
            <div style={{ textAlign: "center", marginTop: "24px" }}>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                New to D-CODE?
                <Link
                  href="/signup"
                  style={{
                    color: "var(--accent)",
                    textDecoration: "none",
                    fontWeight: 600,
                    marginLeft: "4px",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--text-primary)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--accent)";
                  }}
                >
                  Create Account
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
