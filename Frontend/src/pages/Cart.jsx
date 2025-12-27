// src/pages/Cart.jsx
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import EmptyState from "../components/common/EmptyState";

import "./Cart.css";

export default function Cart() {
  const navigate = useNavigate();

  // 🔥 FILTER ONLY VALID CART ITEMS
  const cartItems = useSelector((state) =>
    state.cart.items.filter((item) => item.product)
  );

  // ✅ EMPTY CART STATE
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

  return (
    <div className="cart-page">
      <h2 className="cart-title">Your Shopping Cart</h2>

      <div className="cart-content">
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

        {/* ✅ SUMMARY NOW MATCHES UI */}
        <div className="cart-summary">
          <CartSummary />
        </div>
      </div>
    </div>
  );
}
