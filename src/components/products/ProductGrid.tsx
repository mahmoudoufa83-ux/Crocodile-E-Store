import ProductCard from "../common/ProductCard";

type Props = {
  products: any[];
};

function ProductGrid({ products }: Props) {
  return (
    <div className="products-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}

export default ProductGrid;