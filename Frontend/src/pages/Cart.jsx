// src/pages/Cart.jsx

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import EmptyState from "../components/common/EmptyState";

import "./Cart.css";

export default function Cart() {
  const navigate = useNavigate();

  /* 🔥 GET LOGGED IN USER */
  const user = useSelector((state) => state.auth.user);

  /* 🔥 FILTER ONLY VALID CART ITEMS */
  const cartItems = useSelector((state) =>
    state.cart.items.filter(
      (item) => item && item.product
    )
  );

  /* 🚨 SAFETY: NO USER */
  if (!user) {
    navigate("/login");
    return null;
  }

  const userId = user._id;

  /* ========================
     EMPTY CART STATE
  ======================== */
  if (cartItems.length === 0) {
    return (
      <EmptyState
        title="Your cart is empty"
        message="Add items to your cart to see them here."
        actionText="Start Shopping"
        onAction={() => navigate("/")}
      />
    );
  }

  /* ========================
     UI
  ======================== */
  return (
    <div className="cart-page">
      <h2 className="cart-title">
        Your Shopping Cart
      </h2>

      <div className="cart-content">
        {/* ===== CART ITEMS ===== */}
        <div className="cart-items">
          {cartItems.map((item) => (
            <div
              className="cart-item-wrapper"
              key={item.product._id}
            >
              <CartItem item={item} />
            </div>
          ))}
        </div>

        {/* ===== CART SUMMARY ===== */}
        <div className="cart-summary">
          <CartSummary
            onCheckout={() =>
              navigate(
                `/checkout/${userId}`
              )
            }
          />
        </div>
      </div>
    </div>
  );
}
