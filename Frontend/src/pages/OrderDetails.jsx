// src/pages/OrderDetails.jsx

import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function OrderDetails() {
  /* 🔥 READ PARAMS FROM URL */
  const { userId, orderId } = useParams();

  /* 🔥 GET ORDERS FROM REDUX */
  const { list } = useSelector((state) => state.orders);

  /* 🔍 FIND ORDER BY orderId */
  const order = list?.find(
    (o) => o._id === orderId
  );

  /* ========================
     ORDER NOT FOUND
  ======================== */
  if (!order) {
    return (
      <div style={{ padding: 20 }}>
        <h3>Order not found</h3>

        <Link
          to={`/orders/${userId}`}
          style={{ marginTop: 10, display: "inline-block" }}
        >
          ← Back to orders
        </Link>
      </div>
    );
  }

  /* ========================
     DATA NORMALIZATION
  ======================== */
  const items = order.items || [];
  const total =
    order.totalAmount !== undefined
      ? order.totalAmount
      : order.totalPrice;

  const address = order.shippingAddress;

  /* ========================
     UI
  ======================== */
  return (
    <div style={{ padding: 20 }}>
      {/* 🔙 BACK LINK */}
      <Link
        to={`/orders/${userId}`}
        style={{
          display: "inline-block",
          marginBottom: 16,
          color: "#0f766e",
          fontWeight: 600,
          textDecoration: "none"
        }}
      >
        ← Back to orders
      </Link>

      <h2>Order Details</h2>

      <div
        style={{
          marginTop: 16,
          padding: 16,
          border: "1px solid #d6efe4",
          borderRadius: 12,
          background: "#ffffff"
        }}
      >
        {/* ===== ORDER INFO ===== */}
        <p>
          <strong>Order ID:</strong>{" "}
          {order._id}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          {order.status}
        </p>

        <p>
          <strong>Payment:</strong>{" "}
          {order.paymentMethod}
        </p>

        <p>
          <strong>Total:</strong> ₹{total}
        </p>

        <hr style={{ margin: "16px 0" }} />

        {/* ===== ITEMS ===== */}
        <h4>Items</h4>

        {items.length === 0 ? (
          <p style={{ color: "#777" }}>
            No items found
          </p>
        ) : (
          items.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                gap: 12,
                padding: 10,
                marginTop: 10,
                border: "1px solid #e5e7eb",
                borderRadius: 8,
                background: "#f9fffc"
              }}
            >
              {/* IMAGE */}
              <img
                src={
                  item.product?.image ||
                  "/placeholder.png"
                }
                alt={
                  item.product?.name ||
                  "Product"
                }
                style={{
                  width: 70,
                  height: 70,
                  objectFit: "contain"
                }}
              />

              {/* DETAILS */}
              <div>
                <p style={{ fontWeight: 600 }}>
                  {item.product?.name ||
                    "Product"}
                </p>

                <p>Qty: {item.qty}</p>
                <p>Price: ₹{item.price}</p>
              </div>
            </div>
          ))
        )}

        <hr style={{ margin: "16px 0" }} />

        {/* ===== ADDRESS ===== */}
        {address && (
          <>
            <h4>Delivery Address</h4>

            <p>{address.fullName}</p>
            <p>{address.phone}</p>

            <p>
              {address.addressLine1}
              {address.addressLine2
                ? `, ${address.addressLine2}`
                : ""}
            </p>

            <p>
              {address.city},{" "}
              {address.state} –{" "}
              {address.pincode}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
