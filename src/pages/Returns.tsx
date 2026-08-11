import "../styles/Policy.css";

import { useStore } from "../context/StoreContext";

function Returns() {
  const { settings } = useStore();

  return (
    <section className="policy-page">
      <div className="policy-container">

        <div className="section-title">
          <span>STORE POLICY</span>
          <h2>Returns & Refund Policy</h2>
        </div>

        <div className="policy-content">
          <p>
            {settings.returnPolicy ||
              "Returns and exchanges are accepted according to our store policy."}
          </p>
        </div>

      </div>
    </section>
  );
}

export default Returns;