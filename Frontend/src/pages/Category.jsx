// src/pages/Category.jsx

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// ✅ Correct Redux thunk
import { getProducts } from "../features/product/productSlice";

// UI components
import ProductGrid from "../components/product/ProductGrid";
import Loader from "../components/common/Loader";
import EmptyState from "../components/common/EmptyState";

export default function Category() {
  const { name } = useParams();
  const dispatch = useDispatch();

  const { list, loading, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    // Load all products once
    dispatch(getProducts());
  }, [dispatch]);

  // Filter products by category from URL
  const filteredProducts = list.filter(
    (product) =>
      product.category?.toLowerCase() ===
      name.toLowerCase()
  );

  if (loading) {
    return <Loader />;
  }

  if (!loading && error) {
    return (
      <EmptyState
        title="Something went wrong"
        message={error}
      />
    );
  }

  if (!loading && filteredProducts.length === 0) {
    return (
      <EmptyState
        title="No products found"
        message={`No products available in ${name}`}
      />
    );
  }

  return (
    <div className="category-page">
      <h2 className="category-title">
        Category: {name}
      </h2>

      <ProductGrid products={filteredProducts} />
    </div>
  );
}
