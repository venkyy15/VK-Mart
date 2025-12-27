// src/pages/Product.jsx

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getProductById,
  clearSelectedProduct
} from "../features/product/productSlice";

import ProductDetails from "../components/product/ProductDetails";
import Loader from "../components/common/Loader";
import EmptyState from "../components/common/EmptyState";

export default function Product() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { selected, loading, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (id) {
      dispatch(getProductById(id));
    }

    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, id]);

  if (loading) return <Loader />;

  if (error) {
    return (
      <EmptyState
        title="Product not found"
        message={error}
        actionText="Go Back"
        onAction={() => window.history.back()}
      />
    );
  }

  // 🔥 IMPORTANT FIX
  // selected may be { product: {...} }
  const product = selected?.product || selected;

  if (!product) return null;

  return <ProductDetails product={product} />;
}
