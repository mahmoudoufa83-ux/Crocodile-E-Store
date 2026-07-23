import "../styles/OrderSuccess.css";

import { Link } from "react-router-dom";

import { FaCheckCircle } from "react-icons/fa";

function OrderSuccess() {

  return (

    <section className="success-page">

      <FaCheckCircle className="success-icon" />

      <h1>Order Placed Successfully! 🎉</h1>

      <p>

        Thank you for shopping with Crocodile Print Solutions.

        <br />

        Your order has been received and is now being processed.

      </p>

      <Link
        to="/products"
        className="back-shop"
      >

        Continue Shopping

      </Link>

    </section>

  );

}

export default OrderSuccess;