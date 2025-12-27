import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersAsync } from "../features/order/orderSlice";

export default function Orders() {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrdersAsync());
  }, [dispatch]);

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

  return (
    <div className="orders-page" style={{ padding: 20 }}>
      <h2>Your Orders</h2>

      {list.map((order) => {
        // ✅ SAFE NORMALIZATION (NO ERROR EVER)
        const orderItems = order.items || order.orderItems || [];
        const total =
          order.totalAmount !== undefined
            ? order.totalAmount
            : order.totalPrice;

        return (
          <div
            key={order._id}
            className="order-card"
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: 16,
              marginBottom: 16,
              background: "#fff"
            }}
          >
            <p>
              <strong>Order ID:</strong> {order._id}
            </p>

            <p>
              <strong>Payment:</strong> {order.paymentMethod}
            </p>

            <p>
              <strong>Total:</strong> ₹{total}
            </p>

            <p>
              <strong>Status:</strong> {order.status || "PLACED"}
            </p>

            <div className="order-items" style={{ marginTop: 10 }}>
              <strong>Items:</strong>

              {orderItems.length === 0 ? (
                <p style={{ marginLeft: 10, color: "#777" }}>
                  No items found
                </p>
              ) : (
                orderItems.map((item, idx) => (
                  <p key={idx} style={{ marginLeft: 10 }}>
                    {item.product?.name || "Product"} × {item.qty}
                  </p>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
