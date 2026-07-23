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

      <div className="filter-header">

        <h2>Filters</h2>

        <button
          className="reset-btn"
          onClick={resetFilters}
        >
          Reset
        </button>

      </div>

      <div className="filter-group">

        <label>Category</label>

        <select
          value={category}
          onChange={(e)=>setCategory(e.target.value)}
        >

          <option>All</option>

          <option>Printers</option>

          <option>Ink</option>

          <option>Toner</option>

          <option>Accessories</option>

        </select>

      </div>

      <div className="filter-group">

        <label>Brand</label>

        <select
          value={brand}
          onChange={(e)=>setBrand(e.target.value)}
        >

          <option>All</option>

          <option>HP</option>

          <option>Canon</option>

          <option>Epson</option>

          <option>Brother</option>

        </select>

      </div>

      <div className="filter-group">

        <label>Maximum Price</label>

        <input
          type="range"
          min="0"
          max="100000"
          step="500"
          value={maxPrice}
          onChange={(e)=>setMaxPrice(Number(e.target.value))}
        />

        <span>{maxPrice} EGP</span>

      </div>

      <div className="filter-group">

        <label>

          <input
            type="checkbox"
            checked={inStock}
            onChange={(e)=>setInStock(e.target.checked)}
          />

          In Stock Only

        </label>

      </div>

      <div className="filter-group">

        <label>Sort</label>

        <select
          value={sort}
          onChange={(e)=>setSort(e.target.value)}
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