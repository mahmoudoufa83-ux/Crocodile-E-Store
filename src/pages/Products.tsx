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

  const keyword = search.toLowerCase();

  let filteredProducts = products.filter((product) => {

    const matchSearch =
      product.name.toLowerCase().includes(keyword) ||
      product.brand.toLowerCase().includes(keyword) ||
      product.category.toLowerCase().includes(keyword);

    const matchCategory =
      category === "All" ||
      product.category === category;

    const matchBrand =
      brand === "All" ||
      product.brand === brand;

    const matchPrice =
      product.price <= maxPrice;

    const matchStock =
      !inStock ||
      product.stock > 0;

    return (
      matchSearch &&
      matchCategory &&
      matchBrand &&
      matchPrice &&
      matchStock
    );

  });

  switch (sort) {

    case "Price Low":

      filteredProducts.sort(
        (a, b) => a.price - b.price
      );

      break;

    case "Price High":

      filteredProducts.sort(
        (a, b) => b.price - a.price
      );

      break;

    case "Rating":

      filteredProducts.sort(
        (a, b) => b.rating - a.rating
      );

      break;

    default:

      break;

  }

  return (

    <section className="products-page">

      <div className="products-layout">

        <FilterSidebar />

        <div className="products-content">

          <div className="section-title">

            <span>OUR STORE</span>

            <h2>All Products</h2>

            <p>
              Showing {filteredProducts.length} Products
            </p>

          </div>

          <div className="products-grid">

            {filteredProducts.length > 0 ? (

              filteredProducts.map((product) => (

                <ProductCard
                  key={product.id}
                  product={product}
                />

              ))

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