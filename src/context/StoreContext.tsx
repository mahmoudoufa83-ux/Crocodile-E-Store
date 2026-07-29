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

  console.log("🔥 StoreProvider Rendered");

  const [settings, setSettings] =
    useState(defaultSettings);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function loadSettings() {

      try {

        console.log("🔥 Loading Firestore Settings...");

        const ref = doc(
          db,
          "settings",
          "site"
        );

        const snapshot =
          await getDoc(ref);

        console.log(
          "🔥 Snapshot exists:",
          snapshot.exists()
        );

        console.log(
          "🔥 Snapshot data:",
          snapshot.data()
        );

        if (snapshot.exists()) {

          const data = {
            ...defaultSettings,
            ...(snapshot.data() as StoreSettings),
          };

          console.log(
            "🔥 Final Settings:",
            data
          );

          setSettings(data);

        } else {

          console.log(
            "🔥 Document not found. Creating default..."
          );

          await setDoc(
            ref,
            defaultSettings
          );

          setSettings(defaultSettings);

        }

      } catch (error) {

        console.error(
          "🔥 Firestore Error:",
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

      console.log(
        "🔥 Settings Saved:",
        data
      );

      setSettings(data);

    } catch (error) {

      console.error(
        "🔥 Save Error:",
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

      {children}

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