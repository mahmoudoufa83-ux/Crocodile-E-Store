import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

import { db } from "../firebase";

export type StoreSettings = {
  storeName: string;
  adminName: string;
  adminEmail: string;
  logo: string;
  phone: string;
  whatsapp: string;
  address: string;
  facebook: string;
  instagram: string;
};

type StoreContextType = {
  settings: StoreSettings;
  loading: boolean;
  updateSettings: (
    data: StoreSettings
  ) => Promise<void>;
};

const defaultSettings: StoreSettings = {
  storeName: "Crocodile Print Solutions",
  adminName: "Administrator",
  adminEmail: "",
  logo: "",
  phone: "",
  whatsapp: "",
  address: "",
  facebook: "",
  instagram: "",
};

const StoreContext =
  createContext<StoreContextType | null>(null);

export function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, setSettings] =
    useState(defaultSettings);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadSettings() {
      try {
        const ref = doc(
          db,
          "settings",
          "site"
        );

        const snapshot =
          await getDoc(ref);

        if (snapshot.exists()) {
          const data = {
            ...defaultSettings,
            ...(snapshot.data() as StoreSettings),
          };

          setSettings(data);
        } else {
          await setDoc(
            ref,
            defaultSettings
          );

          setSettings(defaultSettings);
        }
      } catch (error) {
        console.error(
          "Firestore Error:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadSettings();
  }, []);

  async function updateSettings(
    data: StoreSettings
  ) {
    try {
      await setDoc(
        doc(
          db,
          "settings",
          "site"
        ),
        data
      );

      setSettings(data);
    } catch (error) {
      console.error(
        "Save Error:",
        error
      );
    }
  }

  return (
    <StoreContext.Provider
      value={{
        settings,
        loading,
        updateSettings,
      }}
    >
      {loading ? (
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: "#ffffff",
            gap: "20px",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              border: "5px solid #e5e7eb",
              borderTop: "5px solid #15803d",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />

          <h2
            style={{
              color: "#15803d",
              margin: 0,
              fontSize: "22px",
              fontWeight: 700,
            }}
          >
            Loading...
          </h2>

          <style>
            {`
              @keyframes spin {
                from {
                  transform: rotate(0deg);
                }
                to {
                  transform: rotate(360deg);
                }
              }
            `}
          </style>
        </div>
      ) : (
        children
      )}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context =
    useContext(StoreContext);

  if (!context) {
    throw new Error(
      "useStore must be used inside StoreProvider"
    );
  }

  return context;
}