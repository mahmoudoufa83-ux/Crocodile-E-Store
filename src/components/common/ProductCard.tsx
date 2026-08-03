import "../../styles/ProductCard.css";

import {
  FaHeart,
  FaShoppingCart,
} from "react-icons/fa";

import { Link } from "react-router-dom";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import type { Product } from "../../types/Product";

function ProductCard({
  product,
}: {
  product: Product;
}) {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const discount =
    (product.oldPrice ?? 0) > (product.price ?? 0)
      ? Math.round(
          (((product.oldPrice ?? 0) -
            (product.price ?? 0)) /
            (product.oldPrice ?? 1)) *
            100
        )
      : 0;

  return (
    <div className="product-card">
      <Link
        to={`/product/${product.id}`}
        className="product-link"
      >
        <div className="product-image">
          {discount > 0 && (
            <span className="discount-badge">
              -{discount}%
            </span>
          )}

          {(product.stock ?? 0) === 0 && (
            <span className="stock-badge">
              Out Of Stock
            </span>
          )}

          <img
            src={
              product.image ||
              "https://via.placeholder.com/300x300?text=No+Image"
            }
            alt={product.name || "Product"}
          />
        </div>
      </Link>

      <button
        className="wishlist-btn"
        onClick={() => addToWishlist(product)}
      >
        <FaHeart />
      </button>

      <div className="product-info">
        <span className="category">
          {product.category || "Unknown"}
        </span>

        <Link
          to={`/product/${product.id}`}
          className="product-title"
        >
          <h3>
            {product.name || "Unnamed Product"}
          </h3>
        </Link>

        <p className="brand">
          {product.brand || "Unknown"}
        </p>

        <div className="price">
          <h2>{product.price ?? 0} EGP</h2>

          {(product.oldPrice ?? 0) >
            (product.price ?? 0) && (
            <span>
              {product.oldPrice} EGP
            </span>
          )}
        </div>

        <button
          className="add-cart"
          disabled={(product.stock ?? 0) === 0}
          onClick={() =>
            addToCart({
              id: product.id,
              name:
                product.name ||
                "Unnamed Product",
              price: product.price ?? 0,
              image:
                product.image ||
                "https://via.placeholder.com/300x300?text=No+Image",
              brand:
                product.brand || "Unknown",
              category:
                product.category || "Unknown",
              stock: product.stock ?? 0,
            })
          }
        >
          <FaShoppingCart />

          {(product.stock ?? 0) > 0
            ? "Add To Cart"
            : "Out Of Stock"}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;