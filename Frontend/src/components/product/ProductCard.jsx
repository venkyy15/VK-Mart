// src/components/product/ProductCard.jsx

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAsync } from "../../features/cart/cartSlice";
import { formatPrice } from "../../utils/formatPrice";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  if (!product) return null;

  const handleAddToCart = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      await dispatch(
        addToCartAsync({
          productId: product._id,
          qty: 1
        })
      ).unwrap();
    } catch (error) {
      console.error("Add to cart failed:", error);
    }
  };

  const handleBuyNow = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      await dispatch(
        addToCartAsync({
          productId: product._id,
          qty: 1
        })
      ).unwrap();

      navigate("/checkout");
    } catch (error) {
      console.error("Buy now failed:", error);
    }
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
      </Link>

      <Link
        to={`/product/${product._id}`}
        className="product-title"
      >
        {product.name}
      </Link>

      <div className="product-price">
        ₹{formatPrice(product.price)}
      </div>

      <div className="product-delivery">
        FREE Delivery by <strong>Tomorrow</strong>
      </div>

      <button
        className="add-to-cart-btn"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>

      <button
        className="buy-now-btn"
        onClick={handleBuyNow}
      >
        Buy Now
      </button>
    </div>
  );
}
