import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Category from "../pages/Category";
import Product from "../pages/Product";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Payment from "../pages/Payment";
import OrderSuccess from "../pages/OrderSuccess";
import Orders from "../pages/Orders";
import OrderDetails from "../pages/OrderDetails";
import Profile from "../pages/Profile";
import Addresses from "../pages/Addresses";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

/* 🔐 EXTRA PAGE */
import LoginSecurity from "../pages/LoginSecurity";

import ProtectedRoute from "../components/common/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* ROOT */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* HOME */}
      <Route
        path="/:userId"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      {/* CATEGORY */}
      <Route
        path="/:userId/category/:name"
        element={
          <ProtectedRoute>
            <Category />
          </ProtectedRoute>
        }
      />

      {/* PRODUCT */}
      <Route
        path="/:userId/product/:id"
        element={
          <ProtectedRoute>
            <Product />
          </ProtectedRoute>
        }
      />

      {/* CART */}
      <Route
        path="/cart/:userId"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />

      {/* CHECKOUT */}
      <Route
        path="/checkout/:userId"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />

      {/* PAYMENT */}
      <Route
        path="/payment/:userId"
        element={
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        }
      />

      {/* ORDER SUCCESS */}
      <Route
        path="/order-success/:userId"
        element={
          <ProtectedRoute>
            <OrderSuccess />
          </ProtectedRoute>
        }
      />

      {/* ORDERS */}
      <Route
        path="/orders/:userId"
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        }
      />

      {/* ORDER DETAILS */}
      <Route
        path="/orders/:userId/:orderId"
        element={
          <ProtectedRoute>
            <OrderDetails />
          </ProtectedRoute>
        }
      />

      {/* ADDRESSES */}
      <Route
        path="/addresses/:userId"
        element={
          <ProtectedRoute>
            <Addresses />
          </ProtectedRoute>
        }
      />

      {/* PROFILE */}
      <Route
        path="/profile/:userId"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* LOGIN SECURITY */}
      <Route
        path="/login-security/:userId"
        element={
          <ProtectedRoute>
            <LoginSecurity />
          </ProtectedRoute>
        }
      />

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
