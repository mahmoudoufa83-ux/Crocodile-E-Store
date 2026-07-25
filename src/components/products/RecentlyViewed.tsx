import "../../styles/RecentlyViewed.css";

import ProductCard from "../common/ProductCard";

import { useRecentlyViewed } from "../../context/RecentlyViewedContext";

function RecentlyViewed() {

  const { viewed } = useRecentlyViewed();

  if (viewed.length === 0) {

    return null;

  }

  return (

    <section className="recently-viewed">

      <div className="section-title">

        <span>RECENTLY VIEWED</span>

        <h2>Your Recently Viewed Products</h2>

        <p>

          Continue browsing the products you've recently explored.

        </p>

      </div>

      <div className="products-grid">

        {viewed.map((product) => (

          <ProductCard
            key={product.id}
            product={product}
          />

        ))}

      </div>

    </section>

  );

}

export default RecentlyViewed;