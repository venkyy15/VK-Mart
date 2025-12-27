import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Link } from "react-router-dom";

import { login } from "../features/auth/authSlice";
import { fetchCart } from "../features/cart/cartSlice";

import Loader from "../components/common/Loader";

export default function Login() {
  const dispatch = useDispatch();

  const { user, loading, error } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /* ===============================
     HANDLE LOGIN
  ================================ */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await dispatch(
      login({
        email: email.trim(),
        password
      })
    );

    if (res.meta.requestStatus === "fulfilled") {
      dispatch(fetchCart());
    }
  };

  /* ===============================
     REDIRECT IF LOGGED IN
  ================================ */
  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="auth-title">Sign in</h2>
        <p className="auth-subtitle">
          Sign in to continue shopping
        </p>

        {error && <div className="auth-error">{error}</div>}

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* PRIMARY GOLD BUTTON */}
        <button
          type="submit"
          className="auth-btn"
          disabled={loading}
        >
          {loading ? <Loader /> : "Sign in"}
        </button>

        {/* DIVIDER */}
        <div className="auth-divider">
          <span>New to VK Mart?</span>
        </div>

        {/* SECONDARY GOLD BUTTON */}
        <Link
          to="/signup"
          className="auth-link-btn"
        >
          Create your VK Mart account
        </Link>

        <p className="auth-footer-text">
          By continuing, you agree to VK Mart’s
          <span> Conditions of Use </span>
          and
          <span> Privacy Notice</span>.
        </p>
      </form>
    </div>
  );
}
