import "../styles/ProductDetails.css";

import {
  FaShoppingCart,
  FaHeart,
  FaStar,
  FaMinus,
  FaPlus,
} from "react-icons/fa";

import {
  useState,
  useEffect,
} from "react";

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
  const { addToWishlist } =
    useWishlist();

  const { addViewed } =
    useRecentlyViewed();

  const [quantity, setQuantity] =
    useState(1);

  /*
   * مهم جداً:
   * الـ ID القادم من URL يكون String
   * بينما Firestore ممكن يكون String أو Number.
   *
   * لذلك نقارن بعد تحويل الاثنين إلى String.
   */
  const product = products.find(
    (item) =>
      String(item.id) === String(id)
  );

  /*
   * حفظ المنتج في Recently Viewed
   */
  useEffect(() => {
    if (product) {
      addViewed(product);
    }
  }, [product, addViewed]);

  /*
   * أثناء تحميل المنتجات
   */
  if (loading) {
    return (
      <section className="product-details">
        <div className="product-details-container">
          <div className="product-loading">
            Loading Product...
          </div>
        </div>
      </section>
    );
  }

  /*
   * بعد انتهاء التحميل:
   * لو المنتج غير موجود
   */
  if (!product) {
    return (
      <section className="product-details">
        <div className="product-details-container">
          <div className="product-not-found">
            <h2>
              Product Not Found
            </h2>

            <p>
              The product you are
              looking for does not
              exist.
            </p>
          </div>
        </div>
      </section>
    );
  }

  /*
   * لو المنتج موجود
   */

  return (
    <>
      <section className="product-details">
        <div className="product-details-container">

          {/* =========================
              PRODUCT IMAGE
          ========================== */}

          <div className="details-gallery">

            <div className="main-image">

              <img
                src={
                  product.image ||
                  "https://via.placeholder.com/600x600?text=No+Image"
                }
                alt={
                  product.name ||
                  "Product"
                }
                loading="eager"
                decoding="async"
              />

            </div>

          </div>

          {/* =========================
              PRODUCT INFO
          ========================== */}

          <div className="details-info">

            <span className="brand">
              {product.brand ||
                "Unknown"}
            </span>

            <h1>
              {product.name ||
                "Unnamed Product"}
            </h1>

            <div className="rating">

              <FaStar />

              <span>
                {product.rating ?? 0}
              </span>

            </div>

            <div className="price">

              <h2>
                {product.price ?? 0} EGP
              </h2>

              {product.oldPrice && (
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
              High quality original
              product from{" "}
              {product.brand ||
                "our store"}
              . Perfect for offices
              and home use.
            </p>

            {/* =========================
                QUANTITY
            ========================== */}

            <div className="quantity-box">

              <button
                type="button"
                onClick={() => {
                  if (quantity > 1) {
                    setQuantity(
                      quantity - 1
                    );
                  }
                }}
                disabled={
                  quantity <= 1
                }
              >
                <FaMinus />
              </button>

              <span>
                {quantity}
              </span>

              <button
                type="button"
                onClick={() => {
                  if (
                    quantity <
                    product.stock
                  ) {
                    setQuantity(
                      quantity + 1
                    );
                  }
                }}
                disabled={
                  product.stock <= 0 ||
                  quantity >=
                    product.stock
                }
              >
                <FaPlus />
              </button>

            </div>

            {/* =========================
                BUTTONS
            ========================== */}

            <div className="buttons">

              <button
                type="button"
                className="cart-btn"
                disabled={
                  product.stock <= 0
                }
                onClick={() => {

                  for (
                    let i = 0;
                    i < quantity;
                    i++
                  ) {
                    addToCart({
                      id: product.id,
                      name:
                        product.name,
                      image:
                        product.image,
                      price:
                        product.price,
                      brand:
                        product.brand,
                      category:
                        product.category,
                      stock:
                        product.stock,
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
                  addToWishlist(
                    product
                  )
                }
              >
                <FaHeart />
              </button>

            </div>

            {/* =========================
                SPECIFICATIONS
            ========================== */}

            <div className="specs">

              <h3>
                Specifications
              </h3>

              <ul>

                <li>
                  Brand :{" "}
                  {product.brand ||
                    "Unknown"}
                </li>

                <li>
                  Category :{" "}
                  {product.category ||
                    "Unknown"}
                </li>

                <li>
                  Rating :{" "}
                  {product.rating ?? 0}
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

      {/* =========================
          RELATED PRODUCTS
      ========================== */}

      <RelatedProducts
        category={
          product.category
        }
        currentId={product.id}
      />

      {/* =========================
          RECENTLY VIEWED
      ========================== */}

      <RecentlyViewed />
    </>
  );
}

export default ProductDetails;