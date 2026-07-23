import { useState } from "react";

import { useProducts } from "../../context/ProductContext";
import type { Product } from "../../context/ProductContext";

import "../../styles/AddProductModal.css";

type Props = {
  onClose: () => void;
};

function AddProductModal({ onClose }: Props) {
  const { addProduct } = useProducts();

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
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleImage(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setForm((prev) => ({
        ...prev,
        image: reader.result as string,
      }));
    };

    reader.readAsDataURL(file);
  }

  function handleSubmit() {
    if (
      !form.name ||
      !form.brand ||
      !form.category ||
      !form.price
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const newProduct: Product = {
      id: Date.now(),
      name: form.name,
      brand: form.brand,
      category: form.category,
      image: form.image,
      price: Number(form.price),
      oldPrice:
        Number(form.oldPrice) ||
        Number(form.price),
      stock:
        Number(form.stock) || 1,
      rating: 5,
    };

    addProduct(newProduct);

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
  }

  return (
    <div className="modal-overlay">

      <div className="modal">

        <h2>Add Product</h2>

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
            onClick={handleSubmit}
          >
            Save
          </button>

        </div>

      </div>

    </div>
  );
}

export default AddProductModal;