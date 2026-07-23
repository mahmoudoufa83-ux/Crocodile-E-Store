import "../../styles/FeaturedProducts.css";

import ProductCard from "../common/ProductCard";

import { useProducts } from "../../context/ProductContext";
import { useSearch } from "../../context/SearchContext";

function FeaturedProducts() {

  const { products } = useProducts();
  const { search } = useSearch();

  const featuredProducts = products
    .filter((product) => {

      const keyword = search.toLowerCase();

      return (
        product.name.toLowerCase().includes(keyword) ||
        product.brand.toLowerCase().includes(keyword) ||
        product.category.toLowerCase().includes(keyword)
      );

    })
    .slice(0, 4);

  return (

    <section className="featured">

      <div className="section-title">

        <span>OUR PRODUCTS</span>

        <h2>Featured Products</h2>

        <p>
          Premium office supplies with competitive prices.
        </p>

      </div>

      <div className="products-grid">

        {featuredProducts.length > 0 ? (

          featuredProducts.map((product) => (

            <ProductCard
              key={product.id}
              product={product}
            />

          ))

        ) : (

          <h3
            style={{
              textAlign: "center",
              width: "100%",
              padding: "40px",
            }}
          >
            No products found
          </h3>

        )}

      </div>

    </section>

  );

}

export default FeaturedProducts;