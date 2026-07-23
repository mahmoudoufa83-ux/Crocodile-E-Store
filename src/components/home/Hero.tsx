import "../../styles/Hero.css";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../context/StoreContext";

function Hero() {
  const navigate = useNavigate();

  const { settings } = useStore();

  return (
    <section className="hero">
      <div className="hero-overlay"></div>

      <div className="hero-content">

        {settings.logo && (
          <img
            src={settings.logo}
            alt={settings.storeName}
            className="hero-logo"
          />
        )}

        <span className="hero-badge">
          PREMIUM PRINTER • TONER • INK
        </span>

        <h1 className="hero-title">
          {settings.storeName.toUpperCase()}
        </h1>

        <h3 className="hero-subtitle">
          PRINTER & TONER & INK
        </h3>

        <p>
          Original printers, cartridges, toners, inks and office
          supplies with the best prices, professional support and
          fast delivery across Egypt.
        </p>

        <div className="hero-buttons">
          <button
            className="primary-btn"
            onClick={() => navigate("/products")}
          >
            Shop Now
          </button>

          <button
            className="secondary-btn"
            onClick={() => navigate("/products")}
          >
            View Products
          </button>
        </div>

        <div className="hero-stats">

          <div className="stat-card">
            <h2>2500+</h2>
            <span>Products</span>
          </div>

          <div className="stat-card">
            <h2>350+</h2>
            <span>Brands</span>
          </div>

          <div className="stat-card">
            <h2>99%</h2>
            <span>Happy Clients</span>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;