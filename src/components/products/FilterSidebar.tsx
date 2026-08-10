import "../../styles/FilterSidebar.css";

import { useFilter } from "../../context/FilterContext";

function FilterSidebar() {
  const {
    category,
    setCategory,

    brand,
    setBrand,

    sort,
    setSort,

    maxPrice,
    setMaxPrice,

    inStock,
    setInStock,

    resetFilters,
  } = useFilter();

  return (
    <aside className="filter-sidebar">

      {/* =========================
          FILTER HEADER
      ========================== */}

      <div className="filter-header">

        <h2>Filter</h2>

        <button
          className="reset-btn"
          onClick={resetFilters}
          type="button"
        >
          Reset
        </button>

      </div>

      {/* =========================
          CATEGORY
      ========================== */}

      <div className="filter-group">

        <label htmlFor="category-filter">
          Category
        </label>

        <select
          id="category-filter"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >
          <option>All</option>
          <option>Printers</option>
          <option>Ink</option>
          <option>Toner</option>
        </select>

      </div>

      {/* =========================
          BRAND
      ========================== */}

      <div className="filter-group">

        <label htmlFor="brand-filter">
          Brand
        </label>

        <select
          id="brand-filter"
          value={brand}
          onChange={(e) =>
            setBrand(e.target.value)
          }
        >
          <option>All</option>
          <option>HP</option>
          <option>Canon</option>
          <option>Epson</option>
          <option>Brother</option>
        </select>

      </div>

      {/* =========================
          MAXIMUM PRICE
      ========================== */}

      <div className="filter-group">

        <label htmlFor="price-filter">
          Maximum Price
        </label>

        <input
          id="price-filter"
          type="range"
          min="0"
          max="50000"
          step="100"
          value={maxPrice}
          onChange={(e) =>
            setMaxPrice(
              Number(e.target.value)
            )
          }
        />

        <span className="price-value">
          {maxPrice.toLocaleString()} EGP
        </span>

      </div>

      {/* =========================
          STOCK
      ========================== */}

      <div className="filter-group">

        <label className="checkbox">

          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) =>
              setInStock(e.target.checked)
            }
          />

          <span>
            Available Products Only
          </span>

        </label>

      </div>

      {/* =========================
          SORT
      ========================== */}

      <div className="filter-group">

        <label htmlFor="sort-filter">
          Sort By
        </label>

        <select
          id="sort-filter"
          value={sort}
          onChange={(e) =>
            setSort(e.target.value)
          }
        >
          <option>Newest</option>
          <option>Price Low</option>
          <option>Price High</option>
          <option>Rating</option>
        </select>

      </div>

    </aside>
  );
}

export default FilterSidebar;