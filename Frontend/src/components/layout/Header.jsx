// src/components/layout/Header.jsx

import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useMemo } from "react";

export default function Header() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // 🔥 Cart items from Redux
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user);

  // ✅ SAFE cart count (won’t break even if data shape changes)
  const cartCount = useMemo(() => {
    if (!Array.isArray(cartItems)) return 0;
    return cartItems.filter((item) => item?.product).length;
  }, [cartItems]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/?keyword=${search.trim()}`);
      setSearch("");
    }
  };

  return (
    <header className="header fixed-header">
      {/* LOGO */}
      <div className="header-left">
        <Link to="/" className="logo">
          VK MART
        </Link>
      </div>

      {/* SEARCH */}
      <form className="header-search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search Vk Mart"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {/* RIGHT */}
      <div className="header-right">
        <Link to={user ? "/profile" : "/login"} className="header-link">
          <span>Hi, {user ? user.name : "Sign in"}</span>
          <strong>Account</strong>
        </Link>

        <Link to="/orders" className="header-link">
          <span>Returns</span>
          <strong>& Orders</strong>
        </Link>

        <Link to="/cart" className="header-cart">
          Cart ({cartCount})
        </Link>
      </div>
    </header>
  );
}
