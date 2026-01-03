import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addToCartAsync } from "../../features/cart/cartSlice";
import { formatPrice } from "../../utils/formatPrice";

export default function ProductDetails({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [activeTab, setActiveTab] = useState("description"); // ✅ RESTORED

  const handleAddToCart = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      const res = await dispatch(
        addToCartAsync({
          productId: product._id,
          qty: 1
        })
      ).unwrap();

      if (res) {
        alert("Product added to cart!");
      }
    } catch (err) {
      console.error("Add to cart error:", err);
      // 🔥 If 401, they might be logged out by interceptor
      if (!localStorage.getItem("token")) {
        navigate("/login");
      }
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

      navigate(`/cart/${user._id}`);
    } catch (err) {
      console.error("Buy now error:", err);
      if (!localStorage.getItem("token")) {
        navigate("/login");
      }
    }
  };



  /* ===============================
     CATEGORY-WISE SPEC LABELS
  ================================ */
  const specLabels = {
    mobiles: {
      display: "Display",
      processor: "Processor",
      camera: "Camera",
      battery: "Battery",
      charging: "Charging",
      ram: "RAM",
      storage: "Storage",
      os: "Operating System"
    },
    fashion: {
      fabric: "Fabric",
      fit: "Fit",
      sleeve: "Sleeve",
      pattern: "Pattern",
      washCare: "Wash Care"
    },
    electronics: {
      display: "Display",
      resolution: "Resolution",
      audio: "Audio",
      ports: "Ports",
      smartTv: "Smart TV"
    },
    appliances: {
      power: "Power",
      jars: "Jars",
      material: "Material",
      warranty: "Warranty"
    },
    beauty: {
      skinType: "Skin Type",
      quantity: "Quantity",
      formulation: "Formulation",
      usage: "Usage"
    },
    home: {
      material: "Material",
      seating: "Seating Capacity",
      finish: "Finish",
      shape: "Shape"
    }
  };

  const labels = specLabels[product.category] || {};

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

          <div className="product-actions">
            {/* NO QTY CONTROL HERE (Moved to Cart) */}

            <div className="action-buttons">
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
          </div>
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
            <p>{product.description}</p>
          </div>
        )}

        {/* HIGHLIGHTS */}
        {activeTab === "highlights" && (
          <div>
            <h3>Highlights</h3>
            {product.highlights && product.highlights.length > 0 ? (
              <ul className="product-highlights">
                {product.highlights.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>No highlights available.</p>
            )}
          </div>
        )}

        {/* SPECIFICATIONS */}
        {activeTab === "specs" && (
          <div>
            <h3>Specifications</h3>

            {product.specifications &&
              Object.keys(product.specifications).length > 0 ? (
              <table className="product-specs">
                <tbody>
                  {Object.entries(product.specifications)
                    .filter(([_, value]) => value)
                    .map(([key, value]) => (
                      <tr key={key}>
                        <td>{labels[key] || key}</td>
                        <td>{value}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            ) : (
              <p>No specifications available.</p>
            )}
          </div>
        )}

        {/* REVIEWS */}
        {activeTab === "reviews" && (
          <div>
            <h3>Customer Reviews</h3>

            {product.reviews && product.reviews.length > 0 ? (
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
