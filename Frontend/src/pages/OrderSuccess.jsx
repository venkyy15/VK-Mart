import { useNavigate } from "react-router-dom";

export default function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div className="order-success-page">
      <div className="order-success-card">
        <h2>Thank you for your order!</h2>

        <p>
          Your order has been placed successfully.
          <br />
          You will receive an update once it is shipped.
        </p>

        <div className="order-success-actions">
          <button
            className="outline-btn"
            onClick={() => navigate("/orders")}
          >
            View Orders
          </button>

          <button
            className="gold-btn"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
