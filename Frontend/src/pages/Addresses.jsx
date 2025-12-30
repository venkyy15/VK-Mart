// src/pages/Addresses.jsx

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAddressesAsync,
  selectAddress,
  deleteAddressAsync
} from "../features/address/addressSlice";
import { useNavigate, useParams } from "react-router-dom";

export default function Addresses() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* 🔥 USER ID FROM URL */
  const { userId } = useParams();

  /* 🔥 AUTH USER */
  const user = useSelector((state) => state.auth.user);

  const { list, selected, loading } = useSelector(
    (state) => state.address
  );

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  /* ========================
     SAFETY CHECK
  ======================== */
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

  /* ========================
     FETCH ADDRESSES
  ======================== */
  useEffect(() => {
    if (user && userId === user._id) {
      dispatch(fetchAddressesAsync());
    }
  }, [dispatch, user, userId]);

  /* ========================
     ACTIONS
  ======================== */
  const handleMakeDefault = (addr) => {
    dispatch(selectAddress(addr));
  };

  const handleDeliverHere = (addr) => {
    dispatch(selectAddress(addr));

    if (!cartItems || cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    navigate(`/checkout/${user._id}`);
  };

  /* ========================
     UI
  ======================== */
  return (
    <div className="addresses-page">
      <div className="addresses-header">
        <h2>Your Addresses</h2>

        <button
          className="gold-btn"
          onClick={() =>
            navigate(`/checkout/${user._id}`)
          }
        >
          + Add New Address
        </button>
      </div>

      {loading && <p>Loading addresses...</p>}

      {!loading && list.length === 0 && (
        <p className="empty-text">
          No saved addresses yet
        </p>
      )}

      <div className="address-grid">
        {list.map((addr) => {
          const isDefault =
            selected?._id === addr._id;

          return (
            <div
              key={addr._id}
              className={`address-card ${
                isDefault ? "default-address" : ""
              }`}
            >
              {isDefault && (
                <span className="default-badge">
                  Default
                </span>
              )}

              {/* FULL NAME */}
              <h4>{addr.fullName}</h4>

              {/* ADDRESS */}
              <p>{addr.addressLine1}</p>
              {addr.addressLine2 && (
                <p>{addr.addressLine2}</p>
              )}

              {/* CITY / STATE / PIN */}
              <p>
                {addr.city}, {addr.state} –{" "}
                {addr.pincode}
              </p>

              {/* PHONE */}
              <p>📞 {addr.phone}</p>

              <div className="address-actions">
                {!isDefault && (
                  <button
                    className="outline-btn"
                    onClick={() =>
                      handleMakeDefault(addr)
                    }
                  >
                    Make this default
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
