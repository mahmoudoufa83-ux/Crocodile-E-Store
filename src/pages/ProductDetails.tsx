import "../styles/ProductDetails.css";

import {
  FaShoppingCart,
  FaHeart,
  FaStar,
  FaMinus,
  FaPlus,
} from "react-icons/fa";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useRecentlyViewed } from "../context/RecentlyViewedContext";

import RelatedProducts from "../components/products/RelatedProducts";
import RecentlyViewed from "../components/products/RecentlyViewed";

function ProductDetails() {
  const { id } = useParams();

  const { products } = useProducts();

  const product = products.find(
    (item) => item.id === id
  );

  const { addToCart } = useCart();

  const { addToWishlist } = useWishlist();

  const { addViewed } = useRecentlyViewed();

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      addViewed(product);
    }
  }, [product, addViewed]);

  if (!product) {
    return (
      <section className="details-page">
        <h1>Product Not Found</h1>
      </section>
    );
  }

  return (
    <>
      <section className="details-page">
        <div className="details-container">
          <div className="details-gallery">
            <div className="main-image">
              <img
                src={product.image}
                alt={product.name}
              />
            </div>
          </div>

          <div className="details-info">
            <span className="brand">
              {product.brand}
            </span>

            <h1>{product.name}</h1>

            <div className="rating">
              <FaStar />
              <span>{product.rating}</span>
            </div>

            <div className="price">
              <h2>{product.price} EGP</h2>

              <span>{product.oldPrice} EGP</span>
            </div>

            <div
              className={`stock ${
                product.stock > 0
                  ? "available"
                  : "unavailable"
              }`}
            >
              {product.stock > 0
                ? "✔ Available"
                : "✖ Out Of Stock"}
            </div>

            <p className="description">
              High quality original product from{" "}
              {product.brand}. Perfect for offices
              and home use.
            </p>

            <div className="quantity-box">
              <button
                onClick={() =>
                  quantity > 1 &&
                  setQuantity(quantity - 1)
                }
              >
                <FaMinus />
              </button>

              <span>{quantity}</span>

              <button
                onClick={() =>
                  quantity < product.stock &&
                  setQuantity(quantity + 1)
                }
              >
                <FaPlus />
              </button>
            </div>

            <div className="buttons">
              <button
                className="cart-btn"
                onClick={() => {
                  for (
                    let i = 0;
                    i < quantity;
                    i++
                  ) {
                    addToCart({
                      id: product.id,
                      name: product.name,
                      image: product.image,
                      price: product.price,
                      brand: product.brand,
                      category: product.category,
                      stock: product.stock,
                    });
                  }
                }}
              >
                <FaShoppingCart />
                Add To Cart
              </button>

              <button
                className="wish-btn"
                onClick={() =>
                  addToWishlist(product)
                }
              >
                <FaHeart />
              </button>
            </div>

            <div className="specs">
              <h3>Specifications</h3>

              <ul>
                <li>
                  Brand : {product.brand}
                </li>

                <li>
                  Category : {product.category}
                </li>

                <li>
                  Rating : {product.rating}
                </li>

                <li>
                  Availability :{" "}
                  {product.stock > 0
                    ? "Available"
                    : "Out Of Stock"}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <RelatedProducts
        category={product.category}
        currentId={product.id}
      />

      <RecentlyViewed />
    </>
  );
}

export default ProductDetails;