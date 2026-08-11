import "../styles/Checkout.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrderContext";
import { useAuth } from "../context/AuthContext";

function Checkout() {
  const navigate = useNavigate();

  const {
    cart,
    totalPrice,
    clearCart,
  } = useCart();

  const { addOrder } = useOrders();

  const { user } = useAuth();

  const [customerName, setCustomerName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [city, setCity] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [paymentMethod, setPaymentMethod] =
    useState("Cash On Delivery");

  const [placingOrder, setPlacingOrder] =
    useState(false);

  async function placeOrder() {
    if (placingOrder) return;

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    if (
      !customerName.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !city.trim() ||
      !address.trim()
    ) {
      alert(
        "Please fill all billing details."
      );

      return;
    }

    try {
      setPlacingOrder(true);

      await addOrder({
        customerName:
          customerName.trim(),

        email:
          email.trim(),

        phone:
          phone.trim(),

        city:
          city.trim(),

        address:
          address.trim(),

        paymentMethod,

        items: cart,

        total: totalPrice,

        /*
         * لو العميل Guest:
         * user?.uid هتكون undefined
         * وبالتالي يتم إرسال string فاضي.
         *
         * لو العميل مسجل دخول:
         * يتم حفظ UID الخاص به.
         */
        userId:
          user?.uid ?? "",
      });

      /*
       * نمسح السلة فقط بعد نجاح
       * عملية إنشاء الطلب.
       */
      clearCart();

      navigate("/order-success");
    } catch (error) {
      console.error(
        "Failed to place order:",
        error
      );

      alert(
        "Failed to place your order. Please try again."
      );
    } finally {
      setPlacingOrder(false);
    }
  }

  return (
    <section className="checkout-page">
      <div className="checkout-container">

        {/* =========================
            BILLING DETAILS
        ========================== */}

        <div className="checkout-form">

          <h2>
            Billing Details
          </h2>

          <input
            type="text"
            placeholder="Full Name"
            value={customerName}
            onChange={(e) =>
              setCustomerName(
                e.target.value
              )
            }
            disabled={placingOrder}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            disabled={placingOrder}
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) =>
              setPhone(
                e.target.value
              )
            }
            disabled={placingOrder}
          />

          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) =>
              setCity(
                e.target.value
              )
            }
            disabled={placingOrder}
          />

          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) =>
              setAddress(
                e.target.value
              )
            }
            disabled={placingOrder}
          />

          <select
            value={paymentMethod}
            onChange={(e) =>
              setPaymentMethod(
                e.target.value
              )
            }
            disabled={placingOrder}
          >
            <option>
              Cash On Delivery
            </option>

            <option>
              Credit Card
            </option>
          </select>

          <button
            className="place-order"
            onClick={placeOrder}
            disabled={placingOrder}
          >
            {placingOrder
              ? "Placing Order..."
              : "Place Order"}
          </button>

        </div>

        {/* =========================
            ORDER SUMMARY
        ========================== */}

        <div className="checkout-summary">

          <h2>
            Order Summary
          </h2>

          {cart.map((item) => (
            <div
              className="summary-item"
              key={String(item.id)}
            >

              <span>
                {item.name}
              </span>

              <span>
                {item.quantity} ×{" "}
                {item.price} EGP
              </span>

            </div>
          ))}

          <hr />

          <div className="summary-total">

            <h3>
              Total
            </h3>

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