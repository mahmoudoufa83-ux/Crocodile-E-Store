import "../styles/AdminDashboard.css";

import { useNavigate } from "react-router-dom";

import {
  FaBoxOpen,
  FaShoppingBag,
  FaUsers,
  FaMoneyBillWave,
  FaCog,
} from "react-icons/fa";

import { useProducts } from "../context/ProductContext";
import { useOrders } from "../context/OrderContext";

function AdminDashboard() {

  const navigate = useNavigate();

  const { products } = useProducts();

  const { orders } = useOrders();

  const revenue = orders.reduce(
    (total, order) => total + order.total,
    0
  );

  return (

    <section className="admin-page">

      <div className="admin-header">

        <h1>Admin Dashboard</h1>

        <p>Manage your entire store from one place</p>

      </div>

      <div className="stats-grid">

        <div className="stats-card">

          <FaBoxOpen />

          <h2>{products.length}</h2>

          <span>Total Products</span>

        </div>

        <div className="stats-card">

          <FaShoppingBag />

          <h2>{orders.length}</h2>

          <span>Total Orders</span>

        </div>

        <div className="stats-card">

          <FaUsers />

          <h2>1</h2>

          <span>Total Users</span>

        </div>

        <div className="stats-card">

          <FaMoneyBillWave />

          <h2>{revenue.toLocaleString()} EGP</h2>

          <span>Total Revenue</span>

        </div>

      </div>

      <div className="dashboard-grid">

        <div
          className="dashboard-card"
          onClick={() => navigate("/admin/products")}
        >

          <h2>Products</h2>

          <span>Add / Edit / Delete Products</span>

        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/admin/orders")}
        >

          <h2>Orders</h2>

          <span>Manage Customer Orders</span>

        </div>

        <div
          className="dashboard-card"
          onClick={() => alert("Users Page Coming Soon")}
        >

          <h2>Users</h2>

          <span>Manage Registered Users</span>

        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/admin/settings")}
        >

          <FaCog
            style={{
              fontSize: "35px",
              marginBottom: "15px",
            }}
          />

          <h2>Settings</h2>

          <span>Manage Store Settings</span>

        </div>

      </div>

      <div className="admin-bottom">

        <div className="quick-actions">

          <h2>Quick Actions</h2>

          <button
            onClick={() => navigate("/admin")}
          >

            Dashboard

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

          {

            orders.length === 0 ? (

              <p>No Orders Yet</p>

            ) : (

              orders.slice(0, 5).map((order) => (

                <div
                  className="recent-order"
                  key={order.id}
                >

                  <span>#{order.id}</span>

                  <span>
                    {order.total.toLocaleString()} EGP
                  </span>

                </div>

              ))

            )

          }

        </div>

      </div>

    </section>

  );

}

export default AdminDashboard;