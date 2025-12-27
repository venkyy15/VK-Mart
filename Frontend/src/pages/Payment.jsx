import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { placeOrderAsync } from "../features/order/orderSlice";
import { clearCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

export default function Payment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);
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
      alert("Please select delivery address");
      return;
    }

    if (!cartItems || cartItems.length === 0) {
      alert("Cart is empty");
      return;
    }

    if (paymentMethod === "UPI" && !upiId.trim()) {
      alert("Enter valid UPI ID");
      return;
    }

    if (paymentMethod === "CARD") {
      const { number, name, expiry, cvv } = cardDetails;
      if (!number || !name || !expiry || !cvv) {
        alert("Fill all card details");
        return;
      }
    }

    const shippingPayload = {
      fullName: selectedAddress.fullName,
      phone: selectedAddress.phone,
      addressLine1:
        selectedAddress.addressLine1 ||
        selectedAddress.address ||
        "",
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
          totalAmount: totalAmount // ✅ BACKEND EXPECTS THIS
        })
      );

      setLoading(false);

      if (placeOrderAsync.fulfilled.match(result)) {
        dispatch(clearCart());
        navigate("/order-success");
      } else {
        alert(result.payload || "Order failed");
      }
    } catch (error) {
      setLoading(false);
      alert("Something went wrong");
    }
  };

  return (
    <div className="payment-page">
      <div className="payment-container">

        {/* LEFT */}
        <div className="payment-methods">
          <h2>Select Payment Method</h2>

          <label>
            <input
              type="radio"
              checked={paymentMethod === "COD"}
              onChange={() => setPaymentMethod("COD")}
            />
            Cash on Delivery
          </label>

          <label>
            <input
              type="radio"
              checked={paymentMethod === "UPI"}
              onChange={() => setPaymentMethod("UPI")}
            />
            Other UPI Apps
          </label>

          {paymentMethod === "UPI" && (
            <input
              placeholder="mobile@upi"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
          )}

          <label>
            <input
              type="radio"
              checked={paymentMethod === "CARD"}
              onChange={() => setPaymentMethod("CARD")}
            />
            Credit / Debit Card
          </label>
        </div>

        {/* RIGHT */}
        <div className="payment-summary">
          <h3>Order Summary</h3>
          <p>Items ({totalItems}): ₹{totalAmount.toLocaleString("en-IN")}</p>
          <p>Delivery: FREE</p>
          <hr />
          <h4>Total: ₹{totalAmount.toLocaleString("en-IN")}</h4>
          
          <button
            onClick={handlePlaceOrder}
            disabled={loading}
          >
            {loading ? "Processing..." : "Use this payment method"}
          </button>
        </div>

      </div>
    </div>
  );
}
