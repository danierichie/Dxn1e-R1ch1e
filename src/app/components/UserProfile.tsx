"use client";

import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function UserProfile() {
  const { user, logout, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    fullName: user?.fullName || "",
    username: user?.username || "",
    phone: user?.phone || "",
    avatar: user?.avatar || "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSave = async () => {
    setIsLoading(true);
    setMessage("");

    try {
      // Call API to update user profile
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editData),
      });

      if (response.ok) {
        updateUser(editData);
        setIsEditing(false);
        setMessage("Profile updated successfully!");
      } else {
        setMessage("Failed to update profile");
      }
    } catch (error) {
      setMessage("Network error. Please try again.");
    } finally {
      setIsLoading(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleCancel = () => {
    setEditData({
      fullName: user?.fullName || "",
      username: user?.username || "",
      phone: user?.phone || "",
      avatar: user?.avatar || "",
    });
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (!user) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <p>Please sign in to view your profile.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "16px 12px", maxWidth: "800px", margin: "0 auto" }}>
      <div className="glass-card" style={{ padding: "20px" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, margin: 0 }}>
            My Profile
          </h2>
          <div style={{ display: "flex", gap: "6px" }}>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="btn-outline"
                style={{ padding: "6px 12px", fontSize: "0.75rem" }}
              >
                Edit
              </button>
            ) : (
              <>
                <button
                  onClick={handleCancel}
                  className="btn-outline"
                  style={{ padding: "6px 12px", fontSize: "0.75rem" }}
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="btn-primary"
                  style={{ padding: "6px 12px", fontSize: "0.75rem" }}
                  disabled={isLoading}
                >
                  Save
                </button>
              </>
            )}
          </div>
        </div>

        {/* Success/Error Message */}
        {message && (
          <div style={{
            background: message.includes("success") ? "rgba(76, 175, 80, 0.1)" : "rgba(244, 67, 54, 0.1)",
            border: `1px solid ${message.includes("success") ? "rgba(76, 175, 80, 0.3)" : "rgba(244, 67, 54, 0.3)"}`,
            color: message.includes("success") ? "#4CAF50" : "#F44336",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "24px",
            textAlign: "center"
          }}>
            {message}
          </div>
        )}

        {/* Profile Content */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "20px" }}>
          {/* Avatar Section */}
          <div style={{ textAlign: "center" }}>
            <div style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "var(--accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
              fontSize: "2rem",
              color: "white",
              fontWeight: "bold"
            }}>
              {user.fullName.charAt(0).toUpperCase()}
            </div>
            
            {user.isVerified && (
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                background: "rgba(76, 175, 80, 0.1)",
                color: "#4CAF50",
                padding: "4px 8px",
                borderRadius: "16px",
                fontSize: "0.7rem",
                fontWeight: 600,
                marginBottom: "12px"
              }}>
                <span>✓</span> Verified Account
              </div>
            )}

            <div style={{ color: "var(--text-tertiary)", fontSize: "0.75rem" }}>
              Member since {new Date(user.createdAt).toLocaleDateString()}
            </div>
          </div>

          {/* User Information */}
          <div>
            <div style={{ display: "grid", gap: "16px" }}>
              {/* Email */}
              <div>
                <label style={{ 
                  display: "block", 
                  fontSize: "0.8rem", 
                  color: "var(--text-tertiary)", 
                  marginBottom: "4px",
                  textTransform: "uppercase"
                }}>
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    disabled
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid var(--border-glass)",
                      borderRadius: "6px",
                      color: "var(--text-secondary)",
                      fontSize: "0.9rem"
                    }}
                  />
                ) : (
                  <div style={{ color: "var(--text-primary)", fontSize: "1rem" }}>
                    {user.email}
                  </div>
                )}
              </div>

              {/* Full Name */}
              <div>
                <label style={{ 
                  display: "block", 
                  fontSize: "0.8rem", 
                  color: "var(--text-tertiary)", 
                  marginBottom: "4px",
                  textTransform: "uppercase"
                }}>
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="fullName"
                    value={editData.fullName}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid var(--border-glass)",
                      borderRadius: "6px",
                      color: "var(--text-primary)",
                      fontSize: "1rem"
                    }}
                  />
                ) : (
                  <div style={{ color: "var(--text-primary)", fontSize: "1rem" }}>
                    {user.fullName}
                  </div>
                )}
              </div>

              {/* Username */}
              <div>
                <label style={{ 
                  display: "block", 
                  fontSize: "0.8rem", 
                  color: "var(--text-tertiary)", 
                  marginBottom: "4px",
                  textTransform: "uppercase"
                }}>
                  Username
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="username"
                    value={editData.username}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid var(--border-glass)",
                      borderRadius: "6px",
                      color: "var(--text-primary)",
                      fontSize: "1rem"
                    }}
                  />
                ) : (
                  <div style={{ color: "var(--text-primary)", fontSize: "1rem" }}>
                    @{user.username}
                  </div>
                )}
              </div>

              {/* Phone */}
              <div>
                <label style={{ 
                  display: "block", 
                  fontSize: "0.8rem", 
                  color: "var(--text-tertiary)", 
                  marginBottom: "4px",
                  textTransform: "uppercase"
                }}>
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={editData.phone}
                    onChange={handleInputChange}
                    placeholder="Add phone number"
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid var(--border-glass)",
                      borderRadius: "6px",
                      color: "var(--text-primary)",
                      fontSize: "1rem"
                    }}
                  />
                ) : (
                  <div style={{ color: "var(--text-primary)", fontSize: "1rem" }}>
                    {user.phone || "Not provided"}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div style={{
          marginTop: "20px",
          paddingTop: "16px",
          borderTop: "1px solid var(--border-glass)"
        }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "12px" }}>
            Account Actions
          </h3>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button
              onClick={logout}
              className="btn-outline"
              style={{
                background: "rgba(244, 67, 54, 0.1)",
                borderColor: "rgba(244, 67, 54, 0.3)",
                color: "#F44336"
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 2fr"] {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          
          /* Make profile card more compact on mobile */
          div[style*="padding: 16px 12px"] {
            padding: 12px 8px !important;
          }
          
          div[style*="padding: 20px"] {
            padding: 16px !important;
          }
          
          /* Smaller avatar on mobile */
          div[style*="width: 80px"][style*="height: 80px"] {
            width: 60px !important;
            height: 60px !important;
            font-size: 1.5rem !important;
            margin-bottom: 12px !important;
          }
          
          /* Ensure edit buttons are visible on mobile */
          div[style*="display: flex"][style*="gap: 8px"] {
            flex-wrap: wrap !important;
            justify-content: flex-start !important;
            margin-top: 12px !important;
          }
          
          div[style*="display: flex"][style*="gap: 8px"] button {
            min-width: 100px !important;
            font-size: 0.8rem !important;
            padding: 6px 12px !important;
          }
        }
        
        @media (max-width: 480px) {
          /* Stack buttons vertically on very small screens */
          div[style*="display: flex"][style*="gap: 8px"] {
            flex-direction: column !important;
            width: 100% !important;
          }
          
          div[style*="display: flex"][style*="gap: 8px"] button {
            width: 100% !important;
            margin-bottom: 6px !important;
          }
          
          /* Ultra compact layout for phones */
          div[style*="padding: 12px 8px"] {
            padding: 8px 6px !important;
          }
          
          div[style*="padding: 16px"] {
            padding: 12px !important;
          }
          
          /* Reduce header margins */
          div[style*="marginBottom: 24px"] {
            margin-bottom: 16px !important;
          }
          
          /* Smaller title */
          h2[style*="fontSize: 1.5rem"] {
            font-size: 1.25rem !important;
          }
        }
      `}</style>
    </div>
  );
}
