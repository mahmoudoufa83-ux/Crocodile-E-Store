import {
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaDollarSign,
  FaStar,
} from "react-icons/fa";

type Props = {
  products: number;
  orders: number;
  customers: number;
  revenue: number;

  reviews: number;
  pendingReviews: number;
};

function DashboardCards({
  products,
  orders,
  customers,
  revenue,
  reviews,
  pendingReviews,
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

    {
      title: "Reviews",
      value: reviews.toLocaleString(),
      subtitle:
        pendingReviews === 0
          ? "All Reviews Approved"
          : `${pendingReviews} Pending Review${
              pendingReviews > 1 ? "s" : ""
            }`,
      trend:
        pendingReviews === 0
          ? "Approved"
          : "Needs Review",
      icon: <FaStar />,
      color: "#F59E0B",
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

            <small
              style={{
                color:
                  card.title === "Reviews" &&
                  pendingReviews > 0
                    ? "#DC2626"
                    : undefined,
              }}
            >
              {card.trend}
            </small>

          </div>

        </article>

      ))}

    </section>
  );
}

export default DashboardCards;