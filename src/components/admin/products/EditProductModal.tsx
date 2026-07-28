import { useState } from "react";

import {
  useProducts,
  type Product,
} from "../../../context/ProductContext";

import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

import { storage } from "../../../firebase";

import "../../../styles/AddProductModal.css";

type Props = {
  product: Product;
  onClose: () => void;
};

function EditProductModal({
  product,
  onClose,
}: Props) {

  const { updateProduct } =
    useProducts();

  const [uploading, setUploading] =
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

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  }

  async function handleImage(
    e: React.ChangeEvent<HTMLInputElement>
  ) {

    const file = e.target.files?.[0];

    if (!file) return;

    try {

      setUploading(true);

      const fileName =
        `products/${Date.now()}-${file.name}`;

      const imageRef =
        ref(storage, fileName);

      await uploadBytes(
        imageRef,
        file
      );

      const url =
        await getDownloadURL(imageRef);

      setForm((prev) => ({
        ...prev,
        image: url,
      }));

    } catch (error) {

      console.error(error);

      alert("Image upload failed");

    } finally {

      setUploading(false);

    }

  }

  async function handleSubmit() {

    if (
      !form.name ||
      !form.brand ||
      !form.category ||
      !form.price ||
      !form.image
    ) {

      alert(
        "Please fill all required fields."
      );

      return;

    }

    await updateProduct({
      ...product,
      name: form.name,
      brand: form.brand,
      category: form.category,
      image: form.image,
      price: Number(form.price),
      oldPrice:
        Number(form.oldPrice),
      stock:
        Number(form.stock),
      rating: product.rating,
    });

    onClose();

  }

  return (

    <div className="modal-overlay">

      <div className="modal">

        <h2>Edit Product</h2>

        <input
          name="name"
          value={form.name}
          placeholder="Product Name"
          onChange={handleChange}
        />

        <input
          name="brand"
          value={form.brand}
          placeholder="Brand"
          onChange={handleChange}
        />

        <input
          name="category"
          value={form.category}
          placeholder="Category"
          onChange={handleChange}
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
        />

        {uploading && (
          <p>Uploading image...</p>
        )}

        {form.image && (

          <img
            src={form.image}
            alt="Preview"
            style={{
              width: "120px",
              height: "120px",
              objectFit: "cover",
              borderRadius: "10px",
              margin: "10px auto",
              display: "block",
            }}
          />

        )}

        <input
          name="price"
          type="number"
          value={form.price}
          placeholder="Price"
          onChange={handleChange}
        />

        <input
          name="oldPrice"
          type="number"
          value={form.oldPrice}
          placeholder="Old Price"
          onChange={handleChange}
        />

        <input
          name="stock"
          type="number"
          value={form.stock}
          placeholder="Stock"
          onChange={handleChange}
        />

        <div className="modal-buttons">

          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="save-btn"
            disabled={uploading}
            onClick={handleSubmit}
          >
            {uploading
              ? "Uploading..."
              : "Save Changes"}
          </button>

        </div>

      </div>

    </div>

  );

}

export default EditProductModal;