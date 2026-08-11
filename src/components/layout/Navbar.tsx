import "../../styles/Navbar.css";

import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  useState,
  useEffect,
  useRef,
} from "react";

import {
  FaSearch,
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaBars,
  FaTimes,
  FaUserShield,
  FaGlobe,
} from "react-icons/fa";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useSearch } from "../../context/SearchContext";
import { useAuth } from "../../context/AuthContext";
import { useStore } from "../../context/StoreContext";
import { useProducts } from "../../context/ProductContext";
import { useLanguage } from "../../context/LanguageContext";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { cart } = useCart();

  const { wishlist } = useWishlist();

  const {
    search,
    setSearch,
  } = useSearch();

  const {
    user,
    logout,
  } = useAuth();

  const { settings } = useStore();

  const { products } = useProducts();

  const {
    language,
    toggleLanguage,
    isArabic,
  } = useLanguage();

  const [
    menuOpen,
    setMenuOpen,
  ] = useState(false);

  const [
    showSearchResults,
    setShowSearchResults,
  ] = useState(false);

  const desktopSearchRef =
    useRef<HTMLDivElement | null>(null);

  const mobileSearchRef =
    useRef<HTMLDivElement | null>(null);

  /*
   * =========================
   * CLOSE SEARCH RESULTS
   * =========================
   */

  useEffect(() => {
    function handleClickOutside(
      event: MouseEvent
    ) {
      const target =
        event.target as Node;

      const insideDesktop =
        desktopSearchRef.current?.contains(
          target
        );

      const insideMobile =
        mobileSearchRef.current?.contains(
          target
        );

      if (
        !insideDesktop &&
        !insideMobile
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
   * =========================
   * LIVE SEARCH
   * =========================
   */

  const searchResults =
    search.trim() === ""
      ? []
      : products
          .filter((product) => {
            const keyword =
              search
                .trim()
                .toLowerCase();

            const name =
              (
                product.name ||
                ""
              ).toLowerCase();

            const brand =
              (
                product.brand ||
                ""
              ).toLowerCase();

            const category =
              (
                product.category ||
                ""
              ).toLowerCase();

            return (
              name.includes(keyword) ||
              brand.includes(keyword) ||
              category.includes(keyword)
            );
          })
          .slice(0, 6);

  /*
   * =========================
   * LOGOUT
   * =========================
   */

  async function handleLogout() {
    await logout();

    setMenuOpen(false);

    setShowSearchResults(false);

    setSearch("");

    navigate("/");
  }

  /*
   * =========================
   * SEARCH
   * =========================
   */

  function handleSearch() {
    setShowSearchResults(false);

    setMenuOpen(false);

    navigate("/products");
  }

  function handleKeyDown(
    e: React.KeyboardEvent
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
   * =========================
   * OPEN PRODUCT
   * =========================
   */

  function openProduct(
    productId: string | number
  ) {
    const productPath =
      `/product/${String(productId)}`;

    setShowSearchResults(false);

    setMenuOpen(false);

    setSearch("");

    navigate(productPath);
  }

  /*
   * =========================
   * CLOSE MENU
   * =========================
   */

  function closeMenu() {
    setMenuOpen(false);
  }

  /*
   * =========================
   * LANGUAGE
   * =========================
   */

  function handleLanguageChange() {
    toggleLanguage();

    setShowSearchResults(false);

    setMenuOpen(false);
  }

  /*
   * =========================
   * SCROLL TO SECTION
   * =========================
   */

  function scrollToSection(
    sectionId: string
  ) {
    closeMenu();

    /*
     * If user is not on Home,
     * go Home first.
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
     * Home sections
     */

    const section =
      document.getElementById(
        sectionId
      );

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  /*
   * =========================
   * TRANSLATIONS
   * =========================
   */

  const text = {
    home: isArabic
      ? "الرئيسية"
      : "Home",

    products: isArabic
      ? "المنتجات"
      : "Products",

    returns: isArabic
      ? "سياسة الاسترجاع"
      : "Returns",

    orders: isArabic
      ? "طلباتي"
      : "My Orders",

    categories: isArabic
      ? "الأقسام"
      : "Categories",

    brands: isArabic
      ? "البراندات"
      : "Brands",

    offers: isArabic
      ? "العروض"
      : "Offers",

    contact: isArabic
      ? "تواصل معنا"
      : "Contact",

    admin: isArabic
      ? "الإدارة"
      : "Admin",

    login: isArabic
      ? "تسجيل الدخول"
      : "Login",

    logout: isArabic
      ? "تسجيل الخروج"
      : "Logout",

    search: isArabic
      ? "ابحث عن المنتجات..."
      : "Search Products...",

    noProducts: isArabic
      ? "لا توجد منتجات 🔍"
      : "No Products Found 🔍",

    unnamed: isArabic
      ? "منتج بدون اسم"
      : "Unnamed Product",

    unknown: isArabic
      ? "غير معروف"
      : "Unknown",
  };

  /*
   * =========================
   * RENDER
   * =========================
   */

  return (
    <>
      <header className="navbar">
        <div className="container">

          {/* =========================
              LOGO
          ========================== */}

          <Link
            to="/"
            className="logo"
            onClick={(e) => {
              if (
                location.pathname === "/"
              ) {
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
                alt="Crocodile Print Solutions"
                className="navbar-logo-image"
              />
            ) : (
              <div className="navbar-logo-fallback">
                🐊
              </div>
            )}

            <div className="logo-text">
              <h2>
                {settings.storeName}
              </h2>

              <span>
                Print Solutions
              </span>
            </div>
          </Link>

          {/* =========================
              DESKTOP SEARCH
          ========================== */}

          <div
            className="search-box"
            ref={desktopSearchRef}
          >
            <input
              type="text"
              placeholder={text.search}
              value={search}
              onFocus={() => {
                if (
                  search.trim() !== ""
                ) {
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

            <button
              type="button"
              onClick={handleSearch}
            >
              <FaSearch />
            </button>

            {/* LIVE SEARCH */}

            {showSearchResults &&
              search.trim() !== "" && (
                <div className="search-results">

                  {searchResults.length > 0 ? (
                    searchResults.map(
                      (product) => (
                        <button
                          type="button"
                          key={String(
                            product.id
                          )}
                          className="search-result-item"
                          onClick={() =>
                            openProduct(
                              product.id
                            )
                          }
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
                                text.unnamed}
                            </h4>

                            <span>
                              {product.brand ||
                                text.unknown}
                            </span>

                            <strong>
                              {(
                                product.price ??
                                0
                              ).toLocaleString()}{" "}
                              EGP
                            </strong>

                          </div>
                        </button>
                      )
                    )
                  ) : (
                    <div className="search-no-results">
                      {text.noProducts}
                    </div>
                  )}

                </div>
              )}
          </div>

          {/* =========================
              DESKTOP NAVIGATION
          ========================== */}

          <nav className="nav-links">

            <button
              className="nav-scroll-btn"
              onClick={() =>
                scrollToSection("home")
              }
            >
              {text.home}
            </button>

            <Link
              to="/products"
              onClick={closeMenu}
            >
              {text.products}
            </Link>

            {/* RETURNS */}

            <Link
              to="/returns"
              onClick={closeMenu}
            >
              {text.returns}
            </Link>

            {/* ADMIN ORDERS ONLY */}

            {user?.role === "admin" && (
              <Link
                to="/orders"
                onClick={closeMenu}
              >
                {text.orders}
              </Link>
            )}

            <button
              className="nav-scroll-btn"
              onClick={() =>
                scrollToSection(
                  "categories"
                )
              }
            >
              {text.categories}
            </button>

            <button
              className="nav-scroll-btn"
              onClick={() =>
                scrollToSection("brands")
              }
            >
              {text.brands}
            </button>

            <button
              className="nav-scroll-btn"
              onClick={() =>
                scrollToSection("offers")
              }
            >
              {text.offers}
            </button>

            <button
              className="nav-scroll-btn"
              onClick={() =>
                scrollToSection("contact")
              }
            >
              {text.contact}
            </button>

            {/* ADMIN */}

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

                {text.admin}
              </Link>
            )}

          </nav>

          {/* =========================
              ACTIONS
          ========================== */}

          <div className="actions">

            {/* LANGUAGE */}

            <button
              type="button"
              className="icon language-btn"
              onClick={
                handleLanguageChange
              }
              title={
                language === "en"
                  ? "العربية"
                  : "English"
              }
              aria-label={
                language === "en"
                  ? "Switch to Arabic"
                  : "Switch to English"
              }
            >
              <FaGlobe />

              <span className="language-label">
                {language === "en"
                  ? "AR"
                  : "EN"}
              </span>
            </button>

            {/* WISHLIST */}

            <Link
              to="/wishlist"
              className="icon"
              onClick={closeMenu}
            >
              <FaHeart />

              <span>
                {wishlist.length}
              </span>
            </Link>

            {/* CART */}

            <Link
              to="/cart"
              className="icon"
              onClick={closeMenu}
            >
              <FaShoppingCart />

              <span>
                {cart.length}
              </span>
            </Link>

            {/* LOGIN / LOGOUT */}

            {user ? (
              <button
                className="login"
                onClick={handleLogout}
              >
                <FaUser />

                <span>
                  {user.name}
                </span>

                <span>
                  {" | "}
                  {text.logout}
                </span>
              </button>
            ) : (
              <Link
                to="/login"
                className="login"
                onClick={closeMenu}
              >
                <FaUser />

                {text.login}
              </Link>
            )}

            {/* MENU */}

            <button
              className="menu"
              onClick={() =>
                setMenuOpen(true)
              }
              aria-label="Open menu"
            >
              <FaBars />
            </button>

          </div>

        </div>
      </header>

      {/* =========================
          MOBILE OVERLAY
      ========================== */}

      {menuOpen && (
        <div
          className="mobile-overlay"
          onClick={closeMenu}
        />
      )}

      {/* =========================
          MOBILE MENU
      ========================== */}

      <aside
        className={`mobile-menu ${
          menuOpen ? "show" : ""
        }`}
      >
        <div className="mobile-header">

          <h2>
            {settings.storeName}
          </h2>

          <button
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <FaTimes />
          </button>

        </div>

        {/* =========================
            MOBILE SEARCH
        ========================== */}

        <div
          className="mobile-search"
          ref={mobileSearchRef}
        >
          <input
            type="text"
            placeholder={text.search}
            value={search}
            onFocus={() => {
              if (
                search.trim() !== ""
              ) {
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

          <button
            type="button"
            onClick={handleSearch}
          >
            <FaSearch />
          </button>

          {/* MOBILE LIVE RESULTS */}

          {showSearchResults &&
            search.trim() !== "" && (
              <div className="search-results mobile-search-results">

                {searchResults.length > 0 ? (
                  searchResults.map(
                    (product) => (
                      <button
                        type="button"
                        key={String(
                          product.id
                        )}
                        className="search-result-item"
                        onClick={() =>
                          openProduct(
                            product.id
                          )
                        }
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
                              text.unnamed}
                          </h4>

                          <span>
                            {product.brand ||
                              text.unknown}
                          </span>

                          <strong>
                            {(
                              product.price ??
                              0
                            ).toLocaleString()}{" "}
                            EGP
                          </strong>

                        </div>
                      </button>
                    )
                  )
                ) : (
                  <div className="search-no-results">
                    {text.noProducts}
                  </div>
                )}

              </div>
            )}
        </div>

        {/* =========================
            MOBILE NAVIGATION
        ========================== */}

        <nav>

          <button
            className="mobile-login"
            onClick={() =>
              scrollToSection("home")
            }
          >
            {text.home}
          </button>

          <Link
            to="/products"
            onClick={closeMenu}
          >
            {text.products}
          </Link>

          {/* RETURNS */}

          <Link
            to="/returns"
            onClick={closeMenu}
          >
            {text.returns}
          </Link>

          {/* ADMIN ORDERS ONLY */}

          {user?.role === "admin" && (
            <Link
              to="/orders"
              onClick={closeMenu}
            >
              {text.orders}
            </Link>
          )}

          <button
            className="mobile-login"
            onClick={() =>
              scrollToSection(
                "categories"
              )
            }
          >
            {text.categories}
          </button>

          <button
            className="mobile-login"
            onClick={() =>
              scrollToSection("brands")
            }
          >
            {text.brands}
          </button>

          <button
            className="mobile-login"
            onClick={() =>
              scrollToSection("offers")
            }
          >
            {text.offers}
          </button>

          <button
            className="mobile-login"
            onClick={() =>
              scrollToSection("contact")
            }
          >
            {text.contact}
          </button>

          {/* ADMIN */}

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

              {text.admin}
            </Link>
          )}

          {/* LOGIN / LOGOUT */}

          {user ? (
            <button
              className="mobile-login"
              onClick={handleLogout}
            >
              <FaUser />

              {user.name}

              {" | "}

              {text.logout}
            </button>
          ) : (
            <Link
              to="/login"
              onClick={closeMenu}
            >
              <FaUser />

              {text.login}
            </Link>
          )}

          {/* MOBILE LANGUAGE */}

          <button
            className="mobile-login"
            onClick={
              handleLanguageChange
            }
            type="button"
          >
            <FaGlobe
              style={{
                marginRight: 8,
              }}
            />

            {language === "en"
              ? "العربية"
              : "English"}
          </button>

        </nav>
      </aside>
    </>
  );
}

export default Navbar;