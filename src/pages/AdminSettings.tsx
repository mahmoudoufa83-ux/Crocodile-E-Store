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

  async function saveStore() {
    await updateSettings(storeForm);

    alert("Store Settings Saved");
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

  return (
    <section className="admin-products">

      <div className="admin-header">
        <h1>Store Settings</h1>
        <p>Manage Store & Website</p>
      </div>

      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "15px",
          marginBottom: "30px",
        }}
      >

        <h2>Store Information</h2>

        <input
          name="storeName"
          placeholder="Store Name"
          value={storeForm.storeName}
          onChange={handleStoreChange}
        />

        <input
          name="adminName"
          placeholder="Admin Name"
          value={storeForm.adminName}
          onChange={handleStoreChange}
        />

        <input
          name="adminEmail"
          placeholder="Admin Email"
          value={storeForm.adminEmail}
          onChange={handleStoreChange}
        />

        <input
          name="phone"
          placeholder="Phone"
          value={storeForm.phone}
          onChange={handleStoreChange}
        />

        <input
          name="whatsapp"
          placeholder="WhatsApp"
          value={storeForm.whatsapp}
          onChange={handleStoreChange}
        />

        <input
          name="address"
          placeholder="Address"
          value={storeForm.address}
          onChange={handleStoreChange}
        />

        <input
          name="facebook"
          placeholder="Facebook"
          value={storeForm.facebook}
          onChange={handleStoreChange}
        />

        <input
          name="instagram"
          placeholder="Instagram"
          value={storeForm.instagram}
          onChange={handleStoreChange}
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

        <button onClick={saveStore}>
          Save Store
        </button>

      </div>

      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "15px",
        }}
      >

        <h2>Theme Settings</h2>

        <label>Website Title</label>

        <input
          name="websiteTitle"
          value={themeForm.websiteTitle}
          onChange={handleThemeChange}
        />

        <label>Primary Color</label>

        <input
          type="color"
          name="primary"
          value={themeForm.primary}
          onChange={handleThemeChange}
        />

        <label>Secondary Color</label>

        <input
          type="color"
          name="secondary"
          value={themeForm.secondary}
          onChange={handleThemeChange}
        />

        <label>Navbar Color</label>

        <input
          type="color"
          name="navbar"
          value={themeForm.navbar}
          onChange={handleThemeChange}
        />

        <label>Footer Color</label>

        <input
          type="color"
          name="footer"
          value={themeForm.footer}
          onChange={handleThemeChange}
        />

        <label>Background</label>

        <input
          type="color"
          name="background"
          value={themeForm.background}
          onChange={handleThemeChange}
        />

        <br />

        <label>
          <input
            type="checkbox"
            name="darkMode"
            checked={themeForm.darkMode}
            onChange={handleThemeChange}
          />

          Dark Mode
        </label>

        <br />
        <br />

        <button onClick={saveTheme}>
          Save Theme
        </button>

      </div>

    </section>
  );
}

export default AdminSettings;