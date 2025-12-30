// src/components/layout/Header.jsx

import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useMemo } from "react";

export default function Header() {
  const navigate = useNavigate();
  const { userId } = useParams(); // 🔥 URL PARAM
  const [search, setSearch] = useState("");

  // 🔥 Redux state
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user);

  // ✅ SAFE cart count
  const cartCount = useMemo(() => {
    if (!Array.isArray(cartItems)) return 0;
    return cartItems.filter((item) => item?.product).length;
  }, [cartItems]);

  /* ===============================
     SEARCH HANDLER
  ================================ */
  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    if (userId) {
      navigate(`/${userId}?keyword=${search.trim()}`);
    } else {
      navigate(`/login`);
    }

    setSearch("");
  };

  /* ===============================
     SAFE USER ID
  ================================ */
  const activeUserId = userId || user?._id;

  return (
    <header className="header fixed-header">
      {/* LOGO */}
      <div className="header-left">
        <Link to={activeUserId ? `/${activeUserId}` : "/login"} className="logo">
          VK MART
        </Link>
      </div>

      {/* SEARCH */}
      <form className="header-search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search VK Mart"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {/* RIGHT SIDE */}
      <div className="header-right">
        {/* ACCOUNT */}
        <Link
          to={
            activeUserId
              ? `/profile/${activeUserId}`
              : "/login"
          }
          className="header-link"
        >
          <span>Hi, {user ? user.name : "Sign in"}</span>
          <strong>Account</strong>
        </Link>

        {/* ORDERS */}
        <Link
          to={
            activeUserId
              ? `/orders/${activeUserId}`
              : "/login"
          }
          className="header-link"
        >
          <span>Returns</span>
          <strong>& Orders</strong>
        </Link>

        {/* CART */}
        <Link
          to={
            activeUserId
              ? `/cart/${activeUserId}`
              : "/login"
          }
          className="header-cart"
        >
          Cart ({cartCount})
        </Link>
      </div>
    </header>
  );
} 