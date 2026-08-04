import "../styles/AdminDashboard.css";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "../firebase";

import {
  FaBoxOpen,
  FaShoppingBag,
  FaUsers,
  FaCog,
  FaStar,
} from "react-icons/fa";

import { useProducts } from "../context/ProductContext";
import { useOrders } from "../context/OrderContext";

import DashboardHeader from "../components/admin/dashboard/DashboardHeader";
import DashboardCards from "../components/admin/dashboard/DashboardCards";

type Review = {
  approved?: boolean;
};

function AdminDashboard() {
  const navigate = useNavigate();

  const { products } = useProducts();

  const { orders } = useOrders();

  const [reviewsCount, setReviewsCount] =
    useState(0);

  const [pendingReviews, setPendingReviews] =
    useState(0);

  useEffect(() => {
    loadReviewsStats();
  }, []);

  async function loadReviewsStats() {
    try {
      const snapshot = await getDocs(
        collection(db, "reviews")
      );

      const reviews =
        snapshot.docs.map(
          (doc) => doc.data() as Review
        );

      setReviewsCount(reviews.length);

      setPendingReviews(
        reviews.filter(
          (review) => !review.approved
        ).length
      );
    } catch (error) {
      console.error(error);
    }
  }

  const customers = 1;

  const revenue = orders.reduce(
    (total, order) => total + order.total,
    0
  );

  return (
    <section className="admin-page">

      <DashboardHeader />

      <DashboardCards
        products={products.length}
        orders={orders.length}
        customers={customers}
        revenue={revenue}
        reviews={reviewsCount}
        pendingReviews={pendingReviews}
      />

      <section className="dashboard-grid">

        <article
          className="dashboard-card"
          onClick={() =>
            navigate("/admin/products")
          }
        >
          <div
            className="dashboard-icon"
            style={{
              background: "#8D7B68",
            }}
          >
            <FaBoxOpen />
          </div>

          <h2>Products</h2>

          <span>
            Add, Edit and Delete Products
          </span>
        </article>

        <article
          className="dashboard-card"
          onClick={() =>
            navigate("/admin/orders")
          }
        >
          <div
            className="dashboard-icon"
            style={{
              background: "#2563EB",
            }}
          >
            <FaShoppingBag />
          </div>

          <h2>Orders</h2>

          <span>
            Manage Customer Orders
          </span>
        </article>

        <article
          className="dashboard-card"
          onClick={() =>
            alert(
              "Customers Page Coming Soon"
            )
          }
        >
          <div
            className="dashboard-icon"
            style={{
              background: "#16A34A",
            }}
          >
            <FaUsers />
          </div>

          <h2>Customers</h2>

          <span>
            Manage Registered Customers
          </span>
        </article>

        <article
          className="dashboard-card"
          onClick={() =>
            navigate("/admin/reviews")
          }
        >
          <div
            className="dashboard-icon"
            style={{
              background: "#F59E0B",
            }}
          >
            <FaStar />
          </div>

          <h2>
            Reviews
            {pendingReviews > 0 && (
              <span
                style={{
                  marginLeft: "10px",
                  color: "red",
                  fontSize: "15px",
                }}
              >
                ({pendingReviews})
              </span>
            )}
          </h2>

          <span>
            Approve Customer Reviews
          </span>

        </article>

        <article
          className="dashboard-card"
          onClick={() =>
            navigate("/admin/settings")
          }
        >
          <div
            className="dashboard-icon"
            style={{
              background: "#D97706",
            }}
          >
            <FaCog />
          </div>

          <h2>Settings</h2>

          <span>
            Manage Store Settings
          </span>
        </article>

      </section>

      <section className="admin-bottom">

        <div className="quick-actions">

          <h2>Quick Actions</h2>

          <button
            onClick={() =>
              navigate("/admin/products")
            }
          >
            ➕ Add Product
          </button>

          <button
            onClick={() =>
              navigate("/admin/products")
            }
          >
            📦 Manage Products
          </button>

          <button
            onClick={() =>
              navigate("/admin/orders")
            }
          >
            🛒 Manage Orders
          </button>

          <button
            onClick={() =>
              navigate("/admin/reviews")
            }
          >
            ⭐ Manage Reviews
          </button>

          <button
            onClick={() =>
              navigate("/admin/settings")
            }
          >
            ⚙ Store Settings
          </button>

        </div>

        <div className="recent-orders">

          <h2>Recent Orders</h2>

          {orders.length === 0 ? (

            <p>No Orders Yet</p>

          ) : (

            orders
              .slice(0, 5)
              .map((order) => (

                <div
                  key={order.id}
                  className="recent-order"
                >
                  <span>#{order.id}</span>

                  <strong>
                    {order.total.toLocaleString()} EGP
                  </strong>
                </div>

              ))

          )}

        </div>

      </section>

    </section>
  );
}

export default AdminDashboard;