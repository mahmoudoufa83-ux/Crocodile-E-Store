import "../styles/MyOrders.css";

import { useAuth } from "../context/AuthContext";
import { useOrders } from "../context/OrderContext";

function MyOrders() {
  const { user } = useAuth();

  const {
    orders,
    loading,
  } = useOrders();

  /*
   * =========================
   * NOT ADMIN
   * =========================
   */

  if (!user || user.role !== "admin") {
    return (
      <section className="orders-page">
        <div className="empty-orders">
          <h2>
            Orders are available for admin only.
          </h2>

          <p>
            Customers can place orders without
            creating an account.
          </p>
        </div>
      </section>
    );
  }

  /*
   * =========================
   * LOADING
   * =========================
   */

  if (loading) {
    return (
      <section className="orders-page">
        <div className="empty-orders">
          <h2>
            Loading Orders...
          </h2>
        </div>
      </section>
    );
  }

  return (
    <section className="orders-page">

      <div className="section-title">

        <span>
          ALL ORDERS
        </span>

        <h2>
          Order History
        </h2>

      </div>

      {orders.length === 0 ? (
        <div className="empty-orders">

          <h2>
            No Orders Yet
          </h2>

          <p>
            No customer orders have been
            placed yet.
          </p>

        </div>
      ) : (
        orders.map((order) => (

          <div
            className="order-card"
            key={order.id}
          >

            {/* =========================
                ORDER HEADER
            ========================== */}

            <div className="order-header">

              <h3>
                Order #{order.id}
              </h3>

              <span className="status">
                {order.status}
              </span>

            </div>

            {/* =========================
                CUSTOMER INFORMATION
            ========================== */}

            <p>
              Customer :{" "}
              {order.customerName}
            </p>

            <p>
              Email :{" "}
              {order.email}
            </p>

            <p>
              Phone :{" "}
              {order.phone}
            </p>

            <p>
              City :{" "}
              {order.city}
            </p>

            <p>
              Address :{" "}
              {order.address}
            </p>

            <p>
              Payment :{" "}
              {order.paymentMethod}
            </p>

            <p>
              Date :{" "}
              {new Date(
                order.date
              ).toLocaleString()}
            </p>

            <p>
              Total :{" "}
              {order.total.toLocaleString()}{" "}
              EGP
            </p>

            <hr />

            {/* =========================
                ITEMS
            ========================== */}

            {order.items.map(
              (item) => (

                <div
                  className="order-item"
                  key={String(
                    item.id
                  )}
                >

                  <span>
                    {item.name}
                  </span>

                  <span>
                    x{item.quantity}
                  </span>

                </div>

              )
            )}

          </div>

        ))
      )}

    </section>
  );
}

export default MyOrders;