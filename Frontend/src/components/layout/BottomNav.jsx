// src/components/layout/BottomNav.jsx

import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function BottomNav() {
  const location = useLocation();

  // ✅ FIXED CART COUNT (SAFE)
  const cartCount = useSelector(
    (state) =>
      state.cart.items?.filter((item) => item?.product)?.length || 0
  );

  const isActive = (path) =>
    location.pathname === path ? "active" : "";

  return (
    <nav className="bottom-nav" aria-label="Mobile Navigation">
      <Link to="/" className={isActive("/")}>
        Home
      </Link>

      <Link to="/orders" className={isActive("/orders")}>
        Orders
      </Link>

      <Link to="/cart" className={isActive("/cart")}>
        Cart ({cartCount})
      </Link>

      <Link to="/profile" className={isActive("/profile")}>
        Profile
      </Link>
    </nav>
  );
}
