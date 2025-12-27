// src/pages/Profile.jsx

import { useDispatch, useSelector } from "react-redux";
import { logout, updateProfile } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/profile.css";
export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading } = useSelector((state) => state.auth);

  // 🔐 Protect route
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    if (user) setName(user.name);
  }, [user]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleSaveName = async () => {
    if (!name.trim()) return;

    await dispatch(updateProfile({ name }));
    setEditing(false);
  };

  if (!user) return null;

  return (
    <div className="profile-page">
      <h2 className="profile-title">Your Account</h2>

      <div className="profile-grid">
        {/* PROFILE INFO */}
        <div className="profile-card">
          <h3>Profile Information</h3>

          {/* NAME */}
          <div className="profile-field">
            <strong>Name</strong>

            {!editing ? (
              <>
                <p>{user.name}</p>
                <button
                  className="link-btn"
                  onClick={() => setEditing(true)}
                >
                  Edit
                </button>
              </>
            ) : (
              <>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <div className="profile-edit-actions">
                  <button
                    className="save-btn"
                    onClick={handleSaveName}
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save"}
                  </button>

                  <button
                    className="cancel-btn"
                    onClick={() => {
                      setEditing(false);
                      setName(user.name);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>

          {/* EMAIL */}
          <div className="profile-field">
            <strong>Email</strong>
            <p>{user.email}</p>
          </div>
        </div>

        {/* ORDERS */}
        <div
          className="profile-card clickable"
          onClick={() => navigate("/orders")}
        >
          <h3>Your Orders</h3>
          <p>Track, return, or buy things again</p>
        </div>

        {/* ADDRESSES */}
        <div
          className="profile-card clickable"
          onClick={() => navigate("/addresses")}
        >
          <h3>Your Addresses</h3>
          <p>Add or manage delivery addresses</p>
        </div>

        {/* SECURITY */}
        <div
          className="profile-card clickable"
          onClick={() => navigate("/login-security")}
        >
          <h3>Login & Security</h3>
          <p>Update password and account details</p>
        </div>
      </div>

      {/* LOGOUT */}
      <div className="profile-actions">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
