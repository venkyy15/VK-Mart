// src/components/layout/Header.jsx

import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useMemo } from "react";
import { logout } from "../../features/auth/authSlice";
import { FiSearch } from "react-icons/fi";
import {
  LogOut,
  ShoppingCart,
  UserRound,
  PackageOpen
} from "lucide-react";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const user = useSelector((state) => state.auth.user);
  const userId = user?._id;

  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = useMemo(() => {
    if (!Array.isArray(cartItems)) return 0;
    return cartItems.filter((item) => item?.product).length;
  }, [cartItems]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    if (!userId) return navigate("/login");
    navigate(`/${userId}?keyword=${search.trim()}`);
    setSearch("");
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  /* ===============================
     BASE STYLE (UNCHANGED)
  ================================ */
  const baseItemStyle = {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 10px",
    borderRadius: "6px",
    color: "#fff",
    textDecoration: "none",
    cursor: "pointer",
    transition: "all 0.2s ease"
  };

  /* ===============================
     HOVER COLORS (ONLY ADDITION)
  ================================ */
  const hoverBlue = {
    onMouseEnter: (e) => (e.currentTarget.style.background = "rgba(3, 49, 125, 0.25)"),
    onMouseLeave: (e) => (e.currentTarget.style.background = "transparent")
  };

  const hoverPurple = {
    onMouseEnter: (e) => (e.currentTarget.style.background = "rgba(132, 0, 255, 0.25)"),
    onMouseLeave: (e) => (e.currentTarget.style.background = "transparent")
  };

  const hoverGold = {
    onMouseEnter: (e) => (e.currentTarget.style.background = "rgba(167, 108, 6, 0.28)"),
    onMouseLeave: (e) => (e.currentTarget.style.background = "transparent")
  };

  const hoverRed = {
    onMouseEnter: (e) => (e.currentTarget.style.background = "rgba(150, 0, 0, 0.28)"),
    onMouseLeave: (e) => (e.currentTarget.style.background = "transparent")
  };

  return (
    <>
      <header className="header fixed-header">
        {/* LOGO */}
        <Link
          to={userId ? `/${userId}` : "/"}
          className="header-logo"
          style={{ cursor: "pointer" }}
        >
          VK<span>MART</span>
        </Link>

        {/* SEARCH */}
        <form className="header-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search VK Mart"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="search-btn">
            <FiSearch />
          </button>
        </form>

        {/* RIGHT */}
        <div className="header-right">
          {/* 👤 PROFILE – BLUE */}
          <Link
            to={userId ? `/profile/${userId}` : "/login"}
            style={baseItemStyle}
            {...hoverBlue}
          >
            <UserRound size={28} />
            <div className="header-text">
              <strong>{user ? user.name : "Sign in"}</strong>
            </div>
          </Link>

          {/* 📦 ORDERS – PURPLE */}
          <Link
            to={userId ? `/orders/${userId}` : "/login"}
            style={baseItemStyle}
            {...hoverPurple}
          >
            <PackageOpen size={26} />
            <div className="header-text">
              <strong>Returns & Orders</strong>
            </div>
          </Link>

          {/* 🛒 CART – GOLD */}
          <Link
            to={userId ? `/cart/${userId}` : "/login"}
            style={{ ...baseItemStyle, position: "relative" }}
            {...hoverGold}
          >
            <div style={{ position: "relative" }}>
              <ShoppingCart size={32} />
              {cartCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-6px",
                    right: "-10px",
                    minWidth: "18px",
                    height: "18px",
                    background: "#ffb700ff",
                    color: "#000",
                    fontSize: "11px",
                    fontWeight: "700",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  {cartCount}
                </span>
              )}
            </div>
            <div className="header-text">
              <strong>Cart</strong>
            </div>
          </Link>

          {/* 🚪 LOGOUT – RED */}
          {user && (
            <button
              onClick={handleLogout}
              style={{
                ...baseItemStyle,
                background: "transparent",
                border: "none"
              }}
              {...hoverRed}
            >
              <LogOut size={26} />
              <div className="header-text">
                <strong>Logout</strong>
              </div>
            </button>
          )}
        </div>
      </header>

      {/* SPACER */}
      <div className="header-spacer" />
    </>
  );
}
