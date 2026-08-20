import "../styles/Policy.css";

import { useStore } from "../context/StoreContext";
import { useLanguage } from "../context/LanguageContext";

function Returns() {
  const { settings } = useStore();
  const { isArabic } = useLanguage();

  const shippingRates = [
    ["Cairo", settings.shippingRates.Cairo],
    ["Giza", settings.shippingRates.Giza],
    [
      "Alexandria",
      settings.shippingRates.Alexandria,
    ],
    [
      "Qalyubia",
      settings.shippingRates.Qalyubia,
    ],
    [
      "Dakahlia",
      settings.shippingRates.Dakahlia,
    ],
    [
      "Sharqia",
      settings.shippingRates.Sharqia,
    ],
    [
      "Gharbia",
      settings.shippingRates.Gharbia,
    ],
    [
      "Monufia",
      settings.shippingRates.Monufia,
    ],
    [
      "Beheira",
      settings.shippingRates.Beheira,
    ],
    [
      "Kafr El Sheikh",
      settings.shippingRates.KafrElSheikh,
    ],
    [
      "Damietta",
      settings.shippingRates.Damietta,
    ],
    [
      "Port Said",
      settings.shippingRates.PortSaid,
    ],
    [
      "Ismailia",
      settings.shippingRates.Ismailia,
    ],
    [
      "Suez",
      settings.shippingRates.Suez,
    ],
    [
      "North Sinai",
      settings.shippingRates.NorthSinai,
    ],
    [
      "South Sinai",
      settings.shippingRates.SouthSinai,
    ],
    [
      "Fayoum",
      settings.shippingRates.Fayoum,
    ],
    [
      "Beni Suef",
      settings.shippingRates.BeniSuef,
    ],
    [
      "Minya",
      settings.shippingRates.Minya,
    ],
    [
      "Assiut",
      settings.shippingRates.Assiut,
    ],
    [
      "Sohag",
      settings.shippingRates.Sohag,
    ],
    [
      "Qena",
      settings.shippingRates.Qena,
    ],
    [
      "Luxor",
      settings.shippingRates.Luxor,
    ],
    [
      "Aswan",
      settings.shippingRates.Aswan,
    ],
    [
      "Red Sea",
      settings.shippingRates.RedSea,
    ],
    [
      "New Valley",
      settings.shippingRates.NewValley,
    ],
    [
      "Matrouh",
      settings.shippingRates.Matrouh,
    ],
  ];

  return (
    <section className="policy-page">
      <div className="policy-container">

        {/* =========================
            HEADER
        ========================== */}

        <div className="section-title">
          <span>
            {isArabic
              ? "سياسة المتجر"
              : "STORE POLICY"}
          </span>

          <h2>
            {isArabic
              ? "الاستبدال والاسترجاع"
              : "Returns & Exchanges"}
          </h2>
        </div>

        {/* =========================
            RETURN POLICY
        ========================== */}

        <div className="policy-content">

          <div
            style={{
              whiteSpace: "pre-wrap",
              lineHeight: 1.9,
            }}
          >
            {settings.returnPolicy}
          </div>

        </div>

        {/* =========================
            SHIPPING RATES
        ========================== */}

        <div
          style={{
            marginTop: "40px",
          }}
        >
          <div className="section-title">
            <span>
              {isArabic
                ? "أسعار الشحن"
                : "SHIPPING RATES"}
            </span>

            <h2>
              {isArabic
                ? "تكلفة الشحن حسب المحافظة"
                : "Shipping Rates by Governorate"}
            </h2>
          </div>

          <div
            style={{
              overflowX: "auto",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse:
                  "collapse",
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      textAlign:
                        "left",
                      padding:
                        "12px",
                      borderBottom:
                        "1px solid #ddd",
                    }}
                  >
                    {isArabic
                      ? "المحافظة"
                      : "Governorate"}
                  </th>

                  <th
                    style={{
                      textAlign:
                        "left",
                      padding:
                        "12px",
                      borderBottom:
                        "1px solid #ddd",
                    }}
                  >
                    {isArabic
                      ? "سعر الشحن"
                      : "Shipping Price"}
                  </th>
                </tr>
              </thead>

              <tbody>
                {shippingRates.map(
                  ([name, price]) => (
                    <tr
                      key={name}
                    >
                      <td
                        style={{
                          padding:
                            "12px",
                          borderBottom:
                            "1px solid #eee",
                        }}
                      >
                        {name}
                      </td>

                      <td
                        style={{
                          padding:
                            "12px",
                          borderBottom:
                            "1px solid #eee",
                        }}
                      >
                        {price} EGP
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Returns;