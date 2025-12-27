// src/App.jsx

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, clearCart } from "./features/cart/cartSlice";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import BottomNav from "./components/layout/BottomNav";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  // 🔥 Fetch cart on login / refresh
  useEffect(() => {
    if (user) {
      dispatch(fetchCart());
    } else {
      // ✅ clear cart on logout (prevents stale cart count)
      dispatch(clearCart());
    }
  }, [dispatch, user]);

  return (
    <>
      <Header />

      <main className="app-content">
        <AppRoutes />
      </main>

      <Footer />
      <BottomNav />
    </>
  );
}
