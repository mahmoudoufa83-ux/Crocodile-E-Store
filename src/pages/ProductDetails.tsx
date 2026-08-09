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

  const {
    products,
    loading,
  } = useProducts();

  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const { addViewed } = useRecentlyViewed();

  const [quantity, setQuantity] = useState(1);

  /*
   * useParams بيرجع id كـ string.
   * Product.id ممكن يكون string أو number.
   * لذلك بنحوّل الاثنين إلى String قبل المقارنة.
   */
  const product = products.find(
    (item) => String(item.id) === String(id)
  );

  /*
   * لما ننتقل من منتج لمنتج،
   * نرجع الكمية إلى 1.
   */
  useEffect(() => {
    setQuantity(1);
  }, [id]);

  /*
   * إضافة المنتج إلى Recently Viewed
   */
  useEffect(() => {
    if (product) {
      addViewed(product);
    }
  }, [product, addViewed]);

  /*
   * نستنى تحميل المنتجات في البداية.
   */
  if (loading) {
    return (
      <section className="details-page">
        <div
          style={{
            minHeight: "60vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "22px",
            fontWeight: "600",
          }}
        >
          Loading Product...
        </div>
      </section>
    );
  }

  /*
   * بعد انتهاء التحميل فقط نقرر
   * هل المنتج موجود أم لا.
   */
  if (!product) {
    return (
      <section className="details-page">
        <div
          style={{
            minHeight: "60vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "22px",
            fontWeight: "600",
          }}
        >
          Product Not Found
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="details-page">
        <div className="details-container">

          {/* =========================
              PRODUCT IMAGE
          ========================= */}

          <div className="details-gallery">

            <div className="main-image">

              <img
                src={
                  product.image ||
                  "https://via.placeholder.com/600x600?text=No+Image"
                }
                alt={product.name}
                loading="eager"
                decoding="async"
              />

            </div>

          </div>

          {/* =========================
              PRODUCT INFO
          ========================= */}

          <div className="details-info">

            <span className="brand">
              {product.brand}
            </span>

            <h1>
              {product.name}
            </h1>

            <div className="rating">

              <FaStar />

              <span>
                {product.rating}
              </span>

            </div>

            <div className="price">

              <h2>
                {product.price} EGP
              </h2>

              {product.oldPrice &&
                product.oldPrice > product.price && (
                  <span>
                    {product.oldPrice} EGP
                  </span>
                )}

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

            {/* =========================
                QUANTITY
            ========================= */}

            <div className="quantity-box">

              <button
                type="button"
                onClick={() =>
                  setQuantity((prev) =>
                    prev > 1
                      ? prev - 1
                      : 1
                  )
                }
                disabled={quantity <= 1}
              >
                <FaMinus />
              </button>

              <span>
                {quantity}
              </span>

              <button
                type="button"
                onClick={() =>
                  setQuantity((prev) =>
                    prev < product.stock
                      ? prev + 1
                      : prev
                  )
                }
                disabled={
                  product.stock <= 0 ||
                  quantity >= product.stock
                }
              >
                <FaPlus />
              </button>

            </div>

            {/* =========================
                ACTION BUTTONS
            ========================= */}

            <div className="buttons">

              <button
                type="button"
                className="cart-btn"
                disabled={product.stock <= 0}
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
                type="button"
                className="wish-btn"
                onClick={() =>
                  addToWishlist(product)
                }
              >
                <FaHeart />
              </button>

            </div>

            {/* =========================
                SPECIFICATIONS
            ========================= */}

            <div className="specs">

              <h3>
                Specifications
              </h3>

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