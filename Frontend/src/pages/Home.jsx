// src/pages/Home.jsx

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { getProducts } from "../features/product/productSlice";

import Banner from "../components/home/Banner";
import CategoryBar from "../components/home/CategoryBar";
import PrimeCard from "../components/home/PrimeCard";
import ProductGrid from "../components/product/ProductGrid";
import Loader from "../components/common/Loader";
import EmptyState from "../components/common/EmptyState";

export default function Home() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const keyword = searchParams.get("keyword") || "";

  const { list, loading, error } = useSelector(
    (state) => state.products
  );

  // 🔥 Fetch products (normal / search)
  useEffect(() => {
    dispatch(getProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <main
      className="home-page"
      style={{
        width: "100%",
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "16px",
        boxSizing: "border-box",
      }}
    >
      {/* =====================
          HOME TOP SECTIONS
      ===================== */}
      {!keyword && (
        <>
          {/* CATEGORIES FIRST */}
          <CategoryBar />

          {/* BANNER BELOW CATEGORIES */}
          <Banner />

          {/* PRIME CARD */}
          <PrimeCard />
        </>
      )}

      {/* =====================
          LOADING
      ===================== */}
      {loading && <Loader />}

      {/* =====================
          ERROR
      ===================== */}
      {!loading && error && (
        <EmptyState
          title="Something went wrong"
          message={error}
        />
      )}

      {/* =====================
          EMPTY RESULT
      ===================== */}
      {!loading && !error && list.length === 0 && (
        <EmptyState
          title="No products found"
          message={
            keyword
              ? `No results for "${keyword}"`
              : "Products will appear here"
          }
        />
      )}

      {/* =====================
          PRODUCT GRID
      ===================== */}
      {!loading && !error && list.length > 0 && (
        <ProductGrid products={list} />
      )}
    </main>
  );
}
