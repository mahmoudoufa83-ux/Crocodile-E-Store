import "../../styles/Categories.css";

import {
  FaPrint,
  FaTint,
  FaBoxOpen,
  FaArrowRight,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { useFilter } from "../../context/FilterContext";

function Categories() {
  const navigate = useNavigate();
  const { setCategory } = useFilter();

  function goToCategory(category: string) {
    // تحديد الكاتيجوري في الفلتر
    setCategory(category);

    // الانتقال لصفحة المنتجات
    navigate("/products");
  }

  return (
    <section id="categories" className="categories-section">
      <div className="section-title">
        <span>CATEGORIES</span>

        <h2>Shop By Category</h2>

        <p>
          Discover our premium collection of printers,
          toners and ink supplies from trusted brands.
        </p>
      </div>

      <div className="category-grid">

        {/* =========================
            PRINTERS
        ========================== */}
        <div
          className="category-card"
          onClick={() => goToCategory("Printers")}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (
              event.key === "Enter" ||
              event.key === " "
            ) {
              goToCategory("Printers");
            }
          }}
        >
          <div className="category-icon">
            <FaPrint />
          </div>

          <h3>Printers</h3>

          <p>
            Original inkjet and laser printers for
            home, office and business.
          </p>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              goToCategory("Printers");
            }}
          >
            Explore
            <FaArrowRight />
          </button>
        </div>

        {/* =========================
            TONERS
        ========================== */}
        <div
          className="category-card"
          onClick={() => goToCategory("Toner")}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (
              event.key === "Enter" ||
              event.key === " "
            ) {
              goToCategory("Toner");
            }
          }}
        >
          <div className="category-icon">
            <FaBoxOpen />
          </div>

          <h3>Toners</h3>

          <p>
            Genuine and compatible toner cartridges
            for all major printer brands.
          </p>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              goToCategory("Toner");
            }}
          >
            Explore
            <FaArrowRight />
          </button>
        </div>

        {/* =========================
            INK
        ========================== */}
        <div
          className="category-card"
          onClick={() => goToCategory("Ink")}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (
              event.key === "Enter" ||
              event.key === " "
            ) {
              goToCategory("Ink");
            }
          }}
        >
          <div className="category-icon">
            <FaTint />
          </div>

          <h3>Ink</h3>

          <p>
            High quality ink bottles and cartridges
            with excellent printing performance.
          </p>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              goToCategory("Ink");
            }}
          >
            Explore
            <FaArrowRight />
          </button>
        </div>

      </div>
    </section>
  );
}

export default Categories;