// src/components/layout/BottomNav.jsx

import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  House,
  PackageOpen,
  ShoppingCart,
  UserRound,
} from "lucide-react";

export default function BottomNav() {
  const location = useLocation();

  /* =========================
     GET userId SAFELY FROM URL
     ========================= */
  // Example path: /123/cart
  const pathParts = location.pathname.split("/").filter(Boolean);
  const userId = pathParts[0]; // 🔥 ALWAYS WORKS

  const base = userId ? `/${userId}` : "";

  /* =========================
     CART COUNT
     ========================= */
  const cartCount = useSelector(
    (state) =>
      state.cart.items?.filter((item) => item?.product)?.length || 0
  );

  /* =========================
     ACTIVE STATE
     ========================= */
  const isActive = (path) =>
    location.pathname === path ||
    location.pathname.startsWith(path + "/")
      ? "active"
      : "";

  return (
    <nav className="bottom-nav" aria-label="Mobile Navigation">
      
      {/* HOME */}
      <Link to={base} className={isActive(base)}>
        <House size={24} />
      </Link>

      {/* ORDERS */}
      <Link
        to={`${base}/orders`}
        className={isActive(`${base}/orders`)}
      >
        <PackageOpen size={24} />
      </Link>

      {/* CART */}
      <Link
        to={`${base}/cart`}
        className={`cart-link ${isActive(`${base}/cart`)}`}
      >
        <ShoppingCart size={24} />
        {cartCount > 0 && (
          <span className="cart-badge">{cartCount}</span>
        )}
      </Link>

      {/* PROFILE */}
      <Link
        to={`${base}/profile`}
        className={isActive(`${base}/profile`)}
      >
        <UserRound size={24} />
      </Link>
    </nav>
  );
}
