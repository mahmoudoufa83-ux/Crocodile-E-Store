import "../../styles/ProductCard.css";

import {
  FaHeart,
  FaShoppingCart,
  FaStar,
} from "react-icons/fa";

import { Link } from "react-router-dom";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

type Product = {
  id: number;
  name: string;
  category: string;
  brand: string;
  price: number;
  oldPrice: number;
  rating: number;
  stock: number;
  image: string;
};

function ProductCard({
  product,
}: {
  product: Product;
}) {

  const { addToCart } = useCart();

  const { addToWishlist } = useWishlist();

  const discount =
    product.oldPrice > product.price
      ? Math.round(
          ((product.oldPrice - product.price) /
            product.oldPrice) *
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

          {product.stock === 0 && (

            <span className="stock-badge">

              Out Of Stock

            </span>

          )}

          <img
            src={product.image}
            alt={product.name}
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

          {product.category}

        </span>

        <Link
          to={`/product/${product.id}`}
          className="product-title"
        >

          <h3>

            {product.name}

          </h3>

        </Link>

        <p className="brand">

          {product.brand}

        </p>

        <div className="rating">

          <FaStar />

          <span>

            {product.rating}

          </span>

          <small>

            ({Math.floor(product.rating * 18)} Reviews)

          </small>

        </div>

        <div className="price">

          <h2>

            {product.price} EGP

          </h2>

          {product.oldPrice > product.price && (

            <span>

              {product.oldPrice} EGP

            </span>

          )}

        </div>

        <button

          className="add-cart"

          disabled={product.stock === 0}

          onClick={() =>

            addToCart({

              id: product.id,

              name: product.name,

              price: product.price,

              image: product.image,

              brand: product.brand,

              category: product.category,

              stock: product.stock,

            })

          }

        >

          <FaShoppingCart />

          {product.stock > 0

            ? "Add To Cart"

            : "Out Of Stock"}

        </button>

      </div>

    </div>

  );

}

export default ProductCard;