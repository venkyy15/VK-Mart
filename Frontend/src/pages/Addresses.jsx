// src/pages/Addresses.jsx

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAddressesAsync,
  addAddressAsync,
  updateAddressAsync,
  selectAddress,
  deleteAddressAsync
} from "../features/address/addressSlice";
import { useNavigate, useParams } from "react-router-dom";

export default function Addresses() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();

  const user = useSelector((state) => state.auth.user);
  const { list, selected, loading } = useSelector(
    (state) => state.address
  );

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null); // 🔥 Track editing
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    country: "India"
  });

  /* ================= SAFETY ================= */
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (userId !== user._id) {
      navigate(`/addresses/${user._id}`, {
        replace: true
      });
    }
  }, [user, userId, navigate]);

  /* ================= FETCH ================= */
  useEffect(() => {
    if (user && userId === user._id) {
      dispatch(fetchAddressesAsync());
    }
  }, [dispatch, user, userId]);

  /* ================= HANDLERS ================= */
  const handleEdit = (addr) => {
    setEditingId(addr._id);
    setForm({
      fullName: addr.fullName,
      phone: addr.phone,
      addressLine1: addr.addressLine1,
      addressLine2: addr.addressLine2,
      city: addr.city,
      state: addr.state,
      pincode: addr.pincode,
      country: addr.country
    });
    setShowForm(true);
    // Scroll to form (optional UX)
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setForm({
      fullName: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pincode: "",
      country: "India"
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.fullName ||
      !form.phone ||
      !form.addressLine1 ||
      !form.city ||
      !form.pincode
    ) {
      alert("Please fill in all required fields");
      return;
    }

    let res;

    if (editingId) {
      // UPDATE
      res = await dispatch(
        updateAddressAsync({ id: editingId, data: form })
      );
    } else {
      // CREATE
      res = await dispatch(addAddressAsync(form));
    }

    if (!res.error) {
      handleCancel();
    } else {
      alert(`Error: ${res.payload || "Something went wrong"}`);
    }
  };

  /* ================= DELIVER ================= */
  const handleDeliverHere = (addr) => {
    dispatch(selectAddress(addr));

    if (!cartItems || cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    navigate(`/checkout/${user._id}`);
  };

  return (
    <div className="addresses-page">
      {/* HEADER */}
      <div className="addresses-header">
        <h2>Your Addresses</h2>

        <button
          className="gold-btn"
          onClick={() => setShowForm(!showForm)}
        >
          + Add New Address
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <form
          className="address-form"
          onSubmit={handleSubmit}
        >
          <h3>{editingId ? "Edit Address" : "Add New Address"}</h3>

          <div className="address-grid">
            <input
              placeholder="Full Name"
              required
              value={form.fullName}
              onChange={(e) =>
                setForm({
                  ...form,
                  fullName: e.target.value
                })
              }
            />

            <input
              placeholder="Phone"
              required
              value={form.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value
                })
              }
            />

            <input
              placeholder="Address Line 1"
              required
              value={form.addressLine1}
              onChange={(e) =>
                setForm({
                  ...form,
                  addressLine1: e.target.value
                })
              }
            />

            <input
              placeholder="Address Line 2 (optional)"
              value={form.addressLine2}
              onChange={(e) =>
                setForm({
                  ...form,
                  addressLine2: e.target.value
                })
              }
            />

            <input
              placeholder="City"
              required
              value={form.city}
              onChange={(e) =>
                setForm({
                  ...form,
                  city: e.target.value
                })
              }
            />

            <input
              placeholder="State"
              required
              value={form.state}
              onChange={(e) =>
                setForm({
                  ...form,
                  state: e.target.value
                })
              }
            />

            <input
              placeholder="Pincode"
              required
              value={form.pincode}
              onChange={(e) =>
                setForm({
                  ...form,
                  pincode: e.target.value
                })
              }
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="gold-btn">
              {editingId ? "Update Address" : "Save Address"}
            </button>

            <button
              type="button"
              className="cancel-btn"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* LIST */}
      {loading && <p>Loading addresses...</p>}

      {!loading && list.length === 0 && (
        <p>No saved addresses yet</p>
      )}

      <div className="address-grid">
        {list.map((addr) => {
          const isDefault =
            selected?._id === addr._id;

          return (
            <div
              key={addr._id}
              className={`address-card ${isDefault ? "default-address" : ""
                }`}
            >
              {isDefault && (
                <span className="default-badge">
                  Default
                </span>
              )}

              <h4>{addr.fullName}</h4>
              <p>{addr.addressLine1}</p>
              {addr.addressLine2 && (
                <p>{addr.addressLine2}</p>
              )}
              <p>
                {addr.city}, {addr.state} –{" "}
                {addr.pincode}
              </p>
              <p>📞 {addr.phone}</p>

              <div className="address-actions">
                {!isDefault && (
                  <button
                    className="outline-btn"
                    onClick={() =>
                      dispatch(selectAddress(addr))
                    }
                  >
                    Make Default
                  </button>
                )}

                <button
                  className="outline-btn"
                  onClick={() =>
                    handleDeliverHere(addr)
                  }
                >
                  Deliver Here
                </button>

                <button
                  className="outline-btn"
                  onClick={() => handleEdit(addr)}
                >
                  Edit
                </button>

                <button
                  className="danger-btn"
                  onClick={() =>
                    dispatch(
                      deleteAddressAsync(addr._id)
                    )
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
