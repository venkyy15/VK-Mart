// src/components/product/ProductCard.jsx

import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  // ✅ get logged-in user
  const user = useSelector((state) => state.auth.user);
  const userId = user?._id;

  if (!product) return null;

  const productLink = userId
    ? `/${userId}/product/${product._id}`
    : "/login";

  return (
    <div className="product-card">
      {/* IMAGE (CLICKABLE) */}
      <Link to={productLink} className="product-image-link">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
      </Link>

      {/* TITLE (CLICKABLE) */}
      <Link to={productLink} className="product-title">
        {product.name}
      </Link>

      {/* PRICE */}
      <p className="product-price">
        ₹{product.price?.toLocaleString("en-IN")}
      </p>

      {/* DELIVERY */}
      <p className="product-delivery">
        FREE Delivery by <strong>Tomorrow</strong>
      </p>

      {/* ACTIONS */}
      <button
        className="add-to-cart-btn"
        onClick={() => navigate(`/cart/${userId}`)}
      >
        Add to Cart
      </button>

      <button
        className="buy-now-btn"
        onClick={() => navigate(`/checkout/${userId}`)}
      >
        Buy Now
      </button>
    </div>
  );
}
