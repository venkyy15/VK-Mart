// src/components/layout/Header.jsx

import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useMemo } from "react";
import { logout } from "../../features/auth/authSlice";
import { FiSearch, FiUser, FiShoppingCart } from "react-icons/fi";
import { LogOut , ShoppingCart} from "lucide-react"


export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  // ✅ GET USER FROM REDUX (CORRECT WAY)
  const user = useSelector((state) => state.auth.user);
  const userId = user?._id;

  const cartItems = useSelector((state) => state.cart.items);

  const cartCount = useMemo(() => {
    if (!Array.isArray(cartItems)) return 0;
    return cartItems.filter((item) => item?.product).length;
  }, [cartItems]);

  /* ===============================
     SEARCH HANDLER (FIXED)
  ================================ */
  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    // 🔥 if not logged in, redirect
    if (!userId) {
      navigate("/login");
      return;
    }

    // 🔥 CORRECT NAVIGATION
    navigate(`/${userId}?keyword=${search.trim()}`);
    setSearch("");
  };

  /* ===============================
     LOGOUT
  ================================ */
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="header fixed-header">
      {/* LOGO */}
      <Link to="/" className="header-logo">
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
        {/* PROFILE */}
        <Link
          to={userId ? `/profile/${userId}` : "/login"}
          className="header-item"
        >
          <FiUser className="profile-icon" />
          <div className="header-text">
            <span>{user ? user.name : "Sign in"}</span>
            <strong>Account</strong>
          </div>
        </Link>

        {/* RETURNS & ORDERS */}
        <Link
          to={userId ? `/orders/${userId}` : "/login"}
          className="header-item"
        >
          <div className="header-text">
            <span>Returns</span>
            <strong>& Orders</strong>
          </div>
        </Link>
        <Link
          to={userId ? `/cart/${userId}` : "/login"}
          className="cart-button"
        >
          <ShoppingCart size={28} />
          <span className="cart-count">{cartCount}</span>
        </Link>


        {/* LOGOUT */}
        {user && (
          <button className="logout-text" onClick={handleLogout}>
            <LogOut />
          </button>
        )}
      </div>
    </header>
  );
}
