import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersAsync } from "../features/order/orderSlice";

export default function Orders() {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrdersAsync());
  }, [dispatch]);

  /* ========================
     STATES
  ======================== */
  if (loading) {
    return <p style={{ padding: 20 }}>Loading orders...</p>;
  }

  if (error) {
    return (
      <div style={{ padding: 20, color: "red" }}>
        Failed to load orders: {error}
      </div>
    );
  }

  if (!list || list.length === 0) {
    return (
      <div className="empty-orders" style={{ padding: 20 }}>
        <h3>No orders yet</h3>
        <p>Place an order to see it here</p>
      </div>
    );
  }

  /* ========================
     UI
  ======================== */
  return (
    <div className="orders-page" style={{ padding: 20 }}>
      <h2 style={{ marginBottom: 20 }}>Your Orders</h2>

      {list.map((order) => {
        /* 🔐 SAFE NORMALIZATION */
        const orderItems = order.items || order.orderItems || [];
        const total =
          order.totalAmount !== undefined
            ? order.totalAmount
            : order.totalPrice;

        const address = order.shippingAddress;

        return (
          <div
            key={order._id}
            className="order-card"
            style={{
              border: "1px solid #d6efe4",
              borderRadius: 12,
              padding: 16,
              marginBottom: 20,
              background: "#ffffff"
            }}
          >
            {/* ===== ORDER HEADER ===== */}
            <div style={{ marginBottom: 10 }}>
              <p>
                <strong>Order ID:</strong> {order._id}
              </p>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
              <p>
                <strong>Payment:</strong> {order.paymentMethod}
              </p>
              <p>
                <strong>Total:</strong> ₹{total}
              </p>
            </div>

            {/* ===== ITEMS ===== */}
            <div style={{ marginTop: 14 }}>
              <strong>Items:</strong>

              {orderItems.length === 0 ? (
                <p style={{ marginTop: 6, color: "#777" }}>
                  No items found
                </p>
              ) : (
                orderItems.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      gap: 12,
                      marginTop: 10,
                      padding: 10,
                      borderRadius: 8,
                      border: "1px solid #e5e7eb",
                      background: "#f9fffc"
                    }}
                  >
                    {/* IMAGE */}
                    <div
                      style={{
                        width: 70,
                        height: 70,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <img
                        src={item.product?.image || "/placeholder.png"}
                        alt={item.product?.name}
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100%",
                          objectFit: "contain"
                        }}
                      />
                    </div>

                    {/* DETAILS */}
                    <div style={{ flex: 1 }}>
                      <p style={{ fontWeight: 600 }}>
                        {item.product?.name || "Product"}
                      </p>
                      <p style={{ fontSize: 14 }}>
                        Qty: {item.qty}
                      </p>
                      <p style={{ fontSize: 14 }}>
                        Price: ₹{item.price}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* ===== ADDRESS ===== */}
            {address && (
              <div style={{ marginTop: 16 }}>
                <strong>Delivery Address:</strong>
                <p style={{ fontSize: 14, marginTop: 4 }}>
                  {address.fullName}, {address.phone}
                </p>
                <p style={{ fontSize: 14 }}>
                  {address.addressLine1}
                  {address.addressLine2
                    ? `, ${address.addressLine2}`
                    : ""}
                </p>
                <p style={{ fontSize: 14 }}>
                  {address.city}, {address.state} – {address.pincode}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
