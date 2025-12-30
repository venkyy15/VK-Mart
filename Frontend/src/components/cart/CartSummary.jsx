// src/components/cart/CartSummary.jsx
import { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../utils/formatPrice";

const CartSummary = memo(function CartSummary({
  hideCheckoutButton = false
}) {
  const navigate = useNavigate();

  // 🔥 CART ITEMS
  const cartItems = useSelector((state) => state.cart.items);

  // 🔥 AUTH USER (FOR userId)
  const user = useSelector((state) => state.auth.user);

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

  /* =========================
     HANDLE CHECKOUT
  ========================= */
  const handleCheckout = () => {
    if (!user?._id) {
      // safety fallback (should not happen due to ProtectedRoute)
      navigate("/login");
      return;
    }

    // ✅ CORRECT PARAM ROUTE
    navigate(`/checkout/${user._id}`);
  };

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
          onClick={handleCheckout}
        >
          Proceed to Checkout
        </button>
      )}
    </div>
  );
});

export default CartSummary;
