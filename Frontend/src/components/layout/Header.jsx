// src/components/layout/Header.jsx

import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useMemo } from "react";
import { logout } from "../../features/auth/authSlice";
import { FiSearch, FiUser } from "react-icons/fi";
import { LogOut, ShoppingCart } from "lucide-react";

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

    if (!userId) {
      navigate("/login");
      return;
    }

    navigate(`/${userId}?keyword=${search.trim()}`);
    setSearch("");
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <header className="header fixed-header">
        {/* LOGO */}
        <Link to={userId ? `/${userId}` : "/"} className="header-logo">
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

        <div className="header-right">
          {/* ACCOUNT */}
          <Link
            to={userId ? `/profile/${userId}` : "/login"}
            className="header-item"
          >
            <FiUser className="profile-icon" />
            <div className="header-text">
              {/* 🔥 FIX: NAME MOVED TO strong */}
              <strong>{user ? user.name : "Sign in"}</strong>
              <span>Account</span>
            </div>
          </Link>

          {/* ORDERS */}
          <Link
            to={userId ? `/orders/${userId}` : "/login"}
            className="header-item"
          >
            <div className="header-text">
              {/* 🔥 FIX: FULL TEXT IN strong */}
              <strong>Returns & Orders</strong>
            </div>
          </Link>

          {/* CART */}
          <Link
            to={userId ? `/cart/${userId}` : "/login"}
            className="cart-button"
          >
            <ShoppingCart size={26} />
            {cartCount > 0 && (
              <span className="cart-count">{cartCount}</span>
            )}
          </Link>

          {/* LOGOUT */}
          {user && (
            <button className="logout-text" onClick={handleLogout}>
              <LogOut size={22} />
            </button>
          )}
        </div>
      </header>

      <div className="header-spacer" />
    </>
  );
}
