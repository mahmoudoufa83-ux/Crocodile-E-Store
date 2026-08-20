import "../styles/Policy.css";

import { useStore } from "../context/StoreContext";
import { useLanguage } from "../context/LanguageContext";

function Terms() {
  const { settings } = useStore();
  const { isArabic } = useLanguage();

  return (
    <section className="policy-page">
      <div className="policy-container">

        <div className="section-title">
          <span>
            {isArabic
              ? "سياسة المتجر"
              : "STORE POLICY"}
          </span>

          <h2>
            {isArabic
              ? "الشروط والأحكام"
              : "Terms & Conditions"}
          </h2>
        </div>

        <div className="policy-content">

          <div
            style={{
              whiteSpace: "pre-wrap",
              lineHeight: 1.9,
            }}
          >
            {settings.termsAndConditions ||
              (isArabic
                ? "بتأكيد الطلب، يقر العميل بالموافقة على الشروط والأحكام الخاصة بالمتجر."
                : "By placing an order, the customer agrees to the store's terms and conditions.")}
          </div>

        </div>

      </div>
    </section>
  );
}

export default Terms;