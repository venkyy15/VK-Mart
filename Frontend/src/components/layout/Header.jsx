// src/components/layout/Header.jsx

import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useMemo, useEffect } from "react";
import { logout } from "../../features/auth/authSlice";
import { FiSearch } from "react-icons/fi";
import {
  ShoppingCart,
  UserRound,
  PackageOpen,
  LogOut,
} from "lucide-react";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const user = useSelector((state) => state.auth.user);
  const userId = user?._id;

  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = useMemo(() => {
    if (!Array.isArray(cartItems)) return 0;
    return cartItems.filter((item) => item?.product).length;
  }, [cartItems]);

  /* ===============================
     RESPONSIVE
  ================================ */
  useEffect(() => {
    const resize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

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
     PILL STYLE (UNCHANGED)
  ================================ */
  const pillItem = {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "9px 18px",
    borderRadius: "999px",
    background: "#f5c26b",
    color: "#0f3d2e",
    fontSize: "14px",
    fontWeight: "600",
    textDecoration: "none",
    border: "1px solid #e6b45e",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    cursor: "pointer",
  };

  const headerHeight = isMobile ? 120 : 70;

  return (
    <>
      <header
        className="header fixed-header"
        style={{
          background: "linear-gradient(90deg,#0f3d2e,#145a42)",
          color: "#ffffff",
        }}
      >
        {/* ===============================
            MOBILE
        ================================ */}
        {isMobile ? (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              {/* LOGO (ICON + TEXT) */}
              <Link
                to={userId ? `/${userId}` : "/"}
                className="header-logo"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginLeft: "88px",
                }}
              >
                <img
                  src="/vk-logo.png"
                  alt="VK MART"
                  style={{
                    width: "28px",
                    height: "28px",
                    objectFit: "contain",
                  }}
                />
                <span style={{ fontWeight: 800, fontSize: "18px" }}>
                  VK<span style={{ color: "#f5c26b" }}>MART</span>
                </span>
              </Link>

              {user && (
                <button
                  onClick={handleLogout}
                  style={{ ...pillItem, padding: "8px 14px" }}
                >
                  <LogOut size={18} />
                </button>
              )}
            </div>

            <form
              className="header-search"
              onSubmit={handleSearch}
              style={{ width: "100%", marginTop: "10px" }}
            >
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
          </>
        ) : (
          /* ===============================
             DESKTOP
          ================================ */
          <>
            {/* LOGO */}
            <Link
              to={userId ? `/${userId}` : "/"}
              className="header-logo"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontWeight: 800,
                fontSize: "22px",
              }}
            >
              <img
                src="/vk-logo.png"
                alt="VK MART"
                style={{
                  width: "34px",
                  height: "34px",
                  objectFit: "contain",
                }}
              />
              VK<span style={{ color: "#f5c26b" }}>MART</span>
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
            <div
              className="header-right"
              style={{ display: "flex", alignItems: "center", gap: "12px" }}
            >
              <Link
                to={userId ? `/profile/${userId}` : "/login"}
                style={pillItem}
              >
                <UserRound size={22} />
                <span>{user ? user.name : "User"}</span>
              </Link>

              <Link
                to={userId ? `/orders/${userId}` : "/login"}
                style={pillItem}
              >
                <PackageOpen size={20} />
                <span>Orders</span>
              </Link>

              <Link
                to={userId ? `/cart/${userId}` : "/login"}
                style={{ ...pillItem, position: "relative" }}
              >
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-6px",
                      right: "-6px",
                      width: "18px",
                      height: "18px",
                      background: "#0f3d2e",
                      color: "#f5c26b",
                      fontSize: "11px",
                      fontWeight: "700",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {cartCount}
                  </span>
                )}
                <span>Cart</span>
              </Link>

              {user && (
                <button onClick={handleLogout} style={pillItem}>
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              )}
            </div>
          </>
        )}
      </header>

      {/* SPACER */}
      <div style={{ height: `${headerHeight}px` }} />
    </>
  );
}
