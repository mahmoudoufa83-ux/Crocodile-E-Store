import { useState } from "react";

import "../styles/AdminProducts.css";

import { useProducts } from "../context/ProductContext";
import type { Product } from "../types/Product";

import AddProductModal from "../components/admin/products/AddProductModal";
import EditProductModal from "../components/admin/products/EditProductModal";
import DeleteProductModal from "../components/admin/products/DeleteProductModal";

function AdminProducts() {

  const {
    products,
    loading,
    deleteProduct,
  } = useProducts();

  const [showModal, setShowModal] =
    useState(false);

  const [editingProduct, setEditingProduct] =
    useState<Product | null>(null);

  const [deletingProduct, setDeletingProduct] =
    useState<Product | null>(null);

  const [search, setSearch] =
    useState("");

  const [currentPage, setCurrentPage] =
    useState(1);

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

  async function handleDelete() {

    if (!deletingProduct) return;

    await deleteProduct(deletingProduct.id);

    setDeletingProduct(null);

  }

  if (loading) {

    return (

      <section className="admin-products">

        <h2>Loading Products...</h2>

      </section>

    );

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
          onClose={() =>
            setEditingProduct(null)
          }
        />

      )}

      {deletingProduct && (

        <DeleteProductModal
          productName={deletingProduct.name}
          onConfirm={handleDelete}
          onCancel={() =>
            setDeletingProduct(null)
          }
        />

      )}

      {/* Mobile Cards */}

      <div className="mobile-products">

        {currentProducts.length === 0 ? (

          <div className="mobile-product-card">

            <h3>No Products Found</h3>

          </div>

        ) : (

          currentProducts.map((product) => (

            <div
              className="mobile-product-card"
              key={product.id}
            >

              <img
                src={product.image}
                alt={product.name}
              />

              <h3>{product.name}</h3>

              <p>

                <strong>Brand:</strong> {product.brand}

              </p>

              <p>

                <strong>Price:</strong> {product.price.toLocaleString()} EGP

              </p>

              <p>

                <strong>Stock:</strong> {product.stock}

              </p>

              <div className="mobile-product-actions">                <button
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

              </div>

            </div>

          ))

        )}

      </div>

      {/* Desktop Table */}

      <table className="desktop-table">

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

          {currentProducts.length === 0 ? (

            <tr>

              <td
                colSpan={7}
                style={{
                  textAlign: "center",
                  padding: "40px",
                }}
              >

                No Products Found

              </td>

            </tr>

          ) : (

            currentProducts.map((product) => (

              <tr key={product.id}>

                <td>{product.id}</td>

                <td>

                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />

                </td>

                <td>{product.name}</td>

                <td>{product.brand}</td>

                <td>

                  {product.price.toLocaleString()} EGP

                </td>

                <td>{product.stock}</td>

                <td>                  <button
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

            ))

          )}

        </tbody>

      </table>

      <div className="pagination">

        <button
          disabled={currentPage === 1}
          onClick={() =>
            setCurrentPage((prev) => prev - 1)
          }
        >
          Previous
        </button>

        <span>

          Page {currentPage} of {totalPages || 1}

        </span>

        <button
          disabled={
            currentPage >= totalPages ||
            totalPages === 0
          }
          onClick={() =>
            setCurrentPage((prev) => prev + 1)
          }
        >
          Next
        </button>

      </div>

    </section>

  );

}

export default AdminProducts;