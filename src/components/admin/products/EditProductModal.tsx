import { useState } from "react";

import {
  useProducts,
  type Product,
} from "../../../context/ProductContext";

import { uploadImage } from "../../../services/cloudinary";

import "../../../styles/EditProductModal.css";

type Props = {
  product: Product;
  onClose: () => void;
};

function EditProductModal({
  product,
  onClose,
}: Props) {
  const { updateProduct } = useProducts();

  const [uploading, setUploading] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  const [form, setForm] = useState({
    name: product.name,
    brand: product.brand,
    category: product.category,
    image: product.image,
    price: product.price.toString(),
    oldPrice: product.oldPrice.toString(),
    stock: product.stock.toString(),
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleImage(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setUploading(true);

      // رفع الصورة الجديدة على Cloudinary
      const imageUrl = await uploadImage(file);

      setForm((prev) => ({
        ...prev,
        image: imageUrl,
      }));
    } catch (error) {
      console.error(
        "Image upload failed:",
        error
      );

      alert(
        "Image upload failed. Please try again."
      );
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit() {
    if (
      !form.name.trim() ||
      !form.brand.trim() ||
      !form.category.trim() ||
      !form.price ||
      !form.image
    ) {
      alert(
        "Please fill all required fields."
      );

      return;
    }

    const price = Number(form.price);
    const oldPrice = Number(form.oldPrice);
    const stock = Number(form.stock);

    if (
      Number.isNaN(price) ||
      price < 0
    ) {
      alert("Please enter a valid price.");
      return;
    }

    if (
      Number.isNaN(oldPrice) ||
      oldPrice < 0
    ) {
      alert(
        "Please enter a valid old price."
      );
      return;
    }

    if (
      Number.isNaN(stock) ||
      stock < 0
    ) {
      alert(
        "Please enter a valid stock quantity."
      );
      return;
    }

    try {
      setSaving(true);

      await updateProduct({
        ...product,

        name: form.name.trim(),
        brand: form.brand.trim(),
        category: form.category.trim(),

        // لو مفيش صورة جديدة هتفضل الصورة القديمة
        image: form.image,

        price,
        oldPrice,
        stock,

        rating: product.rating,
      });

      onClose();
    } catch (error) {
      console.error(
        "Failed to update product:",
        error
      );

      alert(
        "Failed to update product. Please try again."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      className="edit-modal-overlay"
      onClick={onClose}
    >
      <div
        className="edit-modal"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        {/* Header */}
        <div className="edit-modal-header">
          <div>
            <h2>Edit Product</h2>

            <p>
              Update product information
            </p>
          </div>

          <button
            type="button"
            className="edit-modal-close"
            onClick={onClose}
            disabled={saving}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <div className="edit-modal-body">

          <div className="edit-form-group">
            <label>
              Product Name
            </label>

            <input
              name="name"
              value={form.name}
              placeholder="Product Name"
              onChange={handleChange}
              disabled={saving}
            />
          </div>

          <div className="edit-form-group">
            <label>
              Brand
            </label>

            <input
              name="brand"
              value={form.brand}
              placeholder="Brand"
              onChange={handleChange}
              disabled={saving}
            />
          </div>

          <div className="edit-form-group">
            <label>
              Category
            </label>

            <input
              name="category"
              value={form.category}
              placeholder="Category"
              onChange={handleChange}
              disabled={saving}
            />
          </div>

          {/* Image */}
          <div className="edit-form-group">
            <label>
              Product Image
            </label>

            <div className="edit-image-section">

              {form.image && (
                <div className="edit-image-preview">
                  <img
                    src={form.image}
                    alt={form.name}
                  />
                </div>
              )}

              <label className="edit-image-upload">
                <span>
                  {uploading
                    ? "Uploading image..."
                    : "Choose New Image"}
                </span>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                  disabled={
                    uploading ||
                    saving
                  }
                />
              </label>

              <small>
                Leave it unchanged if you
                don't want to replace the
                current image.
              </small>

            </div>
          </div>

          {/* Prices */}
          <div className="edit-form-row">

            <div className="edit-form-group">
              <label>
                Price
              </label>

              <input
                name="price"
                type="number"
                min="0"
                value={form.price}
                placeholder="Price"
                onChange={handleChange}
                disabled={saving}
              />
            </div>

            <div className="edit-form-group">
              <label>
                Old Price
              </label>

              <input
                name="oldPrice"
                type="number"
                min="0"
                value={form.oldPrice}
                placeholder="Old Price"
                onChange={handleChange}
                disabled={saving}
              />
            </div>

          </div>

          {/* Stock */}
          <div className="edit-form-group">
            <label>
              Stock
            </label>

            <input
              name="stock"
              type="number"
              min="0"
              value={form.stock}
              placeholder="Stock"
              onChange={handleChange}
              disabled={saving}
            />
          </div>

        </div>

        {/* Footer */}
        <div className="edit-modal-footer">

          <button
            type="button"
            className="edit-cancel-btn"
            onClick={onClose}
            disabled={saving}
          >
            Cancel
          </button>

          <button
            type="button"
            className="edit-save-btn"
            disabled={
              uploading || saving
            }
            onClick={handleSubmit}
          >
            {saving
              ? "Saving..."
              : uploading
              ? "Uploading..."
              : "Save Changes"}
          </button>

        </div>

      </div>
    </div>
  );
}

export default EditProductModal;