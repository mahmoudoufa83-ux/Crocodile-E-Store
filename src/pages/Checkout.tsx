import "../styles/Checkout.css";

import { useState } from "react";
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

  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash On Delivery");

  async function placeOrder() {
    if (cart.length === 0) return;

    if (
      !customerName ||
      !email ||
      !phone ||
      !city ||
      !address
    ) {
      alert("Please fill all billing details.");
      return;
    }

    await addOrder({
      customerName,
      email,
      phone,
      city,
      address,
      paymentMethod,
      items: cart,
      total: totalPrice,
    });

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
            value={customerName}
            onChange={(e) =>
              setCustomerName(e.target.value)
            }
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) =>
              setCity(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) =>
              setAddress(e.target.value)
            }
          />

          <select
            value={paymentMethod}
            onChange={(e) =>
              setPaymentMethod(e.target.value)
            }
          >
            <option>Cash On Delivery</option>
            <option>Credit Card</option>
          </select>          <button
            className="place-order"
            onClick={placeOrder}
          >
            Place Order
          </button>
        </div>

        <div className="checkout-summary">
          <h2>Order Summary</h2>

          {cart.map((item) => (
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
          ))}

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