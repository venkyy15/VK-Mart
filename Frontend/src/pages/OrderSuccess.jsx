// src/pages/OrderSuccess.jsx

import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function OrderSuccess() {
  const navigate = useNavigate();

  /* 🔥 USER PARAM */
  const { userId } = useParams();

  /* 🔥 AUTH USER */
  const user = useSelector((state) => state.auth.user);

  /* ========================
     SAFETY CHECK
  ======================== */
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (userId !== user._id) {
      navigate(`/order-success/${user._id}`, {
        replace: true
      });
    }
  }, [user, userId, navigate]);

  /* ========================
     UI
  ======================== */
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
            onClick={() =>
              navigate(`/orders/${user._id}`)
            }
          >
            View Orders
          </button>

          <button
            className="gold-btn"
            onClick={() =>
              navigate(`/${user._id}`)
            }
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
