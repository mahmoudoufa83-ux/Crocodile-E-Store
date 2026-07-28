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
          "store"
        );

        const snapshot =
          await getDoc(ref);

        if (snapshot.exists()) {

          setSettings({
            ...defaultSettings,
            ...(snapshot.data() as StoreSettings),
          });

        } else {

          await setDoc(
            ref,
            defaultSettings
          );

          setSettings(defaultSettings);

        }

      } catch (error) {

        console.error(error);

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
          "store"
        ),
        data
      );

      setSettings(data);

    } catch (error) {

      console.error(error);

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