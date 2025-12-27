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

  const handleQtyChange = useCallback(
    (e) => {
      dispatch(
        updateQtyAsync({
          productId: product._id,
          qty: Number(e.target.value)
        })
      );
    },
    [dispatch, product._id]
  );

  const handleRemove = useCallback(() => {
    dispatch(removeFromCartAsync(product._id));
  }, [dispatch, product._id]);

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img
          src={product.image || "/placeholder.png"}
          alt={product.name}
        />
      </div>

      <div className="cart-item-info">
        <h4 className="cart-item-title">{product.name}</h4>

        <p className="cart-item-price">
          ₹{formatPrice(product.price || 0)}
        </p>

        <div className="cart-actions">
          <select
            className="qty-select"
            value={qty}
            onChange={handleQtyChange}
          >
            {[1, 2, 3, 4, 5].map((q) => (
              <option key={q} value={q}>
                Qty: {q}
              </option>
            ))}
          </select>

          <button className="remove-btn" onClick={handleRemove}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
});

export default CartItem;
