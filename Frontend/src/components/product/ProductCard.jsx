import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/formatPrice";

export default function ProductCard({ product }) {
  const { user } = useSelector((state) => state.auth.user);

  return (
    <div className="product-card">
      {/* IMAGE + TITLE */}
      <Link to={`/${user?._id || "guest"}/product/${product._id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />

        <h3 className="product-title">
          {product.name}
        </h3>
      </Link>

      <p className="product-price">
        ₹{formatPrice(product.price)}
      </p>

      <p className="delivery-text">
        FREE Delivery by <strong>Tomorrow</strong>
      </p>
    </div>
  );
}
