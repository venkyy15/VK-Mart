// src/components/cart/CartSummary.jsx
import { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../utils/formatPrice";

const CartSummary = memo(function CartSummary({
  hideCheckoutButton = false
}) {
  const navigate = useNavigate();

  // ✅ SIMPLE SELECTOR (no logic here)
  const cartItems = useSelector((state) => state.cart.items);

  /* =========================
     MEMOIZED CALCULATIONS
  ========================= */
  const { totalItems, totalPrice } = useMemo(() => {
    const itemsCount = cartItems.length;

    const priceTotal = cartItems.reduce((sum, item) => {
      const price = item?.product?.price || 0;
      const qty = item?.qty || 1;
      return sum + price * qty;
    }, 0);

    return {
      totalItems: itemsCount,
      totalPrice: priceTotal
    };
  }, [cartItems]);

  return (
    <div className="cart-summary">
      <h3>Order Summary</h3>

      <div className="cart-summary-row">
        <span>Items ({totalItems})</span>
        <span>₹{formatPrice(totalPrice)}</span>
      </div>

      <div className="cart-summary-row">
        <span>Delivery</span>
        <span>FREE</span>
      </div>

      <hr />

      <div className="cart-summary-row total">
        <strong>Total</strong>
        <strong>₹{formatPrice(totalPrice)}</strong>
      </div>

      {!hideCheckoutButton && (
        <button
          className="checkout-btn"
          disabled={cartItems.length === 0}
          onClick={() => navigate("/checkout")}
        >
          Proceed to Checkout
        </button>
      )}
    </div>
  );
});

export default CartSummary;
