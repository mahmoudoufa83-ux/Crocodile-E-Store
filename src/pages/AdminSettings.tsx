import { useState, useEffect } from "react";

import { useStore } from "../context/StoreContext";
import { useTheme } from "../context/ThemeContext";

import { uploadImage } from "../services/cloudinary";

import "../styles/AdminProducts.css";

function AdminSettings() {
  const {
    settings,
    loading,
    updateSettings,
  } = useStore();

  const {
    theme,
    updateTheme,
  } = useTheme();

  const [storeForm, setStoreForm] =
    useState(settings);

  const [themeForm, setThemeForm] =
    useState(theme);

  const [saving, setSaving] =
    useState(false);

  // الصورة الجديدة التي اختارها الأدمن
  const [logoFile, setLogoFile] =
    useState<File | null>(null);

  useEffect(() => {
    setStoreForm(settings);
  }, [settings]);

  useEffect(() => {
    setThemeForm(theme);
  }, [theme]);

  function handleStoreChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setStoreForm({
      ...storeForm,
      [e.target.name]: e.target.value,
    });
  }

  function handleThemeChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const value =
      e.target.type === "checkbox"
        ? e.target.checked
        : e.target.value;

    setThemeForm({
      ...themeForm,
      [e.target.name]: value,
    });
  }

  /*
   * =========================
   * LOGO
   * =========================
   */

  function handleLogo(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    // نتأكد أنها صورة
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    // حد أقصى 5MB
    if (file.size > 5 * 1024 * 1024) {
      alert("Logo image must be less than 5MB.");
      return;
    }

    // نخزن الملف فقط
    // ولن نضع Base64 داخل Firestore
    setLogoFile(file);

    // Preview مؤقت للأدمن
    const previewUrl =
      URL.createObjectURL(file);

    setStoreForm((prev) => ({
      ...prev,
      logo: previewUrl,
    }));
  }

  /*
   * =========================
   * SHIPPING
   * =========================
   */

  function handleShippingChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const value = Number(e.target.value);

    setStoreForm((prev) => ({
      ...prev,

      shippingRates: {
        ...prev.shippingRates,

        [e.target.name]: isNaN(value)
          ? 0
          : value,
      },
    }));
  }

  /*
   * =========================
   * POLICIES
   * =========================
   */

  function handlePolicyChange(
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) {
    setStoreForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  /*
   * =========================
   * SAVE STORE
   * =========================
   */

  async function saveStore() {
    try {
      setSaving(true);

      let finalLogo =
        settings.logo;

      /*
       * لو الأدمن اختار صورة جديدة
       * نرفعها على Cloudinary
       */
      if (logoFile) {
        finalLogo = await uploadImage(
          logoFile
        );
      }

      /*
       * البيانات التي سيتم حفظها
       * في Firestore
       */
      const dataToSave = {
        ...storeForm,
        logo: finalLogo,
      };

      await updateSettings(
        dataToSave
      );

      /*
       * الصورة أصبحت محفوظة،
       * لذلك نمسح الملف المؤقت
       */
      setLogoFile(null);

      /*
       * تحديث الفورم بالرابط الحقيقي
       */
      setStoreForm(dataToSave);

      alert(
        "Store Settings Saved Successfully"
      );
    } catch (error) {
      console.error(
        "Logo / Store Save Error:",
        error
      );

      alert(
        "Failed to save store settings. Please check the image upload settings and try again."
      );
    } finally {
      setSaving(false);
    }
  }

  /*
   * =========================
   * SAVE THEME
   * =========================
   */

  function saveTheme() {
    updateTheme(themeForm);

    alert(
      "Theme Updated Successfully"
    );
  }

  if (loading) {
    return (
      <section className="admin-products">
        <h2>
          Loading Settings...
        </h2>
      </section>
    );
  }

  const shippingNames: Record<
    string,
    string
  > = {
    Cairo: "Cairo",
    Giza: "Giza",
    Alexandria: "Alexandria",
    Qalyubia: "Qalyubia",
    Dakahlia: "Dakahlia",
    Sharqia: "Sharqia",
    Gharbia: "Gharbia",
    Monufia: "Monufia",
    Beheira: "Beheira",
    KafrElSheikh:
      "Kafr El Sheikh",
    Damietta: "Damietta",
    PortSaid: "Port Said",
    Ismailia: "Ismailia",
    Suez: "Suez",
    NorthSinai:
      "North Sinai",
    SouthSinai:
      "South Sinai",
    Fayoum: "Fayoum",
    BeniSuef:
      "Beni Suef",
    Minya: "Minya",
    Assiut: "Assiut",
    Sohag: "Sohag",
    Qena: "Qena",
    Luxor: "Luxor",
    Aswan: "Aswan",
    RedSea: "Red Sea",
    NewValley:
      "New Valley",
    Matrouh:
      "Matrouh",
  };

  return (
    <section className="admin-products">

      {/* =========================
          HEADER
      ========================== */}

      <div className="admin-header">
        <h1>
          Store Settings
        </h1>

        <p>
          Manage Store, Shipping & Policies
        </p>
      </div>

      {/* =========================
          STORE INFORMATION
      ========================== */}

      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "15px",
          marginBottom: "30px",
        }}
      >
        <h2>
          Store Information
        </h2>

        <input
          name="storeName"
          placeholder="Store Name"
          value={
            storeForm.storeName
          }
          onChange={
            handleStoreChange
          }
        />

        <input
          name="adminName"
          placeholder="Admin Name"
          value={
            storeForm.adminName
          }
          onChange={
            handleStoreChange
          }
        />

        <input
          name="adminEmail"
          placeholder="Admin Email"
          value={
            storeForm.adminEmail
          }
          onChange={
            handleStoreChange
          }
        />

        <input
          name="phone"
          placeholder="Phone"
          value={
            storeForm.phone
          }
          onChange={
            handleStoreChange
          }
        />

        <input
          name="whatsapp"
          placeholder="WhatsApp"
          value={
            storeForm.whatsapp
          }
          onChange={
            handleStoreChange
          }
        />

        <input
          name="address"
          placeholder="Address"
          value={
            storeForm.address
          }
          onChange={
            handleStoreChange
          }
        />

        <input
          name="facebook"
          placeholder="Facebook"
          value={
            storeForm.facebook
          }
          onChange={
            handleStoreChange
          }
        />

        <input
          name="instagram"
          placeholder="Instagram"
          value={
            storeForm.instagram
          }
          onChange={
            handleStoreChange
          }
        />

        <br />

        {/* LOGO UPLOAD */}

        <input
          type="file"
          accept="image/*"
          onChange={handleLogo}
        />

        {storeForm.logo && (
          <div
            style={{
              marginTop: "20px",
            }}
          >
            <p
              style={{
                marginBottom: "10px",
                fontWeight: 600,
              }}
            >
              Logo Preview
            </p>

            <img
              src={storeForm.logo}
              alt="Store Logo"
              style={{
                width: 180,
                height: 100,
                objectFit: "contain",
                borderRadius: 12,
                border:
                  "1px solid #ddd",
                padding: 10,
                background:
                  "#fff",
              }}
            />
          </div>
        )}

        <br />

        <button
          onClick={saveStore}
          disabled={saving}
        >
          {saving
            ? "Saving..."
            : "Save Store"}
        </button>
      </div>

      {/* =========================
          SHIPPING SETTINGS
      ========================== */}

      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "15px",
          marginBottom: "30px",
        }}
      >
        <h2>
          Shipping Prices
        </h2>

        <p
          style={{
            marginBottom: "20px",
            color: "#666",
          }}
        >
          Set the shipping price for
          each governorate.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "15px",
          }}
        >
          {Object.entries(
            shippingNames
          ).map(
            ([key, name]) => (
              <div
                key={key}
                style={{
                  display: "flex",
                  flexDirection:
                    "column",
                  gap: "6px",
                }}
              >
                <label
                  style={{
                    fontWeight: 600,
                  }}
                >
                  {name}
                </label>

                <input
                  type="number"
                  min="0"
                  step="1"
                  name={key}
                  value={
                    storeForm
                      .shippingRates[
                        key as keyof typeof storeForm.shippingRates
                      ]
                  }
                  onChange={
                    handleShippingChange
                  }
                  placeholder="Shipping Price"
                />

                <small>
                  EGP
                </small>
              </div>
            )
          )}
        </div>

        <br />

        <button
          onClick={saveStore}
          disabled={saving}
        >
          {saving
            ? "Saving..."
            : "Save Shipping Prices"}
        </button>
      </div>

      {/* =========================
          RETURN POLICY
      ========================== */}

      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "15px",
          marginBottom: "30px",
        }}
      >
        <h2>
          Return Policy
        </h2>

        <p
          style={{
            color: "#666",
          }}
        >
          Write the complete return,
          exchange and refund policy
          displayed to customers.
        </p>

        <textarea
          name="returnPolicy"
          value={
            storeForm.returnPolicy
          }
          onChange={
            handlePolicyChange
          }
          rows={16}
          placeholder="Write your return and exchange policy here..."
          style={{
            width: "100%",
            padding: "15px",
            marginTop: "15px",
            borderRadius: "10px",
            border:
              "1px solid #ddd",
            resize: "vertical",
            fontFamily:
              "inherit",
            fontSize: "15px",
            lineHeight: 1.7,
            boxSizing:
              "border-box",
          }}
        />

        <br />
        <br />

        <button
          onClick={saveStore}
          disabled={saving}
        >
          {saving
            ? "Saving..."
            : "Save Return Policy"}
        </button>
      </div>

      {/* =========================
          SHIPPING POLICY
      ========================== */}

      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "15px",
          marginBottom: "30px",
        }}
      >
        <h2>
          Shipping Policy
        </h2>

        <p
          style={{
            color: "#666",
          }}
        >
          Write the shipping
          information displayed to
          customers.
        </p>

        <textarea
          name="shippingPolicy"
          value={
            storeForm.shippingPolicy
          }
          onChange={
            handlePolicyChange
          }
          rows={8}
          placeholder="Write your shipping policy here..."
          style={{
            width: "100%",
            padding: "15px",
            marginTop: "15px",
            borderRadius: "10px",
            border:
              "1px solid #ddd",
            resize: "vertical",
            fontFamily:
              "inherit",
            fontSize: "15px",
            boxSizing:
              "border-box",
          }}
        />

        <br />
        <br />

        <button
          onClick={saveStore}
          disabled={saving}
        >
          {saving
            ? "Saving..."
            : "Save Shipping Policy"}
        </button>
      </div>

      {/* =========================
          TERMS & CONDITIONS
      ========================== */}

      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "15px",
          marginBottom: "30px",
        }}
      >
        <h2>
          Terms & Conditions
        </h2>

        <p
          style={{
            color: "#666",
          }}
        >
          Write the complete terms
          and conditions displayed to
          customers.
        </p>

        <textarea
          name="termsAndConditions"
          value={
            storeForm.termsAndConditions
          }
          onChange={
            handlePolicyChange
          }
          rows={16}
          placeholder="Write your terms and conditions here..."
          style={{
            width: "100%",
            padding: "15px",
            marginTop: "15px",
            borderRadius: "10px",
            border:
              "1px solid #ddd",
            resize: "vertical",
            fontFamily:
              "inherit",
            fontSize: "15px",
            lineHeight: 1.7,
            boxSizing:
              "border-box",
          }}
        />

        <br />
        <br />

        <button
          onClick={saveStore}
          disabled={saving}
        >
          {saving
            ? "Saving..."
            : "Save Terms & Conditions"}
        </button>
      </div>

      {/* =========================
          THEME SETTINGS
      ========================== */}

      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "15px",
          marginBottom: "30px",
        }}
      >
        <h2>
          Theme Settings
        </h2>

        <label>
          Website Title
        </label>

        <input
          name="websiteTitle"
          value={
            themeForm.websiteTitle
          }
          onChange={
            handleThemeChange
          }
        />

        <label>
          Primary Color
        </label>

        <input
          type="color"
          name="primary"
          value={
            themeForm.primary
          }
          onChange={
            handleThemeChange
          }
        />

        <label>
          Secondary Color
        </label>

        <input
          type="color"
          name="secondary"
          value={
            themeForm.secondary
          }
          onChange={
            handleThemeChange
          }
        />

        <label>
          Navbar Color
        </label>

        <input
          type="color"
          name="navbar"
          value={
            themeForm.navbar
          }
          onChange={
            handleThemeChange
          }
        />

        <label>
          Footer Color
        </label>

        <input
          type="color"
          name="footer"
          value={
            themeForm.footer
          }
          onChange={
            handleThemeChange
          }
        />

        <label>
          Background
        </label>

        <input
          type="color"
          name="background"
          value={
            themeForm.background
          }
          onChange={
            handleThemeChange
          }
        />

        <br />

        <label>
          <input
            type="checkbox"
            name="darkMode"
            checked={
              themeForm.darkMode
            }
            onChange={
              handleThemeChange
            }
          />

          {" "}
          Dark Mode
        </label>

        <br />
        <br />

        <button
          onClick={saveTheme}
        >
          Save Theme
        </button>
      </div>

    </section>
  );
}

export default AdminSettings;