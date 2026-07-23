import "../styles/MyOrders.css";

import { useOrders } from "../context/OrderContext";

function MyOrders() {

  const { orders } = useOrders();

  return (

    <section className="orders-page">

      <div className="section-title">

        <span>MY ORDERS</span>

        <h2>Order History</h2>

      </div>

      {

        orders.length === 0 ? (

          <div className="empty-orders">

            <h2>No Orders Yet</h2>

            <p>

              You haven't placed any orders yet.

            </p>

          </div>

        ) : (

          orders.map((order)=>(

            <div
              className="order-card"
              key={order.id}
            >

              <div className="order-header">

                <h3>

                  Order #{order.id}

                </h3>

                <span className="status">

                  {order.status}

                </span>

              </div>

              <p>

                Date : {order.date}

              </p>

              <p>

                Total : {order.total.toLocaleString()} EGP

              </p>

              <hr />

              {

                order.items.map((item)=>(

                  <div
                    className="order-item"
                    key={item.id}
                  >

                    <span>

                      {item.name}

                    </span>

                    <span>

                      x{item.quantity}

                    </span>

                  </div>

                ))

              }

            </div>

          ))

        )

      }

    </section>

  );

}

export default MyOrders;