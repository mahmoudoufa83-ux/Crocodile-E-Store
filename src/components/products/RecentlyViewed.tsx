import "../../styles/RelatedProducts.css";

import ProductCard from "../common/ProductCard";

import { useRecentlyViewed } from "../../context/RecentlyViewedContext";

function RecentlyViewed() {

  const { viewed } = useRecentlyViewed();

  if (viewed.length === 0) {

    return null;

  }

  return (

    <section className="related-products">

      <div className="section-title">

        <span>YOUR HISTORY</span>

        <h2>Recently Viewed</h2>

      </div>

      <div className="products-grid">

        {

          viewed.map((product)=>(

            <ProductCard

              key={product.id}

              product={product}

            />

          ))

        }

      </div>

    </section>

  );

}

export default RecentlyViewed;