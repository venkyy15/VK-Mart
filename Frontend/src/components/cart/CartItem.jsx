import { memo, useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  removeFromCartAsync,
  updateQtyAsync
} from "../../features/cart/cartSlice";
import { formatPrice } from "../../utils/formatPrice";

const CartItem = memo(function CartItem({ item }) {
  const dispatch = useDispatch();

  if (!item || !item.product) return null;

  const { product, qty } = item;

  const increaseQty = useCallback(() => {
    if (qty < (product.stock || 10)) {
      dispatch(
        updateQtyAsync({
          productId: product._id,
          qty: qty + 1
        })
      );
    }
  }, [dispatch, product._id, qty, product.stock]);

  const decreaseQty = useCallback(() => {
    if (qty > 1) {
      dispatch(
        updateQtyAsync({
          productId: product._id,
          qty: qty - 1
        })
      );
    }
  }, [dispatch, product._id, qty]);

  const handleRemove = useCallback(() => {
    dispatch(removeFromCartAsync(product._id));
  }, [dispatch, product._id]);

  return (
    <div className="cart-item">
      {/* IMAGE */}
      <div className="cart-item-image">
        <img
          src={product.image || "/placeholder.png"}
          alt={product.name}
        />
      </div>

      {/* INFO */}
      <div className="cart-item-info">
        <h4 className="cart-item-title">
          {product.name}
        </h4>

        <p className="cart-item-price">
          ₹{formatPrice(product.price || 0)}
        </p>

        {/* ACTIONS */}
        <div className="cart-actions">
          {/* QTY CONTROLS */}
          <div className="cart-qty-control">
            <button
              className="qty-btn"
              onClick={decreaseQty}
              disabled={qty === 1}
            >
              −
            </button>

            <span className="qty-value">{qty}</span>

            <button
              className="qty-btn"
              onClick={increaseQty}
              disabled={qty >= (product.stock || 10)}
            >
              +
            </button>
          </div>

          <button className="remove-btn" onClick={handleRemove}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
});

export default CartItem;
