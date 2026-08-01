import "../../styles/Categories.css";

import {
  FaPrint,
  FaTint,
  FaBoxOpen,
  FaArrowRight,
} from "react-icons/fa";

function Categories() {
  return (
    <section
      className="categories"
      id="categories"
    >
      <div className="section-title">
        <span>CATEGORIES</span>

        <h2>Shop By Category</h2>

        <p>
          Discover our premium collection of printers,
          toners and ink supplies from trusted brands.
        </p>
      </div>

      <div className="category-grid">
        <div className="category-card">
          <div className="category-icon">
            <FaPrint />
          </div>

          <h3>Printers</h3>

          <p>
            Original inkjet and laser printers for
            home, office and business.
          </p>

          <button>
            Explore
            <FaArrowRight />
          </button>
        </div>

        <div className="category-card">
          <div className="category-icon">
            <FaBoxOpen />
          </div>

          <h3>Toners</h3>

          <p>
            Genuine and compatible toner cartridges
            for all major printer brands.
          </p>

          <button>
            Explore
            <FaArrowRight />
          </button>
        </div>

        <div className="category-card">
          <div className="category-icon">
            <FaTint />
          </div>

          <h3>Ink</h3>

          <p>
            High quality ink bottles and cartridges
            with excellent printing performance.
          </p>

          <button>
            Explore
            <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Categories;