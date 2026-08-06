import "../styles/AdminProducts.css";

import { useOrders } from "../context/OrderContext";

function AdminOrders() {

  const {
    orders,
    updateOrderStatus,
    deleteOrder,
  } = useOrders();

  return (

    <section className="admin-products">

      <div className="admin-header">

        <h1>Orders Management</h1>

        <p>Manage Customer Orders</p>

      </div>

      {/* Mobile View */}

      <div className="mobile-orders">

        {orders.length === 0 ? (

          <div className="empty-orders">

            <h3>No Orders Found</h3>

          </div>

        ) : (

          orders.map((order) => (

            <div
              className="mobile-order-card"
              key={order.id}
            >

              <h3>

                Order #{order.id}

              </h3>

              <p>

                <strong>Date:</strong>{" "}
                {order.date}

              </p>

              <p>

                <strong>Total:</strong>{" "}
                {order.total.toLocaleString()} EGP

              </p>

              <p>

                <strong>Status:</strong>{" "}
                {order.status}

              </p>

              <p>

                <strong>Items:</strong>{" "}
                {order.items.length}

              </p>

              <div className="mobile-order-actions">

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

                    const confirmDelete =
                      window.confirm(
                        "Are you sure you want to delete this order?"
                      );

                    if (confirmDelete) {

                      deleteOrder(order.id);

                    }

                  }}
                >
                  Delete
                </button>

              </div>

            </div>

          ))

        )}

      </div>

      {/* Desktop Table */}

      <table className="products-table desktop-table">

        <thead>

          <tr>

            <th>ID</th>

            <th>Date</th>

            <th>Total</th>

            <th>Status</th>

            <th>Items</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {orders.length === 0 ? (

            <tr>

              <td
                colSpan={6}
                style={{ textAlign: "center" }}
              >

                No Orders Found

              </td>

            </tr>

          ) : (            orders.map((order) => (

              <tr key={order.id}>

                <td>#{order.id}</td>

                <td>{order.date}</td>

                <td>

                  {order.total.toLocaleString()} EGP

                </td>

                <td>

                  {order.status}

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

                      const confirmDelete =
                        window.confirm(
                          "Are you sure you want to delete this order?"
                        );

                      if (confirmDelete) {

                        deleteOrder(order.id);

                      }

                    }}
                  >

                    Delete

                  </button>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </section>

  );

}

export default AdminOrders;