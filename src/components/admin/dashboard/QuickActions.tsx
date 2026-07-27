import {
  FaArrowRight,
  FaBoxOpen,
  FaShoppingBag,
  FaTags,
  FaBuilding,
  FaUsers,
  FaCog,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Products",
      description: "Add, edit and manage products",
      icon: <FaBoxOpen />,
      path: "/admin/products",
      color: "#8D7B68",
    },
    {
      title: "Orders",
      description: "View and manage customer orders",
      icon: <FaShoppingBag />,
      path: "/admin/orders",
      color: "#2563EB",
    },
    {
      title: "Categories",
      description: "Manage store categories",
      path: "/admin/categories",
      icon: <FaTags />,
      color: "#16A34A",
    },
    {
      title: "Brands",
      description: "Manage product brands",
      path: "/admin/brands",
      icon: <FaBuilding />,
      color: "#D97706",
    },
    {
      title: "Customers",
      description: "View registered customers",
      path: "/admin/customers",
      icon: <FaUsers />,
      color: "#9333EA",
    },
    {
      title: "Settings",
      description: "Store configuration",
      path: "/admin/settings",
      icon: <FaCog />,
      color: "#232323",
    },
  ];

  return (
    <section className="quick-actions-card">
      <div className="section-header">
        <h2>Quick Actions</h2>
        <p>Navigate quickly through the admin panel.</p>
      </div>

      <div className="quick-actions-grid">
        {actions.map((action) => (
          <div
            key={action.title}
            className="quick-action-item"
            onClick={() => navigate(action.path)}
          >
            <div
              className="quick-action-icon"
              style={{
                background: action.color,
              }}
            >
              {action.icon}
            </div>

            <div className="quick-action-content">
              <h3>{action.title}</h3>

              <p>{action.description}</p>
            </div>

            <FaArrowRight className="quick-action-arrow" />
          </div>
        ))}
      </div>
    </section>
  );
}

export default QuickActions;