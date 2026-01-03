import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { login } from "../features/auth/authSlice";
import { fetchCart } from "../features/cart/cartSlice";
import Loader from "../components/common/Loader";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, error } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /* ===============================
     HANDLE LOGIN (NO REDIRECT HERE)
  ================================ */
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      login({
        email: email.trim(),
        password
      })
    );
  };

  /* ===============================
     REDIRECT AFTER LOGIN SUCCESS
  ================================ */
  useEffect(() => {
    if (user?._id) {
      dispatch(fetchCart());
      navigate(`/${user._id}`, { replace: true });
    }
  }, [user, dispatch, navigate]);

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="auth-title">Sign in</h2>
        <p className="auth-subtitle">
          Sign in to continue shopping
        </p>

        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

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

        <button
          type="submit"
          className="auth-btn"
          disabled={loading}
        >
          {loading ? <Loader /> : "Sign in"}
        </button>

        <div className="auth-divider">
          <span>New to VK Mart?</span>
        </div>

        <Link to="/signup" className="auth-link-btn">
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
