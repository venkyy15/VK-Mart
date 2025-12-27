import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { signup, clearAuthError } from "../features/auth/authSlice";
import Loader from "../components/common/Loader";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, signupSuccess } = useSelector(
    (state) => state.auth
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  // 🔁 Redirect to login after successful signup (Amazon flow)
  useEffect(() => {
    if (signupSuccess) {
      navigate("/login", { replace: true });
    }
  }, [signupSuccess, navigate]);

  // 🧹 Clear old errors on unmount
  useEffect(() => {
    return () => {
      dispatch(clearAuthError());
    };
  }, [dispatch]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup(form));
  };

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="auth-title">Create account</h2>

        <p className="auth-subtitle">
          Sign up to start shopping on VK Mart
        </p>

        {error && <div className="auth-error">{error}</div>}

        <label>Full name</label>
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label>Email address</label>
        <input
          type="email"
          name="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="At least 6 characters"
          value={form.password}
          onChange={handleChange}
          minLength={6}
          required
        />

        <button
          type="submit"
          className="auth-btn"
          disabled={loading}
        >
          {loading ? <Loader /> : "Create your VK Mart account"}
        </button>

        <div className="auth-divider">
          <span>Already have an account?</span>
        </div>

        <Link to="/login" className="auth-link-btn">
          Sign in
        </Link>

        <p className="auth-footer-text">
          By creating an account, you agree to VK Mart's
          <span> Terms & Conditions</span>
        </p>
      </form>
    </div>
  );
}
