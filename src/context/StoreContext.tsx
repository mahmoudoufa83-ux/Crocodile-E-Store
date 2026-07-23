import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export type StoreSettings = {
  storeName: string;
  adminName: string;
  adminEmail: string;
  adminPassword: string;
  logo: string;
  phone: string;
  whatsapp: string;
  address: string;
  facebook: string;
  instagram: string;
};

type StoreContextType = {
  settings: StoreSettings;
  updateSettings: (data: StoreSettings) => void;
};

const defaultSettings: StoreSettings = {
  storeName: "Crocodile Print Solutions",
  adminName: "Administrator",
  adminEmail: "admin@crocodile.com",
  adminPassword: "123456",
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
    useState<StoreSettings>(() => {

      const saved = localStorage.getItem(
        "storeSettings"
      );

      return saved
        ? JSON.parse(saved)
        : defaultSettings;

    });

  useEffect(() => {

    localStorage.setItem(
      "storeSettings",
      JSON.stringify(settings)
    );

  }, [settings]);

  function updateSettings(
    data: StoreSettings
  ) {

    setSettings(data);

  }

  return (

    <StoreContext.Provider
      value={{
        settings,
        updateSettings,
      }}
    >

      {children}

    </StoreContext.Provider>

  );

}

export function useStore() {

  return useContext(StoreContext)!;

}