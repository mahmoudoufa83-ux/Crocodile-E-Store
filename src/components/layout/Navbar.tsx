import "../../styles/Navbar.css";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import {
  FaSearch,
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaBars,
  FaTimes,
  FaUserShield,
} from "react-icons/fa";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useSearch } from "../../context/SearchContext";
import { useAuth } from "../../context/AuthContext";
import { useStore } from "../../context/StoreContext";

function Navbar() {
  const navigate = useNavigate();

  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const { search, setSearch } = useSearch();
  const { user, logout } = useAuth();
  const { settings } = useStore();

  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    logout();
    setMenuOpen(false);
    navigate("/");
  }

  function handleSearch() {
    navigate("/products");
    setMenuOpen(false);
  }

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (e.key === "Enter") {
      navigate("/products");
      setMenuOpen(false);
    }
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <header className="navbar">
        <div className="container">

          <div className="logo">
            <div className="logo-icon">
              {settings.logo ? (
                <img
                  src={settings.logo}
                  alt="Logo"
                  style={{
                    width: "45px",
                    height: "45px",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              ) : (
                "🐊"
              )}
            </div>

            <div className="logo-text">
              <h2>{settings.storeName}</h2>
              <span>Print Solutions</span>
            </div>
          </div>

          {/* Desktop Search */}

          <div className="search-box">
            <input
              type="text"
              placeholder="Search Products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            <button onClick={handleSearch}>
              <FaSearch />
            </button>
          </div>

          {/* Desktop Links */}

          <nav className="nav-links">
            <Link to="/">Home</Link>

            <Link to="/products">Products</Link>

            <Link to="/orders">My Orders</Link>

            <Link to="/">Categories</Link>

            <Link to="/">Brands</Link>

            <Link to="/">Offers</Link>

            <Link to="/">Contact</Link>

            {user?.role === "admin" && (
              <Link to="/admin">
                <FaUserShield
                  style={{ marginRight: 6 }}
                />
                Admin
              </Link>
            )}
          </nav>

          {/* Actions */}

          <div className="actions">

            <Link
              to="/wishlist"
              className="icon"
            >
              <FaHeart />
              <span>{wishlist.length}</span>
            </Link>

            <Link
              to="/cart"
              className="icon"
            >
              <FaShoppingCart />
              <span>{cart.length}</span>
            </Link>

            {user ? (
              <button
                className="login"
                onClick={handleLogout}
              >
                <FaUser />
                {user.name} | Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="login"
              >
                <FaUser />
                Login
              </Link>
            )}

            <button
              className="menu"
              onClick={() =>
                setMenuOpen(true)
              }
            >
              <FaBars />
            </button>

          </div>

        </div>
      </header>

      {/* Overlay */}

      {menuOpen && (
        <div
          className="mobile-overlay"
          onClick={closeMenu}
        />
      )}

      {/* Mobile Menu */}

      <aside
        className={`mobile-menu ${
          menuOpen ? "show" : ""
        }`}
      >

        <div className="mobile-header">

          <h2>{settings.storeName}</h2>

          <button
            onClick={closeMenu}
          >
            <FaTimes />
          </button>

        </div>

        <div className="mobile-search">

          <input
            type="text"
            placeholder="Search Products..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            onKeyDown={handleKeyDown}
          />

          <button
            onClick={handleSearch}
          >
            <FaSearch />
          </button>

        </div>

        <nav>

          <Link
            to="/"
            onClick={closeMenu}
          >
            Home
          </Link>

          <Link
            to="/products"
            onClick={closeMenu}
          >
            Products
          </Link>

          <Link
            to="/orders"
            onClick={closeMenu}
          >
            My Orders
          </Link>

          <Link
            to="/"
            onClick={closeMenu}
          >
            Categories
          </Link>

          <Link
            to="/"
            onClick={closeMenu}
          >
            Brands
          </Link>

          <Link
            to="/"
            onClick={closeMenu}
          >
            Offers
          </Link>

          <Link
            to="/"
            onClick={closeMenu}
          >
            Contact
          </Link>

          {user?.role === "admin" && (
            <Link
              to="/admin"
              onClick={closeMenu}
            >
              Admin
            </Link>
          )}

          {user ? (
            <button
              className="mobile-login"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              onClick={closeMenu}
            >
              Login
            </Link>
          )}

        </nav>

      </aside>
    </>
  );
}

export default Navbar;