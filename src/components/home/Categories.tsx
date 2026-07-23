import "../../styles/Categories.css";

import {
  FaPrint,
  FaTint,
  FaBoxOpen,
  FaLaptop,
  FaChair,
  FaArchive,
} from "react-icons/fa";

function Categories() {
  return (
    <section className="categories">

      <div className="section-title">

        <span>CATEGORIES</span>

        <h2>Shop By Category</h2>

        <p>
          Find everything your office needs.
        </p>

      </div>

      <div className="category-grid">

        <div className="category-card">
          <FaPrint />
          <h3>Printers</h3>
        </div>

        <div className="category-card">
          <FaTint />
          <h3>Ink Cartridges</h3>
        </div>

        <div className="category-card">
          <FaBoxOpen />
          <h3>Toners</h3>
        </div>

        <div className="category-card">
          <FaLaptop />
          <h3>Electronics</h3>
        </div>

        <div className="category-card">
          <FaChair />
          <h3>Office Furniture</h3>
        </div>

        <div className="category-card">
          <FaArchive />
          <h3>Office Supplies</h3>
        </div>

      </div>

    </section>
  );
}

export default Categories;