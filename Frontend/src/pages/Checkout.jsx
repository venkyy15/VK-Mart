// src/pages/Checkout.jsx
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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

  const cartItems = useSelector((state) => state.cart.items);
  const addresses = useSelector((state) => state.address.list || []);
  const selectedAddress = useSelector((state) => state.address.selected);

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "India"
  });

  useEffect(() => {
    dispatch(fetchAddressesAsync());
  }, [dispatch]);

  /* ---------------- ADD ADDRESS ---------------- */
  const handleAddAddress = async (e) => {
    e.preventDefault();

    const res = await dispatch(addAddressAsync(newAddress));

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

  /* ---------------- CART EMPTY ---------------- */
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

  return (
    <div className="checkout-page">
      <h2 className="checkout-title">Checkout</h2>

      {/* ================= ADDRESS SECTION ================= */}
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
          <form className="address-form" onSubmit={handleAddAddress}>
            <h4>Add New Address</h4>

            <div className="address-grid">
              <input
                type="text"
                placeholder="Full Name"
                required
                value={newAddress.name}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, name: e.target.value })
                }
              />

              <input
                type="text"
                placeholder="Phone Number"
                required
                value={newAddress.phone}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, phone: e.target.value })
                }
              />

              <input
                type="text"
                placeholder="Street Address"
                required
                value={newAddress.street}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, street: e.target.value })
                }
              />

              <input
                type="text"
                placeholder="City"
                required
                value={newAddress.city}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, city: e.target.value })
                }
              />

              <input
                type="text"
                placeholder="State"
                required
                value={newAddress.state}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, state: e.target.value })
                }
              />

              <input
                type="text"
                placeholder="Pincode"
                required
                value={newAddress.pincode}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, pincode: e.target.value })
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
            item.product?._id || item._id || `cart-item-${index}`;

          return <CartItem key={key} item={item} />;
        })}
      </section>

      {/* ================= SUMMARY ================= */}
      <CartSummary hideCheckoutButton />

      {/* ================= CONTINUE ================= */}
      <button
        className="continue-payment-btn"
        disabled={!selectedAddress}
        onClick={() => navigate("/payment")}
      >
        Continue to Payment
      </button>
    </div>
  );
}
