// src/pages/Payment.jsx

import { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { placeOrderAsync } from "../features/order/orderSlice";
import { clearCart } from "../features/cart/cartSlice";
import { useNavigate, useParams } from "react-router-dom";
import { formatPrice } from "../utils/formatPrice";

export default function Payment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* 🔥 USER PARAM */
  const { userId } = useParams();

  /* 🔥 STATE */
  const { user } = useSelector((state) => state.auth);
  /* 🔥 MEMOIZED SELECTOR */
  const cartItems = useSelector(
    (state) => state.cart.items.filter((item) => item?.product),
    (a, b) => JSON.stringify(a) === JSON.stringify(b) // Simple deep comparison for now or better use createSelector inside slice
  );
  const selectedAddress = useSelector((state) => state.address.selected);

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [upiId, setUpiId] = useState("");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: ""
  });
  const [loading, setLoading] = useState(false);

  /* ========================
     SAFETY: USER CHECK
  ======================== */
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (userId !== user._id) {
      navigate(`/payment/${user._id}`, { replace: true });
    }
  }, [user, userId, navigate]);

  /* ===============================
     ORDER SUMMARY CALCULATION
  ================================ */
  const totalItems = cartItems.length;
  const totalAmount = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      const price = item?.product?.price || 0;
      const qty = item?.qty || 1;
      return sum + price * qty;
    }, 0);
  }, [cartItems]);

  /* ===============================
     PLACE ORDER
  ================================ */
  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      alert("Please go back and select a delivery address.");
      return;
    }

    if (!cartItems || cartItems.length === 0) {
      alert("Cart is empty");
      return;
    }

    if (paymentMethod === "UPI" && !upiId.trim()) {
      alert("Please enter a valid UPI ID (e.g. name@upi)");
      return;
    }

    if (paymentMethod === "CARD") {
      const { number, name, expiry, cvv } = cardDetails;
      if (!number || !name || !expiry || !cvv) {
        alert("Please fill in all card details.");
        return;
      }
    }

    const shippingPayload = {
      fullName: selectedAddress.fullName,
      phone: selectedAddress.phone,
      addressLine1:
        selectedAddress.addressLine1 || selectedAddress.address || "",
      addressLine2: selectedAddress.addressLine2 || "",
      city: selectedAddress.city,
      state: selectedAddress.state,
      pincode: selectedAddress.pincode,
      country: selectedAddress.country || "India"
    };

    try {
      setLoading(true);

      const result = await dispatch(
        placeOrderAsync({
          shippingAddress: shippingPayload,
          paymentMethod,
          totalAmount
        })
      );

      setLoading(false);

      if (placeOrderAsync.fulfilled.match(result)) {
        dispatch(clearCart());
        navigate(`/order-success/${user._id}`);
      } else {
        alert(result.payload || "Order creation failed. Please try again.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Payment Error:", error);
      alert("Processing failed. Please try again.");
    }
  };

  /* ===============================
     RENDER
  ================================ */
  return (
    <div className="payment-page">
      <div className="payment-grid-container">

        {/* LEFT: PAYMENT OPTIONS */}
        <div className="payment-left-section">
          <h2 className="section-title">Select Payment Method</h2>

          <div className="payment-methods-list">

            {/* CASH ON DELIVERY */}
            <label className={`payment-option-card ${paymentMethod === 'COD' ? 'selected' : ''}`}>
              <div className="payment-radio">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "COD"}
                  onChange={() => setPaymentMethod("COD")}
                />
              </div>
              <div className="payment-info">
                <span className="method-name">Cash on Delivery</span>
                <span className="method-desc">Pay when you receive the order</span>
              </div>
            </label>

            {/* UPI */}
            <label className={`payment-option-card ${paymentMethod === 'UPI' ? 'selected' : ''}`}>
              <div className="payment-radio">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "UPI"}
                  onChange={() => setPaymentMethod("UPI")}
                />
              </div>
              <div className="payment-info">
                <span className="method-name">UPI (GPay, PhonePe, Paytm)</span>
                <span className="method-desc">Instant payment via UPI ID</span>
              </div>
            </label>

            {/* UPI INPUT */}
            {paymentMethod === "UPI" && (
              <div className="payment-details-form">
                <input
                  type="text"
                  placeholder="Enter UPI ID (e.g. number@axl)"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="input-field"
                />
              </div>
            )}

            {/* CARD */}
            <label className={`payment-option-card ${paymentMethod === 'CARD' ? 'selected' : ''}`}>
              <div className="payment-radio">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "CARD"}
                  onChange={() => setPaymentMethod("CARD")}
                />
              </div>
              <div className="payment-info">
                <span className="method-name">Credit / Debit Card</span>
                <span className="method-desc">Secure transaction</span>
              </div>
            </label>

            {/* CARD INPUTS */}
            {paymentMethod === "CARD" && (
              <div className="payment-details-form card-form">
                <input
                  type="text"
                  placeholder="Card Number"
                  value={cardDetails.number}
                  onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                  className="input-field card-number"
                  maxLength="19"
                />
                <input
                  type="text"
                  placeholder="Name on Card"
                  value={cardDetails.name}
                  onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                  className="input-field"
                />
                <div className="card-row">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={cardDetails.expiry}
                    onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                    className="input-field"
                    maxLength="5"
                  />
                  <input
                    type="password"
                    placeholder="CVV"
                    value={cardDetails.cvv}
                    onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                    className="input-field"
                    maxLength="3"
                  />
                </div>
              </div>
            )}

          </div>
        </div>

        {/* RIGHT: ORDER SUMMARY */}
        <div className="payment-right-section">
          <div className="order-summary-card">
            <h3>Order Summary</h3>

            <div className="summary-row">
              <span>Items ({totalItems})</span>
              <span>₹{formatPrice(totalAmount)}</span>
            </div>

            <div className="summary-row">
              <span>Delivery</span>
              <span className="free-text">FREE</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-total-row">
              <span>Order Total:</span>
              <span className="total-amount">₹{formatPrice(totalAmount)}</span>
            </div>

            <button
              className="confirm-order-btn"
              onClick={handlePlaceOrder}
              disabled={loading}
            >
              {loading ? "Processing..." : `Pay ₹${formatPrice(totalAmount)}`}
            </button>

            <div className="security-badges">
              <span>🔒 Secure Checkout</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
