import "../styles/AdminDashboard.css";

import { useNavigate } from "react-router-dom";

import { FaCog } from "react-icons/fa";

import { useProducts } from "../context/ProductContext";
import { useOrders } from "../context/OrderContext";

import DashboardHeader from "../components/admin/dashboard/DashboardHeader";
import DashboardCards from "../components/admin/dashboard/DashboardCards";

function AdminDashboard() {
  const navigate = useNavigate();

  const { products } = useProducts();

  const { orders } = useOrders();

  // مؤقتًا لحد ما نربط المستخدمين من Firestore
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
      />

      <div className="dashboard-grid">

        <div
          className="dashboard-card"
          onClick={() => navigate("/admin/products")}
        >
          <h2>Products</h2>

          <span>
            Add, Edit and Delete Products
          </span>
        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/admin/orders")}
        >
          <h2>Orders</h2>

          <span>
            Manage Customer Orders
          </span>
        </div>

        <div
          className="dashboard-card"
          onClick={() => alert("Customers Page Coming Soon")}
        >
          <h2>Customers</h2>

          <span>
            Manage Registered Customers
          </span>
        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/admin/settings")}
        >
          <FaCog
            style={{
              fontSize: "36px",
              marginBottom: "15px",
            }}
          />

          <h2>Settings</h2>

          <span>
            Manage Store Settings
          </span>
        </div>

      </div>

      <div className="admin-bottom">

        <div className="quick-actions">

          <h2>Quick Actions</h2>

          <button
            onClick={() => navigate("/admin/products")}
          >
            Add Product
          </button>

          <button
            onClick={() => navigate("/admin/products")}
          >
            Manage Products
          </button>

          <button
            onClick={() => navigate("/admin/orders")}
          >
            Manage Orders
          </button>

          <button
            onClick={() => navigate("/admin/settings")}
          >
            Store Settings
          </button>

        </div>

        <div className="recent-orders">

          <h2>Recent Orders</h2>

          {orders.length === 0 ? (

            <p>No Orders Yet</p>

          ) : (

            orders.slice(0, 5).map((order) => (

              <div
                key={order.id}
                className="recent-order"
              >

                <span>
                  #{order.id}
                </span>

                <span>
                  {order.total.toLocaleString()} EGP
                </span>

              </div>

            ))

          )}

        </div>

      </div>

    </section>
  );
}

export default AdminDashboard;