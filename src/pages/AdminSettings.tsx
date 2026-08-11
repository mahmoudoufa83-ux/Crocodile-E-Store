import { useState, useEffect } from "react";

import { useStore } from "../context/StoreContext";
import { useTheme } from "../context/ThemeContext";

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

  function handleLogo(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setStoreForm((prev) => ({
        ...prev,
        logo: reader.result as string,
      }));
    };

    reader.readAsDataURL(file);
  }

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

  function handlePolicyChange(
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) {
    setStoreForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function saveStore() {
    try {
      setSaving(true);

      await updateSettings(storeForm);

      alert("Store Settings Saved Successfully");
    } catch (error) {
      console.error(error);

      alert(
        "Failed to save store settings."
      );
    } finally {
      setSaving(false);
    }
  }

  function saveTheme() {
    updateTheme(themeForm);

    alert("Theme Updated Successfully");
  }

  if (loading) {
    return (
      <section className="admin-products">
        <h2>Loading Settings...</h2>
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
          value={storeForm.storeName}
          onChange={
            handleStoreChange
          }
        />

        <input
          name="adminName"
          placeholder="Admin Name"
          value={storeForm.adminName}
          onChange={
            handleStoreChange
          }
        />

        <input
          name="adminEmail"
          placeholder="Admin Email"
          value={storeForm.adminEmail}
          onChange={
            handleStoreChange
          }
        />

        <input
          name="phone"
          placeholder="Phone"
          value={storeForm.phone}
          onChange={
            handleStoreChange
          }
        />

        <input
          name="whatsapp"
          placeholder="WhatsApp"
          value={storeForm.whatsapp}
          onChange={
            handleStoreChange
          }
        />

        <input
          name="address"
          placeholder="Address"
          value={storeForm.address}
          onChange={
            handleStoreChange
          }
        />

        <input
          name="facebook"
          placeholder="Facebook"
          value={storeForm.facebook}
          onChange={
            handleStoreChange
          }
        />

        <input
          name="instagram"
          placeholder="Instagram"
          value={storeForm.instagram}
          onChange={
            handleStoreChange
          }
        />

        <br />

        <input
          type="file"
          accept="image/*"
          onChange={handleLogo}
        />

        {storeForm.logo && (
          <img
            src={storeForm.logo}
            alt="logo"
            style={{
              width: 120,
              height: 120,
              objectFit: "cover",
              borderRadius: 12,
              marginTop: 20,
            }}
          />
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
          Write the return and
          refund conditions displayed
          to customers.
        </p>

        <textarea
          name="returnPolicy"
          value={
            storeForm.returnPolicy
          }
          onChange={
            handlePolicyChange
          }
          rows={8}
          placeholder="Write your return policy here..."
          style={{
            width: "100%",
            padding: "15px",
            marginTop: "15px",
            borderRadius: "10px",
            border: "1px solid #ddd",
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
            border: "1px solid #ddd",
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