import "../styles/Policy.css";

import { useStore } from "../context/StoreContext";

function Terms() {
  const { settings } = useStore();

  return (
    <section className="policy-page">
      <div className="policy-container">

        <div className="section-title">
          <span>STORE POLICY</span>
          <h2>Terms & Conditions</h2>
        </div>

        <div className="policy-content">
          <p>
            {settings.termsAndConditions ||
              "By placing an order, the customer agrees to the store's terms and conditions."}
          </p>
        </div>

      </div>
    </section>
  );
}

export default Terms;