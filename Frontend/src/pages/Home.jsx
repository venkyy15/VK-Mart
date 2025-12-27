// src/pages/Home.jsx

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { getProducts } from "../features/product/productSlice";

import Banner from "../components/home/Banner";
import PrimeCard from "../components/home/PrimeCard";
import CategoryBar from "../components/home/CategoryBar";
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

  // ✅ FETCH BASED ON SEARCH
  useEffect(() => {
    dispatch(getProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <div className="home-page">
      {!keyword && <Banner />}
      {!keyword && <CategoryBar />}
      {!keyword && <PrimeCard />}

      {loading && <Loader />}

      {!loading && error && (
        <EmptyState
          title="Something went wrong"
          message={error}
        />
      )}

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

      {!loading && list.length > 0 && (
        <ProductGrid products={list} />
      )}
    </div>
  );
}
