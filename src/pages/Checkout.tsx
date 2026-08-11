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

  const {
    addOrder,
    getShippingCost,
  } = useOrders();

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

  /*
   * =========================
   * SHIPPING
   * =========================
   */

  const shippingCost =
    getShippingCost(city);

  const finalTotal =
    totalPrice + shippingCost;

  /*
   * =========================
   * PLACE ORDER
   * =========================
   */

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

    if (shippingCost <= 0) {
      alert(
        "Please select a valid governorate."
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

        items:
          cart,

        /*
         * Products total
         */
        total:
          totalPrice,

        /*
         * Shipping cost
         */
        shippingCost:
          shippingCost,

        /*
         * Final order total
         */
        finalTotal:
          finalTotal,

        userId:
          user?.uid ?? "",
      });

      /*
       * Clear cart only after
       * successful order creation.
       */

      clearCart();

      navigate(
        "/order-success"
      );

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

  /*
   * =========================
   * RENDER
   * =========================
   */

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
            autoComplete="name"
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
            autoComplete="email"
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
            autoComplete="tel"
          />

          {/* =========================
              GOVERNORATE
          ========================== */}

          <select
            value={city}
            onChange={(e) =>
              setCity(
                e.target.value
              )
            }
            disabled={placingOrder}
          >
            <option value="">
              Select Governorate
            </option>

            <option value="Cairo">
              Cairo
            </option>

            <option value="Giza">
              Giza
            </option>

            <option value="Alexandria">
              Alexandria
            </option>

            <option value="Qalyubia">
              Qalyubia
            </option>

            <option value="Dakahlia">
              Dakahlia
            </option>

            <option value="Sharqia">
              Sharqia
            </option>

            <option value="Gharbia">
              Gharbia
            </option>

            <option value="Monufia">
              Monufia
            </option>

            <option value="Beheira">
              Beheira
            </option>

            <option value="KafrElSheikh">
              Kafr El Sheikh
            </option>

            <option value="Damietta">
              Damietta
            </option>

            <option value="PortSaid">
              Port Said
            </option>

            <option value="Ismailia">
              Ismailia
            </option>

            <option value="Suez">
              Suez
            </option>

            <option value="NorthSinai">
              North Sinai
            </option>

            <option value="SouthSinai">
              South Sinai
            </option>

            <option value="Fayoum">
              Fayoum
            </option>

            <option value="BeniSuef">
              Beni Suef
            </option>

            <option value="Minya">
              Minya
            </option>

            <option value="Assiut">
              Assiut
            </option>

            <option value="Sohag">
              Sohag
            </option>

            <option value="Qena">
              Qena
            </option>

            <option value="Luxor">
              Luxor
            </option>

            <option value="Aswan">
              Aswan
            </option>

            <option value="RedSea">
              Red Sea
            </option>

            <option value="NewValley">
              New Valley
            </option>

            <option value="Matrouh">
              Matrouh
            </option>
          </select>

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
            autoComplete="street-address"
          />

          {/* =========================
              PAYMENT
          ========================== */}

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

          {/* =========================
              SHIPPING INFO
          ========================== */}

          {city && (
            <div
              style={{
                marginTop: "15px",
                padding: "15px",
                background:
                  "#f7f7f7",
                borderRadius:
                  "10px",
              }}
            >
              <strong>
                Shipping:
              </strong>{" "}

              {shippingCost.toLocaleString()}{" "}
              EGP
            </div>
          )}

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

          {cart.map(
            (item) => (
              <div
                className="summary-item"
                key={String(
                  item.id
                )}
              >
                <span>
                  {item.name}
                </span>

                <span>
                  {item.quantity} ×{" "}
                  {item.price} EGP
                </span>
              </div>
            )
          )}

          <hr />

          {/* =========================
              PRODUCTS TOTAL
          ========================== */}

          <div
            className="summary-total"
          >
            <h3>
              Products
            </h3>

            <h3>
              {totalPrice.toLocaleString()}{" "}
              EGP
            </h3>
          </div>

          {/* =========================
              SHIPPING
          ========================== */}

          <div
            className="summary-total"
          >
            <h3>
              Shipping
            </h3>

            <h3>
              {shippingCost.toLocaleString()}{" "}
              EGP
            </h3>
          </div>

          <hr />

          {/* =========================
              FINAL TOTAL
          ========================== */}

          <div
            className="summary-total"
          >
            <h3>
              Total
            </h3>

            <h3>
              {finalTotal.toLocaleString()}{" "}
              EGP
            </h3>
          </div>

        </div>

      </div>

    </section>
  );
}

export default Checkout;