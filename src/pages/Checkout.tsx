import "../styles/Checkout.css";

import { useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrderContext";

function Checkout() {

  const navigate = useNavigate();

  const {

    cart,

    totalPrice,

    clearCart,

  } = useCart();

  const { addOrder } = useOrders();

  function placeOrder() {

    if (cart.length === 0) {

      return;

    }

    addOrder(cart, totalPrice);

    clearCart();

    navigate("/order-success");

  }

  return (

    <section className="checkout-page">

      <div className="checkout-container">

        <div className="checkout-form">

          <h2>Billing Details</h2>

          <input
            type="text"
            placeholder="Full Name"
          />

          <input
            type="email"
            placeholder="Email"
          />

          <input
            type="text"
            placeholder="Phone Number"
          />

          <input
            type="text"
            placeholder="City"
          />

          <input
            type="text"
            placeholder="Address"
          />

          <select>

            <option>Cash On Delivery</option>

            <option>Credit Card</option>

          </select>

          <button
            className="place-order"
            onClick={placeOrder}
          >

            Place Order

          </button>

        </div>

        <div className="checkout-summary">

          <h2>Order Summary</h2>

          {

            cart.map((item)=>(

              <div
                className="summary-item"
                key={item.id}
              >

                <span>

                  {item.name}

                </span>

                <span>

                  {item.quantity} × {item.price} EGP

                </span>

              </div>

            ))

          }

          <hr />

          <div className="summary-total">

            <h3>Total</h3>

            <h3>

              {totalPrice.toLocaleString()} EGP

            </h3>

          </div>

        </div>

      </div>

    </section>

  );

}

export default Checkout;