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
        <span className="hero-badge">
          PREMIUM PRINTER • TONER • INK
        </span>

        <h1 className="hero-title">
          {settings.storeName.toUpperCase()}
        </h1>

        <h3 className="hero-subtitle">
          PRINTERS • TONERS • INKS
        </h3>

        <p>
          Original printers, cartridges, toners and inks with competitive
          prices, trusted brands, professional support and fast delivery
          across Egypt.
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
      </div>

      <div className="hero-scroll">
        <span>Scroll</span>
        <div className="scroll-line"></div>
      </div>
    </section>
  );
}

export default Hero;