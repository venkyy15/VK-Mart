import { useDispatch, useSelector } from "react-redux";
import { addToCartAsync } from "../../features/cart/cartSlice";
import { formatPrice } from "../../utils/formatPrice";
import { useNavigate } from "react-router-dom";

export default function ProductDetails({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  if (!product) return null;

  const handleAddToCart = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    await dispatch(
      addToCartAsync({
        productId: product._id,
        qty: 1
      })
    );
  };

  return (
    <div className="product-details-page">
      <div className="product-details-container">
        {/* IMAGE */}
        <div className="product-image-box">
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
          />
        </div>

        {/* INFO */}
        <div className="product-info-box">
          <h1 className="product-title">{product.name}</h1>

          <p className="product-price">
            ₹{formatPrice(product.price)}
          </p>

          <p className="product-description">
            {product.description}
          </p>

          <button
            className="add-to-cart-btn"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
