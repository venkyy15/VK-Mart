// src/pages/LoginSecurity.jsx

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate, useParams } from "react-router-dom";
import { changePasswordApi } from "../api/authApi";

export default function LoginSecurity() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* 🔥 USER ID FROM URL */
  const { userId } = useParams();

  /* 🔥 AUTH USER */
  const user = useSelector((state) => state.auth.user);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [loading, setLoading] = useState(false);

  /* ========================
     SAFETY CHECK
  ======================== */
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (userId !== user._id) {
      navigate(`/login-security/${user._id}`, {
        replace: true
      });
    }
  }, [user, userId, navigate]);

  /* ========================
     UPDATE PASSWORD
  ======================== */
  const handleUpdatePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await changePasswordApi({
        currentPassword,
        newPassword
      });

      alert("Password updated successfully");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Password update failed"
      );
    } finally {
      setLoading(false);
    }
  };

  /* ========================
     LOGOUT ALL DEVICES
  ======================== */
  const handleLogoutAll = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (!user) return null;

  /* ========================
     UI
  ======================== */
  return (
    <div className="profile-page">
      <h2 style={{ marginBottom: "16px" }}>
        Login & Security
      </h2>

      <div className="profile-grid">
        {/* 🔐 CHANGE PASSWORD */}
        <div className="profile-card">
          <h3>Change Password</h3>
          <p>Update your account password</p>

          <input
            className="auth-input"
            type="password"
            placeholder="Current password"
            value={currentPassword}
            onChange={(e) =>
              setCurrentPassword(e.target.value)
            }
          />

          <input
            className="auth-input"
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(e.target.value)
            }
          />

          <input
            className="auth-input"
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
          />

          <button
            className="gold-btn"
            onClick={handleUpdatePassword}
            disabled={loading}
          >
            {loading
              ? "Updating..."
              : "Update Password"}
          </button>
        </div>

        {/* 📱 ACTIVE SESSIONS */}
        <div className="profile-card">
          <h3>Active Sessions</h3>
          <p>You are logged in on this device</p>

          <ul
            style={{
              fontSize: "14px",
              marginTop: "10px"
            }}
          >
            <li>🖥 Desktop – Chrome (India)</li>
          </ul>

          <button
            className="gold-btn outline"
            style={{ marginTop: "10px" }}
            onClick={handleLogoutAll}
          >
            Logout from all devices
          </button>
        </div>

        {/* 🔔 LOGIN ALERTS */}
        <div className="profile-card">
          <h3>Login Alerts</h3>
          <p>
            Get notified when a new login happens
          </p>

          <label className="alert-toggle">
            <input
              type="checkbox"
              checked={alertsEnabled}
              onChange={() =>
                setAlertsEnabled(!alertsEnabled)
              }
            />
            Enable email alerts
          </label>
        </div>
      </div>
    </div>
  );
}
