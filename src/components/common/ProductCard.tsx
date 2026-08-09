import "../../styles/ProductCard.css";

import {
  FaHeart,
  FaShoppingCart,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import type { Product } from "../../types/Product";

function ProductCard({
  product,
}: {
  product: Product;
}) {
  const navigate = useNavigate();

  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const discount =
    (product.oldPrice ?? 0) >
    (product.price ?? 0)
      ? Math.round(
          (((product.oldPrice ?? 0) -
            (product.price ?? 0)) /
            (product.oldPrice ?? 1)) *
            100
        )
      : 0;

  const productPath = `/product/${String(
    product.id
  )}`;

  function openProduct() {
    navigate(productPath);
  }

  function handleWishlist(
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    event.stopPropagation();
    event.preventDefault();

    addToWishlist(product);
  }

  function handleAddToCart(
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    event.stopPropagation();
    event.preventDefault();

    if ((product.stock ?? 0) === 0) {
      return;
    }

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
    });
  }

  return (
    <div className="product-card">

      {/* =========================
          PRODUCT IMAGE
      ========================= */}

      <div
        className="product-image"
        onClick={openProduct}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (
            event.key === "Enter" ||
            event.key === " "
          ) {
            openProduct();
          }
        }}
      >

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
          alt={
            product.name || "Product"
          }
        />

      </div>

      {/* =========================
          WISHLIST
      ========================= */}

      <button
        type="button"
        className="wishlist-btn"
        onClick={handleWishlist}
        aria-label="Add to wishlist"
      >
        <FaHeart />
      </button>

      {/* =========================
          PRODUCT INFO
      ========================= */}

      <div className="product-info">

        <span className="category">
          {product.category ||
            "Unknown"}
        </span>

        <button
          type="button"
          className="product-title"
          onClick={openProduct}
        >
          <h3>
            {product.name ||
              "Unnamed Product"}
          </h3>
        </button>

        <p className="brand">
          {product.brand ||
            "Unknown"}
        </p>

        <div className="price">

          <h2>
            {product.price ?? 0} EGP
          </h2>

          {(product.oldPrice ?? 0) >
            (product.price ?? 0) && (
            <span>
              {product.oldPrice} EGP
            </span>
          )}

        </div>

        {/* =========================
            ADD TO CART
        ========================= */}

        <button
          type="button"
          className="add-cart"
          disabled={
            (product.stock ?? 0) === 0
          }
          onClick={handleAddToCart}
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