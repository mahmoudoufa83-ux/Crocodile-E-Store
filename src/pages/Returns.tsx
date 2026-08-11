import { useLanguage } from "../context/LanguageContext";

function Returns() {
  const { isArabic } = useLanguage();

  const shippingRates = [
    { en: "Cairo", ar: "القاهرة", price: 60 },
    { en: "Giza", ar: "الجيزة", price: 60 },
    { en: "Qalyubia", ar: "القليوبية", price: 65 },
    { en: "Alexandria", ar: "الإسكندرية", price: 70 },
    { en: "Dakahlia", ar: "الدقهلية", price: 70 },
    { en: "Sharqia", ar: "الشرقية", price: 70 },
    { en: "Gharbia", ar: "الغربية", price: 70 },
    { en: "Monufia", ar: "المنوفية", price: 70 },
    { en: "Beheira", ar: "البحيرة", price: 75 },
    { en: "Kafr El Sheikh", ar: "كفر الشيخ", price: 75 },
    { en: "Damietta", ar: "دمياط", price: 75 },
    { en: "Port Said", ar: "بورسعيد", price: 75 },
    { en: "Ismailia", ar: "الإسماعيلية", price: 75 },
    { en: "Suez", ar: "السويس", price: 75 },
    { en: "Fayoum", ar: "الفيوم", price: 75 },
    { en: "Beni Suef", ar: "بني سويف", price: 80 },
    { en: "Minya", ar: "المنيا", price: 85 },
    { en: "Assiut", ar: "أسيوط", price: 85 },
    { en: "Sohag", ar: "سوهاج", price: 90 },
    { en: "Qena", ar: "قنا", price: 90 },
    { en: "Luxor", ar: "الأقصر", price: 90 },
    { en: "Aswan", ar: "أسوان", price: 100 },
    { en: "North Sinai", ar: "شمال سيناء", price: 100 },
    { en: "South Sinai", ar: "جنوب سيناء", price: 110 },
    { en: "Red Sea", ar: "البحر الأحمر", price: 110 },
    { en: "New Valley", ar: "الوادي الجديد", price: 110 },
    { en: "Matrouh", ar: "مطروح", price: 110 },
  ];

  return (
    <section
      style={{
        minHeight: "100vh",
        padding: "120px 20px 60px",
        background: "#f8fafc",
      }}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {/* =========================
            HEADER
        ========================== */}

        <div
          style={{
            background: "#ffffff",
            borderRadius: "18px",
            padding: "35px",
            marginBottom: "25px",
            boxShadow: "0 5px 20px rgba(0,0,0,0.06)",
          }}
        >
          <h1
            style={{
              margin: "0 0 10px",
              color: "#15803d",
              fontSize: "32px",
              fontWeight: 800,
            }}
          >
            {isArabic
              ? "سياسة الاسترجاع والشحن"
              : "Returns & Shipping Policy"}
          </h1>

          <p
            style={{
              margin: 0,
              color: "#64748b",
              fontSize: "16px",
              lineHeight: 1.8,
            }}
          >
            {isArabic
              ? "فيما يلي شروط الاسترجاع وأسعار الشحن لجميع المحافظات."
              : "Below you can find our return conditions and shipping rates for all governorates."}
          </p>
        </div>

        {/* =========================
            RETURN POLICY
        ========================== */}

        <div
          style={{
            background: "#ffffff",
            borderRadius: "18px",
            padding: "35px",
            marginBottom: "25px",
            boxShadow: "0 5px 20px rgba(0,0,0,0.06)",
          }}
        >
          <h2
            style={{
              marginTop: 0,
              color: "#15803d",
              fontSize: "25px",
            }}
          >
            {isArabic
              ? "شروط الاسترجاع"
              : "Return Conditions"}
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              color: "#334155",
              lineHeight: 1.8,
              fontSize: "16px",
            }}
          >
            <div>
              <strong>
                {isArabic
                  ? "1. مدة الاسترجاع:"
                  : "1. Return Period:"}
              </strong>

              <p>
                {isArabic
                  ? "يمكن طلب استرجاع المنتج خلال 14 يومًا من تاريخ استلام الطلب."
                  : "A return request can be submitted within 14 days from the date the order was received."}
              </p>
            </div>

            <div>
              <strong>
                {isArabic
                  ? "2. حالة المنتج:"
                  : "2. Product Condition:"}
              </strong>

              <p>
                {isArabic
                  ? "يجب أن يكون المنتج في حالته الأصلية، وغير مستخدم، وغير تالف، ويفضل أن يكون داخل العبوة الأصلية."
                  : "The product must be in its original condition, unused and undamaged, preferably with its original packaging."}
              </p>
            </div>

            <div>
              <strong>
                {isArabic
                  ? "3. المنتجات التالفة:"
                  : "3. Damaged Products:"}
              </strong>

              <p>
                {isArabic
                  ? "في حالة وصول المنتج تالفًا أو مختلفًا عن المنتج المطلوب، يجب التواصل معنا في أسرع وقت مع صور واضحة للمنتج."
                  : "If the product arrives damaged or different from the ordered item, please contact us as soon as possible and provide clear photos of the product."}
              </p>
            </div>

            <div>
              <strong>
                {isArabic
                  ? "4. المنتجات المستخدمة:"
                  : "4. Used Products:"}
              </strong>

              <p>
                {isArabic
                  ? "لا يمكن قبول استرجاع المنتجات التي تم استخدامها أو تركيبها أو تعرضت للتلف بسبب سوء الاستخدام."
                  : "Returns cannot be accepted for products that have been used, installed, or damaged due to misuse."}
              </p>
            </div>

            <div>
              <strong>
                {isArabic
                  ? "5. رسوم الشحن:"
                  : "5. Shipping Fees:"}
              </strong>

              <p>
                {isArabic
                  ? "في حالة وجود خطأ من جانب المتجر أو وصول منتج تالف، يتحمل المتجر تكلفة الاسترجاع. أما في حالة تغيير رأي العميل أو عدم رغبته في المنتج، فقد يتحمل العميل رسوم الشحن."
                  : "If the return is caused by a store error or a damaged product, the store covers the return shipping cost. If the customer simply changes their mind, the customer may be responsible for shipping costs."}
              </p>
            </div>

            <div>
              <strong>
                {isArabic
                  ? "6. استرداد المبلغ:"
                  : "6. Refund:"}
              </strong>

              <p>
                {isArabic
                  ? "يتم رد قيمة المنتج بعد استلامه وفحصه والتأكد من مطابقته لشروط الاسترجاع."
                  : "The product amount will be refunded after the returned item is received and inspected to make sure it meets the return conditions."}
              </p>
            </div>

            <div>
              <strong>
                {isArabic
                  ? "7. مدة معالجة الاسترجاع:"
                  : "7. Return Processing:"}
              </strong>

              <p>
                {isArabic
                  ? "قد تستغرق عملية فحص ومعالجة طلب الاسترجاع عدة أيام عمل."
                  : "The inspection and processing of a return request may take several business days."}
              </p>
            </div>
          </div>
        </div>

        {/* =========================
            IMPORTANT NOTICE
        ========================== */}

        <div
          style={{
            background: "#f0fdf4",
            border: "1px solid #bbf7d0",
            borderRadius: "18px",
            padding: "25px",
            marginBottom: "25px",
          }}
        >
          <h2
            style={{
              marginTop: 0,
              color: "#166534",
              fontSize: "22px",
            }}
          >
            {isArabic
              ? "ملاحظات مهمة"
              : "Important Notes"}
          </h2>

          <ul
            style={{
              margin: 0,
              paddingInlineStart: "25px",
              color: "#334155",
              lineHeight: 2,
            }}
          >
            <li>
              {isArabic
                ? "يجب التواصل مع خدمة العملاء قبل إرسال أي منتج للاسترجاع."
                : "Please contact customer service before sending any product back."}
            </li>

            <li>
              {isArabic
                ? "لا تقم بإرسال المنتج دون الحصول على تعليمات الاسترجاع."
                : "Do not send the product back without receiving return instructions."}
            </li>

            <li>
              {isArabic
                ? "يتم رفض المنتجات التي لا تستوفي شروط الاسترجاع."
                : "Products that do not meet the return conditions may be rejected."}
            </li>

            <li>
              {isArabic
                ? "قد تختلف مدة استرداد المبلغ حسب وسيلة الدفع."
                : "Refund processing time may vary depending on the payment method."}
            </li>
          </ul>
        </div>

        {/* =========================
            SHIPPING RATES
        ========================== */}

        <div
          style={{
            background: "#ffffff",
            borderRadius: "18px",
            padding: "35px",
            boxShadow: "0 5px 20px rgba(0,0,0,0.06)",
          }}
        >
          <h2
            style={{
              marginTop: 0,
              color: "#15803d",
              fontSize: "25px",
            }}
          >
            {isArabic
              ? "أسعار الشحن حسب المحافظة"
              : "Shipping Rates by Governorate"}
          </h2>

          <p
            style={{
              color: "#64748b",
              marginBottom: "25px",
              lineHeight: 1.8,
            }}
          >
            {isArabic
              ? "أسعار الشحن الموضحة أدناه هي أسعار الشحن الأساسية لكل محافظة."
              : "The following are the basic shipping rates for each governorate."}
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "12px",
            }}
          >
            {shippingRates.map(
              (item) => (
                <div
                  key={item.en}
                  style={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems: "center",
                    padding: "15px 18px",
                    border: "1px solid #e2e8f0",
                    borderRadius: "10px",
                    background: "#f8fafc",
                  }}
                >
                  <span
                    style={{
                      fontWeight: 600,
                      color: "#334155",
                    }}
                  >
                    {isArabic
                      ? item.ar
                      : item.en}
                  </span>

                  <strong
                    style={{
                      color: "#15803d",
                      whiteSpace:
                        "nowrap",
                    }}
                  >
                    {item.price.toLocaleString()}{" "}
                    EGP
                  </strong>
                </div>
              )
            )}
          </div>

          {/* =========================
              SHIPPING DISCLAIMER
          ========================== */}

          <div
            style={{
              marginTop: "25px",
              padding: "18px",
              background: "#f8fafc",
              borderRadius: "10px",
              color: "#64748b",
              lineHeight: 1.8,
              fontSize: "14px",
            }}
          >
            {isArabic
              ? "قد تختلف رسوم الشحن في بعض الحالات حسب حجم أو وزن الطلب أو المنطقة، وسيتم توضيح تكلفة الشحن أثناء إتمام الطلب."
              : "Shipping fees may vary in some cases depending on the size, weight, or delivery area. The final shipping cost will be displayed during checkout."}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Returns;