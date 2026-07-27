import { FaPlus, FaStore } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import "../../../styles/AdminDashboard.css";

function DashboardHeader() {
  const navigate = useNavigate();

  const storeName = "Crocodile E-Store";

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 18) {
    greeting = "Good Afternoon";
  }

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <section className="dashboard-header">
      <div className="dashboard-header-left">
        <span className="dashboard-welcome">
          👋 {greeting}
        </span>

        <h1>{storeName} Admin Panel</h1>

        <p>
          Manage products, orders, customers and store settings
          from one centralized dashboard.
        </p>

        <div className="dashboard-info">
          <span>📅 {today}</span>

          <span className="store-status">
            <span className="status-dot"></span>
            Store Online
          </span>
        </div>
      </div>

      <div className="dashboard-header-right">
        <button
          type="button"
          className="primary-btn"
          onClick={() => navigate("/admin/products")}
        >
          <FaPlus />
          <span>Add Product</span>
        </button>

        <button
          type="button"
          className="secondary-btn"
          onClick={() => window.open("/", "_blank")}
        >
          <FaStore />
          <span>View Store</span>
        </button>
      </div>
    </section>
  );
}

export default DashboardHeader;