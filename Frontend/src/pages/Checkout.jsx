// src/pages/Checkout.jsx

import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import {
  selectAddress,
  addAddressAsync,
  fetchAddressesAsync
} from "../features/address/addressSlice";

import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import EmptyState from "../components/common/EmptyState";

export default function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userId } = useParams();
  const user = useSelector((state) => state.auth.user);

  /* 🔥 MEMOIZED SELECTOR */
  const cartItems = useSelector(
    (state) => state.cart.items.filter((item) => item?.product),
    (a, b) => JSON.stringify(a) === JSON.stringify(b)
  );

  const addresses = useSelector(
    (state) => state.address.list || []
  );

  const selectedAddress = useSelector(
    (state) => state.address.selected
  );

  const [showAddressForm, setShowAddressForm] = useState(false);

  /* 🔥 FORM STATE (UI FRIENDLY) */
  const [newAddress, setNewAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "India"
  });

  /* ========================
     USER SAFETY
  ======================== */
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (userId !== user._id) {
      navigate(`/checkout/${user._id}`, { replace: true });
    }
  }, [user, userId, navigate]);

  /* ========================
     FETCH ADDRESSES
  ======================== */
  useEffect(() => {
    dispatch(fetchAddressesAsync());
  }, [dispatch]);

  /* ========================
     SAVE ADDRESS (🔥 FIXED)
  ======================== */
  const handleAddAddress = async (e) => {
    e.preventDefault();

    // ✅ TRANSFORM UI FIELDS → BACKEND FIELDS
    const payload = {
      fullName: newAddress.name,
      phone: newAddress.phone,
      addressLine1: newAddress.street,
      addressLine2: "",
      city: newAddress.city,
      state: newAddress.state,
      pincode: newAddress.pincode,
      country: newAddress.country
    };

    const res = await dispatch(addAddressAsync(payload));

    if (!res.error) {
      setShowAddressForm(false);
      setNewAddress({
        name: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        pincode: "",
        country: "India"
      });
    }
  };

  /* ========================
     EMPTY CART
  ======================== */
  if (!cartItems || cartItems.length === 0) {
    return (
      <EmptyState
        title="Your cart is empty"
        message="Add items to proceed to checkout"
        actionText="Go to Home"
        onAction={() => navigate("/")}
      />
    );
  }

  /* ========================
     UI
  ======================== */
  return (
    <div className="checkout-page">
      <h2 className="checkout-title">Checkout</h2>

      {/* ================= ADDRESS ================= */}
      <section className="checkout-address">
        <h3>Select Delivery Address</h3>

        {addresses.map((addr, index) => (
          <label
            key={addr._id || `${addr.phone}-${index}`}
            className="address-card"
          >
            <input
              type="radio"
              checked={selectedAddress?._id === addr._id}
              onChange={() => dispatch(selectAddress(addr))}
            />

            <div>
              <strong>{addr.fullName}</strong>

              <p>
                {addr.addressLine1}
                {addr.addressLine2 && `, ${addr.addressLine2}`}
              </p>

              <p>
                {addr.city}, {addr.state} – {addr.pincode}
              </p>

              <p>📞 {addr.phone}</p>
            </div>
          </label>
        ))}

        {!showAddressForm ? (
          <button
            type="button"
            className="gold-outline-btn"
            onClick={() => setShowAddressForm(true)}
          >
            + Add New Address
          </button>
        ) : (
          <form
            className="address-form"
            onSubmit={handleAddAddress}
          >
            <h4>Add New Address</h4>

            <div className="address-grid">
              <input
                type="text"
                placeholder="Full Name"
                required
                value={newAddress.name}
                onChange={(e) =>
                  setNewAddress({
                    ...newAddress,
                    name: e.target.value
                  })
                }
              />

              <input
                type="text"
                placeholder="Phone Number"
                required
                value={newAddress.phone}
                onChange={(e) =>
                  setNewAddress({
                    ...newAddress,
                    phone: e.target.value
                  })
                }
              />

              <input
                type="text"
                placeholder="Street Address"
                required
                value={newAddress.street}
                onChange={(e) =>
                  setNewAddress({
                    ...newAddress,
                    street: e.target.value
                  })
                }
              />

              <input
                type="text"
                placeholder="City"
                required
                value={newAddress.city}
                onChange={(e) =>
                  setNewAddress({
                    ...newAddress,
                    city: e.target.value
                  })
                }
              />

              <input
                type="text"
                placeholder="State"
                required
                value={newAddress.state}
                onChange={(e) =>
                  setNewAddress({
                    ...newAddress,
                    state: e.target.value
                  })
                }
              />

              <input
                type="text"
                placeholder="Pincode"
                required
                value={newAddress.pincode}
                onChange={(e) =>
                  setNewAddress({
                    ...newAddress,
                    pincode: e.target.value
                  })
                }
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="gold-btn">
                Save Address
              </button>

              <button
                type="button"
                className="cancel-btn"
                onClick={() => setShowAddressForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </section>

      {/* ================= ITEMS ================= */}
      <section className="checkout-cart">
        <h3>Items</h3>

        {cartItems.map((item, index) => {
          const key =
            item.product?._id ||
            item._id ||
            `cart-item-${index}`;

          return <CartItem key={key} item={item} />;
        })}
      </section>

      {/* ================= SUMMARY ================= */}
      <CartSummary hideCheckoutButton />

      {/* ================= CONTINUE ================= */}
      <button
        className="continue-payment-btn"
        disabled={!selectedAddress}
        onClick={() =>
          navigate(`/payment/${user._id}`)
        }
      >
        Continue to Payment
      </button>
    </div>
  );
}
