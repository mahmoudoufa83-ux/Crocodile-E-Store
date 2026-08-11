import "./App.css";

import {
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import WhatsAppButton from "./components/common/WhatsAppButton";
import ScrollManager from "./components/common/ScrollManager";

import ProtectedRoute from "./components/auth/ProtectedRoute";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import MyOrders from "./pages/MyOrders";

import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AdminOrders from "./pages/AdminOrders";
import AdminReviews from "./pages/AdminReviews";
import AdminCustomers from "./pages/AdminCustomers";
import CustomerDetails from "./pages/CustomerDetails";
import AdminSettings from "./pages/AdminSettings";

function App() {
  return (
    <>
      {/* =========================
          NAVBAR
      ========================== */}

      <Navbar />

      {/* =========================
          SCROLL MANAGER
      ========================== */}

      <ScrollManager />

      {/* =========================
          ROUTES
      ========================== */}

      <Routes>

        {/* =========================
            PUBLIC
        ========================== */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/wishlist"
          element={<Wishlist />}
        />

        {/* =========================
            LOGIN / REGISTER
        ========================== */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* =========================
            GUEST CHECKOUT
            NO LOGIN REQUIRED
        ========================== */}

        <Route
          path="/checkout"
          element={<Checkout />}
        />

        {/* =========================
            ORDER SUCCESS
            NO LOGIN REQUIRED
        ========================== */}

        <Route
          path="/order-success"
          element={<OrderSuccess />}
        />

        {/* =========================
            ORDERS
            ADMIN ONLY
        ========================== */}

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />

        {/* =========================
            ADMIN DASHBOARD
        ========================== */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* =========================
            ADMIN PRODUCTS
        ========================== */}

        <Route
          path="/admin/products"
          element={
            <ProtectedRoute>
              <AdminProducts />
            </ProtectedRoute>
          }
        />

        {/* =========================
            ADMIN ORDERS
        ========================== */}

        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute>
              <AdminOrders />
            </ProtectedRoute>
          }
        />

        {/* =========================
            ADMIN REVIEWS
        ========================== */}

        <Route
          path="/admin/reviews"
          element={
            <ProtectedRoute>
              <AdminReviews />
            </ProtectedRoute>
          }
        />

        {/* =========================
            ADMIN CUSTOMERS
        ========================== */}

        <Route
          path="/admin/customers"
          element={
            <ProtectedRoute>
              <AdminCustomers />
            </ProtectedRoute>
          }
        />

        {/* =========================
            CUSTOMER DETAILS
        ========================== */}

        <Route
          path="/admin/customers/:id"
          element={
            <ProtectedRoute>
              <CustomerDetails />
            </ProtectedRoute>
          }
        />

        {/* =========================
            ADMIN SETTINGS
        ========================== */}

        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute>
              <AdminSettings />
            </ProtectedRoute>
          }
        />

      </Routes>

      {/* =========================
          FOOTER
      ========================== */}

      <Footer />

      {/* =========================
          WHATSAPP
      ========================== */}

      <WhatsAppButton />
    </>
  );
}

export default App;