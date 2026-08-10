import { useState } from "react";

import {
  useProducts,
  type Product,
} from "../../../context/ProductContext";

import { uploadImage } from "../../../services/cloudinary";

import "../../../styles/AddProductModal.css";

type Props = {
  onClose: () => void;
};

function AddProductModal({ onClose }: Props) {
  const { addProduct } = useProducts();

  const [uploading, setUploading] = useState(false);

  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    brand: "",
    category: "",
    image: "",
    price: "",
    oldPrice: "",
    stock: "",
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

      const imageUrl = await uploadImage(file);

      setForm((prev) => ({
        ...prev,
        image: imageUrl,
      }));
    } catch (error) {
      console.error("Image upload failed:", error);

      alert("Image upload failed. Please try again.");
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
      alert("Please complete all required fields.");
      return;
    }

    try {
      setSaving(true);

      const newProduct: Product = {
        id: Date.now().toString(),

        name: form.name.trim(),

        brand: form.brand.trim(),

        category: form.category.trim(),

        image: form.image,

        price: Number(form.price),

        oldPrice:
          Number(form.oldPrice) ||
          Number(form.price),

        stock:
          form.stock === ""
            ? 1
            : Number(form.stock),

        rating: 5,
      };

      await addProduct(newProduct);

      setForm({
        name: "",
        brand: "",
        category: "",
        image: "",
        price: "",
        oldPrice: "",
        stock: "",
      });

      onClose();
    } catch (error) {
      console.error(
        "Failed to save product:",
        error
      );

      alert("Failed to save product.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal add-product-modal">

        {/* HEADER */}
        <div className="modal-header">
          <h2>Add Product</h2>

          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            disabled={uploading || saving}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* FORM */}
        <div className="modal-form">

          <div className="form-group">
            <label>
              Product Name
            </label>

            <input
              name="name"
              value={form.name}
              placeholder="Product Name"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>
              Brand
            </label>

            <input
              name="brand"
              value={form.brand}
              placeholder="Brand"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>
              Category
            </label>

            <input
              name="category"
              value={form.category}
              placeholder="Category"
              onChange={handleChange}
            />
          </div>

          {/* IMAGE */}
          <div className="form-group">
            <label>
              Product Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              disabled={uploading || saving}
            />

            {uploading && (
              <p className="upload-status">
                Uploading image to Cloudinary...
              </p>
            )}

            {form.image && (
              <div className="image-preview">
                <img
                  src={form.image}
                  alt="Product Preview"
                />
              </div>
            )}
          </div>

          <div className="form-row">

            <div className="form-group">
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
              />
            </div>

            <div className="form-group">
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
              />
            </div>

          </div>

          <div className="form-group">
            <label>
              Stock
            </label>

            <input
              name="stock"
              type="number"
              min="0"
              value={form.stock}
              placeholder="Stock Quantity"
              onChange={handleChange}
            />
          </div>

        </div>

        {/* BUTTONS */}
        <div className="modal-buttons">

          <button
            type="button"
            className="cancel-btn"
            onClick={onClose}
            disabled={uploading || saving}
          >
            Cancel
          </button>

          <button
            type="button"
            className="save-btn"
            disabled={
              uploading || saving
            }
            onClick={handleSubmit}
          >
            {uploading
              ? "Uploading..."
              : saving
              ? "Saving..."
              : "Save Product"}
          </button>

        </div>

      </div>
    </div>
  );
}

export default AddProductModal;