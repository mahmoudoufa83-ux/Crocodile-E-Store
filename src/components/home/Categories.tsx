import "../../styles/Categories.css";

import {
  FaPrint,
  FaTint,
  FaBoxOpen,
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
          Find the perfect printer, toner and ink for your business.
        </p>
      </div>

      <div className="category-grid">
        <div className="category-card">
          <FaPrint />
          <h3>Printers</h3>
        </div>

        <div className="category-card">
          <FaBoxOpen />
          <h3>Toners</h3>
        </div>

        <div className="category-card">
          <FaTint />
          <h3>Ink</h3>
        </div>
      </div>
    </section>
  );
}

export default Categories;