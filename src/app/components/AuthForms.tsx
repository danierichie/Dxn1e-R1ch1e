"use client";

import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Lock, User, X } from "lucide-react";

interface AuthFormsProps {
  onClose: () => void;
  initialMode?: "login" | "signup";
}

export default function AuthForms({ onClose, initialMode = "login" }: AuthFormsProps) {
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    fullName: "",
    password: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login, signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (mode === "login") {
        const result = await login(formData.email, formData.password);
        if (!result.success) {
          setError(result.error || "Login failed");
        } else {
          onClose();
        }
      } else {
        const result = await signup(formData);
        if (!result.success) {
          setError(result.error || "Signup failed");
        } else {
          onClose();
        }
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

  const resetForm = () => {
    setFormData({
      email: "",
      username: "",
      fullName: "",
      password: "",
      phone: "",
    });
    setError("");
  };

  const switchMode = () => {
    resetForm();
    setMode(mode === "login" ? "signup" : "login");
  };

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0,0,0,0.8)",
      backdropFilter: "blur(10px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      padding: "20px"
    }}>
      <div className="glass-card" style={{
        maxWidth: "480px",
        width: "100%",
        maxHeight: "90vh",
        overflowY: "auto",
        position: "relative",
        border: "1px solid var(--accent-subtle)",
        background: "linear-gradient(135deg, var(--bg-secondary), var(--bg-tertiary))"
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "white",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
            zIndex: 10,
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.2)";
            e.currentTarget.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.1)";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <X size={20} />
        </button>

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
            {mode === "login" ? <Lock size={28} /> : <User size={28} />}
          </div>

          <h2 style={{
            fontSize: "1.8rem",
            fontWeight: 800,
            marginBottom: "8px",
            margin: 0,
            color: "white"
          }}>
            {mode === "login" ? "Welcome Back" : "Join D-CODE"}
          </h2>

          <p style={{
            color: "rgba(255,255,255,0.9)",
            marginBottom: 0,
            fontSize: "0.95rem",
            lineHeight: 1.5
          }}>
            {mode === "login"
              ? "Sign in to access your elite gaming account marketplace"
              : "Create your account and start trading premium COD Mobile accounts"
            }
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

            {/* Username (signup only) */}
            {mode === "signup" && (
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
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Choose a unique username"
                  required
                  minLength={3}
                  maxLength={20}
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
            )}

            {/* Full Name (signup only) */}
            {mode === "signup" && (
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
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                  minLength={2}
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
            )}

            {/* Phone (signup only, optional) */}
            {mode === "signup" && (
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
                  Phone Number <span style={{ color: "var(--text-tertiary)", fontWeight: 400 }}>(Optional)</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+234 816 992 5603"
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
            )}

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
                placeholder={mode === "login" ? "Enter your password" : "Create a strong password"}
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
              {mode === "signup" && (
                <p style={{
                  fontSize: "0.75rem",
                  color: "var(--text-tertiary)",
                  marginTop: "6px",
                  fontStyle: "italic"
                }}>
                  Minimum 6 characters
                </p>
              )}
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
              ? (mode === "login" ? "Signing In..." : "Creating Account...")
              : (mode === "login" ? "Sign In to Your Account" : "Create Your Account")
            }
          </button>

          {/* Switch Mode */}
          <div style={{ textAlign: "center", marginTop: "24px" }}>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
              {mode === "login" ? "New to D-CODE?" : "Already have an account?"}
              <button
                type="button"
                onClick={switchMode}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--accent)",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  marginLeft: "4px",
                  textDecoration: "underline",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--text-primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--accent)";
                }}
              >
                {mode === "login" ? "Create Account" : "Sign In"}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
