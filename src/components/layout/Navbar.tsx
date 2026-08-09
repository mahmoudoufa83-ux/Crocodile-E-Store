import "../../styles/Navbar.css";

import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { useState, useEffect, useRef } from "react";

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
import { useProducts } from "../../context/ProductContext";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const { search, setSearch } = useSearch();
  const { user, logout } = useAuth();
  const { settings } = useStore();
  const { products } = useProducts();

  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearchResults, setShowSearchResults] =
    useState(false);

  const searchRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    console.log("========== STORE SETTINGS ==========");
    console.log(settings);
    console.log("Store Name:", settings.storeName);
    console.log("Logo:", settings.logo);
    console.log("Phone:", settings.phone);
    console.log("WhatsApp:", settings.whatsapp);
    console.log("====================================");
  }, [settings]);

  /*
   * إغلاق نتائج البحث عند الضغط خارج مربع البحث
   */
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(
          event.target as Node
        )
      ) {
        setShowSearchResults(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  /*
   * Live Search
   *
   * البحث في:
   * - اسم المنتج
   * - البراند
   * - الكاتيجوري
   */
  const searchResults =
    search.trim() === ""
      ? []
      : products
          .filter((product) => {
            const keyword =
              search.trim().toLowerCase();

            const name = (
              product.name || ""
            ).toLowerCase();

            const brand = (
              product.brand || ""
            ).toLowerCase();

            const category = (
              product.category || ""
            ).toLowerCase();

            return (
              name.includes(keyword) ||
              brand.includes(keyword) ||
              category.includes(keyword)
            );
          })
          .slice(0, 6);

  async function handleLogout() {
    await logout();

    setMenuOpen(false);
    setShowSearchResults(false);

    navigate("/");
  }

  function handleSearch() {
    setShowSearchResults(false);
    setMenuOpen(false);

    navigate("/products");
  }

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (e.key === "Enter") {
      setShowSearchResults(false);
      setMenuOpen(false);

      navigate("/products");
    }

    if (e.key === "Escape") {
      setShowSearchResults(false);
    }
  }

  function handleSearchChange(
    value: string
  ) {
    setSearch(value);

    setShowSearchResults(
      value.trim().length > 0
    );
  }

  /*
   * عند الضغط على منتج من نتائج البحث
   *
   * مهم:
   * نستخدم navigate مباشرة مع String(productId)
   * علشان سواء الـ id في Firestore رقم أو String
   * الرابط يطلع بشكل صحيح.
   */
 

  function closeMenu() {
    setMenuOpen(false);
  }

  function scrollToSection(
    sectionId: string
  ) {
    closeMenu();

    /*
     * لو المستخدم مش في Home
     * نرجعه للـ Home وبعدها Home.tsx
     * يقدر يتعامل مع الـ section المطلوب.
     */
    if (location.pathname !== "/") {
      sessionStorage.setItem(
        "scrollToSection",
        sectionId
      );

      navigate("/");
      return;
    }

    /*
     * Home
     */
    if (sectionId === "home") {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });

      return;
    }

    /*
     * باقي أقسام الصفحة الرئيسية
     */
    const section =
      document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  return (
    <>
      <header>
        <div className="navbar">

          <Link
            to="/"
            className="logo"
            onClick={(e) => {
              /*
               * لو إحنا بالفعل في Home،
               * امنع إعادة الـ navigation واعمل scroll فقط.
               */
              if (location.pathname === "/") {
                e.preventDefault();

                scrollToSection("home");
              } else {
                closeMenu();

                sessionStorage.removeItem(
                  "scrollToSection"
                );
              }
            }}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >

            {settings.logo &&
            settings.logo.trim() !== "" ? (
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

            <div className="logo-text">
              <h2>{settings.storeName}</h2>
              <span>Print Solutions</span>
            </div>

          </Link>

          {/* =========================
              DESKTOP SEARCH
          ========================== */}

          <div
            className="search-box"
            ref={searchRef}
          >

            <input
              type="text"
              placeholder="Search Products..."
              value={search}
              onFocus={() => {
                if (search.trim() !== "") {
                  setShowSearchResults(true);
                }
              }}
              onChange={(e) =>
                handleSearchChange(
                  e.target.value
                )
              }
              onKeyDown={handleKeyDown}
            />

            <button onClick={handleSearch}>
              <FaSearch />
            </button>

            {/* =========================
                LIVE SEARCH RESULTS
            ========================== */}

            {showSearchResults &&
              search.trim() !== "" && (
                <div className="search-results">

                  {searchResults.length > 0 ? (
                    searchResults.map(
                      (product) => (
                        <Link
                          key={product.id}
                          to={`/product/${String(
                            product.id
                          )}`}
                          className="search-result-item"
                          onClick={() => {
                            setShowSearchResults(
                              false
                            );
                            setMenuOpen(false);
                            setSearch("");
                          }}
                        >

                          <img
                            src={
                              product.image ||
                              "https://via.placeholder.com/60x60?text=No+Image"
                            }
                            alt={
                              product.name ||
                              "Product"
                            }
                          />

                          <div className="search-result-info">

                            <h4>
                              {product.name ||
                                "Unnamed Product"}
                            </h4>

                            <span>
                              {product.brand ||
                                "Unknown"}
                            </span>

                            <strong>
                              {(
                                product.price ??
                                0
                              ).toLocaleString()}{" "}
                              EGP
                            </strong>

                          </div>

                        </Link>
                      )
                    )
                  ) : (
                    <div className="search-no-results">
                      No Products Found 🔍
                    </div>
                  )}

                </div>
              )}

          </div>

          <nav className="nav-links">

            <button
              className="nav-scroll-btn"
              onClick={() =>
                scrollToSection("home")
              }
            >
              Home
            </button>

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

            <button
              className="nav-scroll-btn"
              onClick={() =>
                scrollToSection("categories")
              }
            >
              Categories
            </button>

            <button
              className="nav-scroll-btn"
              onClick={() =>
                scrollToSection("brands")
              }
            >
              Brands
            </button>

            <button
              className="nav-scroll-btn"
              onClick={() =>
                scrollToSection("offers")
              }
            >
              Offers
            </button>

            <button
              className="nav-scroll-btn"
              onClick={() =>
                scrollToSection("contact")
              }
            >
              Contact
            </button>

            {user?.role === "admin" && (
              <Link
                to="/admin"
                onClick={closeMenu}
              >
                <FaUserShield
                  style={{
                    marginRight: 6,
                  }}
                />
                Admin
              </Link>
            )}

          </nav>

          <div className="actions">

            <Link
              to="/wishlist"
              className="icon"
              onClick={closeMenu}
            >
              <FaHeart />
              <span>{wishlist.length}</span>
            </Link>

            <Link
              to="/cart"
              className="icon"
              onClick={closeMenu}
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
                onClick={closeMenu}
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

      {menuOpen && (
        <div
          className="mobile-overlay"
          onClick={closeMenu}
        />
      )}

      <aside
        className={`mobile-menu ${
          menuOpen ? "show" : ""
        }`}
      >

        <div className="mobile-header">

          <h2>{settings.storeName}</h2>

          <button onClick={closeMenu}>
            <FaTimes />
          </button>

        </div>

        {/* =========================
            MOBILE SEARCH
        ========================== */}

        <div
          className="mobile-search"
          ref={searchRef}
        >

          <input
            type="text"
            placeholder="Search Products..."
            value={search}
            onFocus={() => {
              if (search.trim() !== "") {
                setShowSearchResults(true);
              }
            }}
            onChange={(e) =>
              handleSearchChange(
                e.target.value
              )
            }
            onKeyDown={handleKeyDown}
          />

          <button onClick={handleSearch}>
            <FaSearch />
          </button>

          {/* MOBILE LIVE RESULTS */}

          {showSearchResults &&
            search.trim() !== "" && (
              <div className="search-results mobile-search-results">

                {searchResults.length > 0 ? (
                  searchResults.map(
                    (product) => (
                      <Link
                        key={product.id}
                        to={`/product/${String(
                          product.id
                        )}`}
                        className="search-result-item"
                        onClick={() => {
                          setShowSearchResults(
                            false
                          );
                          setMenuOpen(false);
                          setSearch("");
                        }}
                      >

                        <img
                          src={
                            product.image ||
                            "https://via.placeholder.com/60x60?text=No+Image"
                          }
                          alt={
                            product.name ||
                            "Product"
                          }
                        />

                        <div className="search-result-info">

                          <h4>
                            {product.name ||
                              "Unnamed Product"}
                          </h4>

                          <span>
                            {product.brand ||
                              "Unknown"}
                          </span>

                          <strong>
                            {(
                              product.price ??
                              0
                            ).toLocaleString()}{" "}
                            EGP
                          </strong>

                        </div>

                      </Link>
                    )
                  )
                ) : (
                  <div className="search-no-results">
                    No Products Found 🔍
                  </div>
                )}

              </div>
            )}

        </div>

        <nav>

          <button
            className="mobile-login"
            onClick={() =>
              scrollToSection("home")
            }
          >
            Home
          </button>

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

          <button
            className="mobile-login"
            onClick={() =>
              scrollToSection("categories")
            }
          >
            Categories
          </button>

          <button
            className="mobile-login"
            onClick={() =>
              scrollToSection("brands")
            }
          >
            Brands
          </button>

          <button
            className="mobile-login"
            onClick={() =>
              scrollToSection("offers")
            }
          >
            Offers
          </button>

          <button
            className="mobile-login"
            onClick={() =>
              scrollToSection("contact")
            }
          >
            Contact
          </button>

          {user?.role === "admin" && (
            <Link
              to="/admin"
              onClick={closeMenu}
            >
              <FaUserShield
                style={{
                  marginRight: 6,
                }}
              />
              Admin
            </Link>
          )}

          {user ? (
            <button
              className="mobile-login"
              onClick={handleLogout}
            >
              <FaUser />
              {user.name} | Logout
            </button>
          ) : (
            <Link
              to="/login"
              onClick={closeMenu}
            >
              <FaUser />
              Login
            </Link>
          )}

        </nav>

      </aside>
    </>
  );
}

export default Navbar;