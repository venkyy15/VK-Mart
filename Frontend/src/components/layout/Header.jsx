// src/components/layout/Header.jsx

import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useMemo, useEffect } from "react";
import { logout } from "../../features/auth/authSlice";
import { FiSearch } from "react-icons/fi";
import {
  LogOut,
  ShoppingCart,
  UserRound,
  PackageOpen,
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
     STYLES
  ================================ */
  const baseItem = {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 10px",
    borderRadius: "6px",
    color: "#fff",
    textDecoration: "none",
    cursor: "pointer",
    transition: "all 0.2s ease",
    background: "transparent",
    border: "none",
  };

  const hover = (color) => ({
    onMouseEnter: (e) =>
      (e.currentTarget.style.background = color),
    onMouseLeave: (e) =>
      (e.currentTarget.style.background = "transparent"),
  });

  /* ===============================
     HEADER HEIGHT FIX (KEY PART)
  ================================ */
  const headerHeight = isMobile ? 110 : 70;

  return (
    <>
      <header className="header fixed-header">
        {/* ===============================
            MOBILE LAYOUT
        ================================ */}
        {isMobile ? (
          <>
            {/* TOP ROW */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Link
                to={userId ? `/${userId}` : "/"}
                className="header-logo"
              >
                VK<span>MART</span>
              </Link>

              {user && (
                <button
                  onClick={handleLogout}
                  style={baseItem}
                  {...hover("rgba(150,0,0,0.28)")}
                >
                  <LogOut size={26} />
                </button>
              )}
            </div>

            {/* SEARCH */}
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
             DESKTOP LAYOUT
          ================================ */
          <>
            <Link
              to={userId ? `/${userId}` : "/"}
              className="header-logo"
            >
              VK<span>MART</span>
            </Link>

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

            <div
              className="header-right"
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <Link
                to={userId ? `/profile/${userId}` : "/login"}
                style={baseItem}
                {...hover("rgba(3,49,125,0.25)")}
              >
                <UserRound size={26} />
                <strong>{user ? user.name : "Sign in"}</strong>
              </Link>

              <Link
                to={userId ? `/orders/${userId}` : "/login"}
                style={baseItem}
                {...hover("rgba(132,0,255,0.25)")}
              >
                <PackageOpen size={24} />
                <strong>Returns & Orders</strong>
              </Link>

              <Link
                to={userId ? `/cart/${userId}` : "/login"}
                style={{ ...baseItem, position: "relative" }}
                {...hover("rgba(167,108,6,0.28)")}
              >
                <ShoppingCart size={30} />
                {cartCount > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-6px",
                      right: "-8px",
                      width: "18px",
                      height: "18px",
                      background: "#ffb700",
                      color: "#000",
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
                <strong>Cart</strong>
              </Link>

              {user && (
                <button
                  onClick={handleLogout}
                  style={baseItem}
                  {...hover("rgba(150,0,0,0.28)")}
                >
                  <LogOut size={24} />
                  <strong>Logout</strong>
                </button>
              )}
            </div>
          </>
        )}
      </header>

      {/* ✅ FIXED SPACER */}
      <div style={{ height: `${headerHeight}px` }} />
    </>
  );
}
