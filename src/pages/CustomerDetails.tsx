import "../styles/AdminProducts.css";

import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useOrders } from "../context/OrderContext";

function CustomerDetails() {
  const navigate = useNavigate();

  const { id } = useParams();

  const {
    orders,
    loading,
    updateOrderStatus,
    deleteOrder,
  } = useOrders();

  const customerOrders = useMemo(() => {

    return orders.filter(
      (order) =>
        order.userId === id ||
        order.email === id
    );

  }, [orders, id]);

  const customer = customerOrders[0];

  const totalSpent = customerOrders.reduce(
    (sum, order) => sum + order.total,
    0
  );

  if (loading) {

    return (
      <section className="admin-products">

        <h2>Loading...</h2>

      </section>
    );

  }

  if (!customer) {

    return (

      <section className="admin-products">

        <button
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <h2>Customer Not Found</h2>

      </section>

    );

  }

  return (

    <section className="admin-products">

      <div className="admin-header">

        <div>

          <button
            onClick={() => navigate(-1)}
            style={{
              marginBottom: "15px",
            }}
          >
            ← Back
          </button>

          <h1>

            {customer.customerName}

          </h1>

          <p>

            Customer Details

          </p>

        </div>

      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >

        <div className="dashboard-card">

          <h3>Email</h3>

          <p>{customer.email}</p>

        </div>

        <div className="dashboard-card">

          <h3>Phone</h3>

          <p>{customer.phone}</p>

        </div>

        <div className="dashboard-card">

          <h3>City</h3>

          <p>{customer.city}</p>

        </div>

        <div className="dashboard-card">

          <h3>Total Orders</h3>

          <p>{customerOrders.length}</p>

        </div>

        <div className="dashboard-card">

          <h3>Total Spent</h3>

          <p>

            {totalSpent.toLocaleString()} EGP

          </p>

        </div>

      </div>

      <table className="products-table">

        <thead>

          <tr>

            <th>Order ID</th>

            <th>Date</th>

            <th>Total</th>

            <th>Status</th>

            <th>Items</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>          {customerOrders.map((order) => (

            <tr key={order.id}>

              <td>

                #{order.id}

              </td>

              <td>

                {new Date(order.date).toLocaleString()}

              </td>

              <td>

                {order.total.toLocaleString()} EGP

              </td>

              <td>

                <span
                  style={{
                    fontWeight: "bold",
                    color:
                      order.status === "Delivered"
                        ? "#16A34A"
                        : order.status === "Processing"
                        ? "#2563EB"
                        : "#D97706",
                  }}
                >
                  {order.status}
                </span>

              </td>

              <td>

                {order.items.length}

              </td>

              <td
                style={{
                  display: "flex",
                  gap: "8px",
                  flexWrap: "wrap",
                }}
              >

                <button
                  onClick={() =>
                    updateOrderStatus(
                      order.id,
                      "Pending"
                    )
                  }
                >
                  Pending
                </button>

                <button
                  onClick={() =>
                    updateOrderStatus(
                      order.id,
                      "Processing"
                    )
                  }
                >
                  Processing
                </button>

                <button
                  onClick={() =>
                    updateOrderStatus(
                      order.id,
                      "Delivered"
                    )
                  }
                >
                  Delivered
                </button>

                <button
                  onClick={() => {

                    const ok = window.confirm(
                      "Delete this order?"
                    );

                    if (ok) {

                      deleteOrder(order.id);

                    }

                  }}
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}        </tbody>

      </table>

    </section>

  );

}

export default CustomerDetails;