import "../../styles/Offers.css";

function Offers() {
  return (
    <section className="offers">

      <div className="offer-left">

        <span className="offer-badge">
          🔥 Limited Offer
        </span>

        <h2>
          Save up to
          <br />
          40% OFF
        </h2>

        <p>
          Huge discounts on printers, toners,
          office supplies and accessories.
        </p>

        <button>
          Shop Now
        </button>

      </div>

      <div className="offer-right">

        <div className="offer-card">

          <h3>Today's Deal</h3>

          <h1>40%</h1>

          <span>OFF</span>

        </div>

      </div>

    </section>
  );
}

export default Offers;