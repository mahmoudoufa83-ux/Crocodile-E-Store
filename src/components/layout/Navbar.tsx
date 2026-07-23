import "../../styles/Navbar.css";

import { Link, useNavigate } from "react-router-dom";

import {
  FaSearch,
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaBars,
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

  function handleLogout() {

    logout();

    navigate("/");

  }

  function handleSearch() {

    navigate("/products");

  }

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>
  ) {

    if (e.key === "Enter") {

      navigate("/products");

    }

  }

  return (

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

              <FaUserShield style={{ marginRight: 6 }} />

              Admin

            </Link>

          )}

        </nav>

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

          <button className="menu">

            <FaBars />

          </button>

        </div>

      </div>

    </header>

  );

}

export default Navbar;