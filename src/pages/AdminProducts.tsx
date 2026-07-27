import { useState } from "react";

import "../styles/AdminProducts.css";

import {
  useProducts,
  type Product,
} from "../context/ProductContext";

import AddProductModal from "../components/admin/products/AddProductModal";
import EditProductModal from "../components/admin/products/EditProductModal";
import DeleteProductModal from "../components/admin/products/DeleteProductModal";

function AdminProducts() {
  const {
    products,
    deleteProduct,
  } = useProducts();

  const [showModal, setShowModal] = useState(false);

  const [editingProduct, setEditingProduct] =
    useState<Product | null>(null);

  const [deletingProduct, setDeletingProduct] =
    useState<Product | null>(null);

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const filteredProducts = products.filter(
    (product) =>
      product.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      product.brand
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(
    filteredProducts.length / itemsPerPage
  );

  const startIndex =
    (currentPage - 1) * itemsPerPage;

  const currentProducts =
    filteredProducts.slice(
      startIndex,
      startIndex + itemsPerPage
    );

  function handleDelete() {
    if (!deletingProduct) return;

    deleteProduct(deletingProduct.id);

    setDeletingProduct(null);
  }

  return (
    <section className="admin-products">

      <div className="page-header">

        <h1>Manage Products</h1>

        <button
          onClick={() => setShowModal(true)}
        >
          + Add Product
        </button>

      </div>

      <input
        className="admin-search"
        type="text"
        placeholder="Search Product..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
      />

      {showModal && (
        <AddProductModal
          onClose={() => setShowModal(false)}
        />
      )}

      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
        />
      )}

      {deletingProduct && (
        <DeleteProductModal
          productName={deletingProduct.name}
          onConfirm={handleDelete}
          onCancel={() => setDeletingProduct(null)}
        />
      )}

      <table>

        <thead>

          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>

        </thead>

        <tbody>

          {currentProducts.map((product) => (

            <tr key={product.id}>

              <td>{product.id}</td>

              <td>
                <img
                  src={product.image}
                  alt={product.name}
                />
              </td>

              <td>{product.name}</td>

              <td>{product.brand}</td>

              <td>{product.price} EGP</td>

              <td>{product.stock}</td>

              <td>

                <button
                  className="edit-btn"
                  onClick={() =>
                    setEditingProduct(product)
                  }
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() =>
                    setDeletingProduct(product)
                  }
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      <div className="pagination">

        <button
          disabled={currentPage === 1}
          onClick={() =>
            setCurrentPage(currentPage - 1)
          }
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages || 1}
        </span>

        <button
          disabled={
            currentPage === totalPages ||
            totalPages === 0
          }
          onClick={() =>
            setCurrentPage(currentPage + 1)
          }
        >
          Next
        </button>

      </div>

    </section>
  );
}

export default AdminProducts;