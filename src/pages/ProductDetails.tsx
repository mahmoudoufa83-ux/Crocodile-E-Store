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
  useRef,
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
  const { addToWishlist } = useWishlist();
  const { addViewed } = useRecentlyViewed();

  const [quantity, setQuantity] = useState(1);

  const viewedProductId =
    useRef<string | null>(null);

  const product = products.find(
    (item) =>
      String(item.id) === String(id)
  );

  useEffect(() => {
    if (!product) return;

    const productId = String(product.id);

    if (
      viewedProductId.current ===
      productId
    ) {
      return;
    }

    viewedProductId.current = productId;

    addViewed(product);
  }, [product, addViewed]);

  /*
   * استنى تحميل المنتجات الأول
   * بدل ما نظهر Product Not Found
   * قبل ما Firestore يخلص التحميل.
   */
  if (loading) {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "20px",
          fontWeight: "600",
        }}
      >
        Loading Product...
      </div>
    );
  }

  /*
   * بعد انتهاء التحميل فقط نقرر
   * هل المنتج موجود أم لا.
   */
  if (!product) {
    return (
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
    );
  }

  return (
    <>
      <section className="product-details">
        <div className="details-container">

          {/* =========================
              PRODUCT IMAGE
          ========================= */}

          <div className="details-gallery">

            <div className="main-image">

              <img
                src={product.image}
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
              High quality original product from{" "}
              {product.brand}. Perfect for offices
              and home use.
            </p>

            <div className="quantity-box">

              <button
                onClick={() =>
                  quantity > 1 &&
                  setQuantity(
                    quantity - 1
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
                onClick={() =>
                  quantity < product.stock &&
                  setQuantity(
                    quantity + 1
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

            <div className="buttons">

              <button
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
                      name: product.name,
                      image: product.image,
                      price: product.price,
                      brand: product.brand,
                      category:
                        product.category,
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

              <h3>
                Specifications
              </h3>

              <ul>

                <li>
                  Brand :{" "}
                  {product.brand}
                </li>

                <li>
                  Category :{" "}
                  {product.category}
                </li>

                <li>
                  Rating :{" "}
                  {product.rating}
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