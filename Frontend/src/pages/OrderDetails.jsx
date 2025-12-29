import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function OrderDetails() {
  const { id } = useParams(); // 🔥 URL PARAM
  const { list } = useSelector((state) => state.orders);

  // 🔍 Find order from redux store
  const order = list?.find((o) => o._id === id);

  if (!order) {
    return (
      <div style={{ padding: 20 }}>
        <h3>Order not found</h3>
        <Link to="/orders">← Back to orders</Link>
      </div>
    );
  }

  const items = order.items || [];
  const total = order.totalAmount;

  return (
    <div style={{ padding: 20 }}>
      <Link to="/orders" style={{ display: "inline-block", marginBottom: 16 }}>
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
        <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Payment:</strong> {order.paymentMethod}</p>
        <p><strong>Total:</strong> ₹{total}</p>

        <hr style={{ margin: "16px 0" }} />

        <h4>Items</h4>

        {items.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              gap: 12,
              padding: 10,
              marginTop: 10,
              border: "1px solid #e5e7eb",
              borderRadius: 8
            }}
          >
            <img
              src={item.product?.image || "/placeholder.png"}
              alt={item.product?.name}
              style={{ width: 70, height: 70, objectFit: "contain" }}
            />

            <div>
              <p style={{ fontWeight: 600 }}>
                {item.product?.name}
              </p>
              <p>Qty: {item.qty}</p>
              <p>Price: ₹{item.price}</p>
            </div>
          </div>
        ))}

        <hr style={{ margin: "16px 0" }} />

        <h4>Delivery Address</h4>
        <p>{order.shippingAddress.fullName}</p>
        <p>{order.shippingAddress.phone}</p>
        <p>
          {order.shippingAddress.addressLine1},{" "}
          {order.shippingAddress.city},{" "}
          {order.shippingAddress.state} –{" "}
          {order.shippingAddress.pincode}
        </p>
      </div>
    </div>
  );
}
