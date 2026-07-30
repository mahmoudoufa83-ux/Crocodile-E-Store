import "../../styles/Offers.css";
import { useNavigate } from "react-router-dom";

function Offers() {
  const navigate = useNavigate();

  return (
    <section
      className="offers"
      id="offers"
    >
      <div className="offer-overlay"></div>

      <div className="offer-content">
        <span className="offer-badge">
          🔥 LIMITED TIME OFFER
        </span>

        <h2>
          Premium Printing
          <br />
          Solutions
        </h2>

        <p>
          Get amazing discounts on printers, toners and ink cartridges.
          Quality products from trusted brands with unbeatable prices.
        </p>

        <button onClick={() => navigate("/products")}>
          Shop Now
        </button>
      </div>
    </section>
  );
}

export default Offers;