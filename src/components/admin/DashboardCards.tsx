import {
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaDollarSign,
} from "react-icons/fa";

type Props = {
  products: number;
  orders: number;
  customers: number;
  revenue: number;
};

function DashboardCards({
  products,
  orders,
  customers,
  revenue,
}: Props) {
  const cards = [
    {
      title: "Products",
      value: products,
      icon: <FaBoxOpen />,
      color: "#8D7B68",
    },
    {
      title: "Orders",
      value: orders,
      icon: <FaShoppingCart />,
      color: "#2563eb",
    },
    {
      title: "Customers",
      value: customers,
      icon: <FaUsers />,
      color: "#16a34a",
    },
    {
      title: "Revenue",
      value: `${revenue} EGP`,
      icon: <FaDollarSign />,
      color: "#d97706",
    },
  ];

  return (
    <div className="dashboard-cards">
      {cards.map((card) => (
        <div
          key={card.title}
          className="dashboard-card"
        >
          <div
            className="dashboard-icon"
            style={{
              background: card.color,
            }}
          >
            {card.icon}
          </div>

          <div className="dashboard-info">
            <h3>{card.value}</h3>
            <span>{card.title}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashboardCards;