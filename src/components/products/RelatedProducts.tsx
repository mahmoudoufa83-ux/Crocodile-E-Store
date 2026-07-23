import "../../styles/RelatedProducts.css";

import ProductCard from "../common/ProductCard";

import { useProducts } from "../../context/ProductContext";

type Props = {
  category: string;
  currentId: number;
};

function RelatedProducts({
  category,
  currentId,
}: Props) {

  const { products } = useProducts();

  const related = products
    .filter(
      (product) =>
        product.category === category &&
        product.id !== currentId
    )
    .slice(0, 4);

  if (related.length === 0) {
    return null;
  }

  return (

    <section className="related-products">

      <div className="section-title">

        <span>YOU MAY LIKE</span>

        <h2>Related Products</h2>

      </div>

      <div className="products-grid">

        {related.map((product) => (

          <ProductCard
            key={product.id}
            product={product}
          />

        ))}

      </div>

    </section>

  );

}

export default RelatedProducts;