import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addToCartAsync } from "../../features/cart/cartSlice";
import { formatPrice } from "../../utils/formatPrice";

export default function ProductDetails({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [activeTab, setActiveTab] = useState("description");

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
      {/* ===============================
          TOP SECTION
      ================================ */}
      <div className="product-details-container">
        {/* IMAGE */}
        <div className="product-image-box">
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
          />
        </div>

        {/* BASIC INFO */}
        <div className="product-info-box">
          <h1 className="product-title">{product.name}</h1>

          <p className="product-price">
            ₹{formatPrice(product.price)}
          </p>

          <p className="product-short-desc">
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

      {/* ===============================
          TABS
      ================================ */}
      <div className="product-tabs">
        <button
          className={activeTab === "description" ? "active" : ""}
          onClick={() => setActiveTab("description")}
        >
          Description
        </button>

        <button
          className={activeTab === "highlights" ? "active" : ""}
          onClick={() => setActiveTab("highlights")}
        >
          Highlights
        </button>

        <button
          className={activeTab === "specs" ? "active" : ""}
          onClick={() => setActiveTab("specs")}
        >
          Specifications
        </button>

        <button
          className={activeTab === "reviews" ? "active" : ""}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
      </div>

      {/* ===============================
          TAB CONTENT
      ================================ */}
      <div className="product-tab-content">
        {/* DESCRIPTION */}
        {activeTab === "description" && (
          <div>
            <h3>Product Description</h3>
            <p>
              {product.description ||
                "No detailed description available."}
            </p>
          </div>
        )}

        {/* HIGHLIGHTS */}
        {activeTab === "highlights" && (
          <div>
            <h3>Highlights</h3>
            <ul className="product-highlights">
              {(product.highlights && product.highlights.length > 0) ? (
                product.highlights.map((item, index) => (
                  <li key={index}>{item}</li>
                ))
              ) : (
                <>
                  <li>Premium build quality</li>
                  <li>High performance processor</li>
                  <li>Long lasting battery</li>
                  <li>Excellent camera quality</li>
                </>
              )}
            </ul>
          </div>
        )}

        {/* SPECIFICATIONS */}
        {activeTab === "specs" && (
          <div>
            <h3>Specifications</h3>
            <table className="product-specs">
              <tbody>
                <tr>
                  <td>Category</td>
                  <td>{product.category || "—"}</td>
                </tr>
                <tr>
                  <td>Price</td>
                  <td>₹{formatPrice(product.price)}</td>
                </tr>
                <tr>
                  <td>Stock</td>
                  <td>{product.stock ?? "Available"}</td>
                </tr>
                <tr>
                  <td>Brand</td>
                  <td>{product.brand || "VK Mart"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* REVIEWS */}
        {activeTab === "reviews" && (
          <div>
            <h3>Customer Reviews</h3>

            {(product.reviews && product.reviews.length > 0) ? (
              product.reviews.map((review, index) => (
                <div key={index} className="review-item">
                  <strong>{review.name}</strong>
                  <span> ⭐ {review.rating}/5</span>
                  <p>{review.comment}</p>
                </div>
              ))
            ) : (
              <p>No reviews yet. Be the first to review this product.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
