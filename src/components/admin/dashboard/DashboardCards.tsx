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
      value: products.toLocaleString(),
      subtitle: "Available Products",
      trend: "+0%",
      icon: <FaBoxOpen />,
      color: "#8D7B68",
    },
    {
      title: "Orders",
      value: orders.toLocaleString(),
      subtitle: "Total Orders",
      trend: "+0%",
      icon: <FaShoppingCart />,
      color: "#2563EB",
    },
    {
      title: "Customers",
      value: customers.toLocaleString(),
      subtitle: "Registered Customers",
      trend: "+0%",
      icon: <FaUsers />,
      color: "#16A34A",
    },
    {
      title: "Revenue",
      value: `${revenue.toLocaleString()} EGP`,
      subtitle: "Total Revenue",
      trend: "+0%",
      icon: <FaDollarSign />,
      color: "#D97706",
    },
  ];

  return (
    <section className="dashboard-cards">
      {cards.map((card) => (
        <article
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
            <span className="dashboard-card-title">
              {card.title}
            </span>

            <h3>{card.value}</h3>

            <p>{card.subtitle}</p>

            <small>{card.trend} This Month</small>
          </div>
        </article>
      ))}
    </section>
  );
}

export default DashboardCards;