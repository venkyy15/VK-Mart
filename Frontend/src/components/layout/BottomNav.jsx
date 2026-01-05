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

  // ✅ SAFE CART COUNT
  const cartCount = useSelector(
    (state) =>
      state.cart.items?.filter((item) => item?.product)?.length || 0
  );

  const isActive = (path) =>
    location.pathname === path ? "active" : "";

  return (
    <nav className="bottom-nav" aria-label="Mobile Navigation">
      <Link to="/" className={isActive("/")}>
        <House size={20} />
       
      </Link>

      <Link to="/orders" className={isActive("/orders")}>
        <PackageOpen size={20} />
        
      </Link>

      <Link to="/cart" className={isActive("/cart")}>
        <ShoppingCart size={20} />
        
        {cartCount > 0 && (
          <span className="cart-badge">{cartCount}</span>
        )}
      </Link>

      <Link to="/profile" className={isActive("/profile")}>
        <UserRound size={20} />
        
      </Link>
    </nav>
  );
}
