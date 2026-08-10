import "../styles/ProductPage.css";

import ProductCard from "../components/common/ProductCard";
import FilterSidebar from "../components/products/FilterSidebar";

import { useSearch } from "../context/SearchContext";
import { useFilter } from "../context/FilterContext";
import { useProducts } from "../context/ProductContext";

function Products() {
  const { search } = useSearch();
  const { products } = useProducts();

  const {
    category,
    brand,
    sort,
    maxPrice,
    inStock,
  } = useFilter();

  const keyword = (search || "").trim().toLowerCase();

  /*
   * توحيد اسم الـ Category
   *
   * مثال:
   * Toner   -> toner
   * Toners  -> toner
   * TONER   -> toner
   * Printers -> printer
   */
  function normalizeCategory(value: string) {
    const normalized = (value || "")
      .trim()
      .toLowerCase();

    if (normalized === "printers") {
      return "printer";
    }

    if (normalized === "toners") {
      return "toner";
    }

    if (normalized === "inks") {
      return "ink";
    }

    return normalized;
  }

  const selectedCategory =
    normalizeCategory(category);

  let filteredProducts = products.filter(
    (product) => {
      const name = (
        product.name || ""
      ).toLowerCase();

      const productBrand = (
        product.brand || ""
      ).toLowerCase();

      const productCategory = normalizeCategory(
        product.category || ""
      );

      /*
       * SEARCH
       */
      const matchSearch =
        keyword === "" ||
        name.includes(keyword) ||
        productBrand.includes(keyword) ||
        productCategory.includes(keyword);

      /*
       * CATEGORY
       *
       * All = كل المنتجات
       *
       * غير كده بنقارن بعد توحيد الاسم
       */
      const matchCategory =
        category === "All" ||
        productCategory === selectedCategory;

      /*
       * BRAND
       */
      const matchBrand =
        brand === "All" ||
        productBrand ===
          brand.trim().toLowerCase();

      /*
       * PRICE
       */
      const matchPrice =
        (product.price || 0) <= maxPrice;

      /*
       * STOCK
       */
      const matchStock =
        !inStock ||
        (product.stock || 0) > 0;

      return (
        matchSearch &&
        matchCategory &&
        matchBrand &&
        matchPrice &&
        matchStock
      );
    }
  );

  /*
   * SORT
   */
  switch (sort) {
    case "Price Low":
      filteredProducts.sort(
        (a, b) =>
          (a.price || 0) -
          (b.price || 0)
      );
      break;

    case "Price High":
      filteredProducts.sort(
        (a, b) =>
          (b.price || 0) -
          (a.price || 0)
      );
      break;

    case "Rating":
      filteredProducts.sort(
        (a, b) =>
          (b.rating || 0) -
          (a.rating || 0)
      );
      break;

    default:
      break;
  }

  return (
    <section className="products-page">
      <div className="products-layout">

        {/* =========================
            FILTER
        ========================== */}

        <aside className="products-filter">
          <FilterSidebar />
        </aside>

        {/* =========================
            PRODUCTS
        ========================== */}

        <div className="products-content">

          <div className="section-title">
            <span>OUR STORE</span>

            <h2>All Products</h2>

            <p>
              Showing{" "}
              {filteredProducts.length}{" "}
              Products
            </p>
          </div>

          <div className="products-grid">

            {filteredProducts.length > 0 ? (
              filteredProducts.map(
                (product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                )
              )
            ) : (
              <div
                style={{
                  width: "100%",
                  textAlign: "center",
                  padding: "60px 20px",
                  fontSize: "22px",
                  fontWeight: "600",
                }}
              >
                No Products Found 🔍
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}

export default Products;