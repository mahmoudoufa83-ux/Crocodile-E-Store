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

/*
 * =========================
 * SHIPPING RATES
 * =========================
 */

export type ShippingRates = {
  Cairo: number;
  Giza: number;
  Alexandria: number;
  Qalyubia: number;
  Dakahlia: number;
  Sharqia: number;
  Gharbia: number;
  Monufia: number;
  Beheira: number;
  KafrElSheikh: number;
  Damietta: number;
  PortSaid: number;
  Ismailia: number;
  Suez: number;
  NorthSinai: number;
  SouthSinai: number;
  Fayoum: number;
  BeniSuef: number;
  Minya: number;
  Assiut: number;
  Sohag: number;
  Qena: number;
  Luxor: number;
  Aswan: number;
  RedSea: number;
  NewValley: number;
  Matrouh: number;
};

/*
 * =========================
 * STORE SETTINGS
 * =========================
 */

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

  /*
   * Shipping prices according
   * to governorate.
   */

  shippingRates: ShippingRates;

  /*
   * Return / exchange policy.
   */

  returnPolicy: string;

  /*
   * Shipping policy.
   */

  shippingPolicy: string;

  /*
   * Terms and conditions.
   */

  termsAndConditions: string;

  /*
   * Privacy policy.
   */

  privacyPolicy: string;
};

/*
 * =========================
 * CONTEXT TYPE
 * =========================
 */

type StoreContextType = {
  settings: StoreSettings;

  loading: boolean;

  updateSettings: (
    data: StoreSettings
  ) => Promise<void>;
};

/*
 * =========================
 * DEFAULT SHIPPING RATES
 * =========================
 *
 * You can change these prices
 * later directly from Admin Settings.
 */

const defaultShippingRates: ShippingRates = {
  Cairo: 50,

  Giza: 50,

  Alexandria: 70,

  Qalyubia: 60,

  Dakahlia: 75,

  Sharqia: 70,

  Gharbia: 70,

  Monufia: 70,

  Beheira: 75,

  KafrElSheikh: 75,

  Damietta: 80,

  PortSaid: 80,

  Ismailia: 75,

  Suez: 80,

  NorthSinai: 100,

  SouthSinai: 120,

  Fayoum: 75,

  BeniSuef: 80,

  Minya: 90,

  Assiut: 95,

  Sohag: 100,

  Qena: 105,

  Luxor: 110,

  Aswan: 120,

  RedSea: 120,

  NewValley: 130,

  Matrouh: 120,
};

/*
 * =========================
 * DEFAULT SETTINGS
 * =========================
 */

const defaultSettings: StoreSettings = {
  storeName:
    "Crocodile Print Solutions",

  adminName:
    "Administrator",

  adminEmail:
    "",

  logo:
    "",

  phone:
    "",

  whatsapp:
    "",

  address:
    "",

  facebook:
    "",

  instagram:
    "",

  shippingRates:
    defaultShippingRates,

  returnPolicy:
    "Returns and exchanges are accepted according to our store return policy. Products must be returned in their original condition.",

  shippingPolicy:
    "Shipping fees are calculated according to the customer's governorate and are displayed before placing the order.",

  termsAndConditions:
    "By placing an order, the customer agrees to the store's terms and conditions.",

  privacyPolicy:
    "Customer information is used only to process orders and provide the requested services.",
};

/*
 * =========================
 * CONTEXT
 * =========================
 */

const StoreContext =
  createContext<StoreContextType | null>(
    null
  );

/*
 * =========================
 * PROVIDER
 * =========================
 */

export function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, setSettings] =
    useState<StoreSettings>(
      defaultSettings
    );

  const [loading, setLoading] =
    useState(true);

  /*
   * =========================
   * LOAD SETTINGS
   * =========================
   */

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
          const data =
            snapshot.data();

          /*
           * Merge the existing
           * Firestore settings with
           * the new defaults.
           *
           * This prevents old settings
           * documents from breaking
           * after adding new fields.
           */

          const loadedSettings: StoreSettings =
            {
              ...defaultSettings,

              ...data,

              shippingRates: {
                ...defaultShippingRates,

                ...(data.shippingRates ??
                  {}),
              },
            };

          setSettings(
            loadedSettings
          );
        } else {
          /*
           * First time settings
           * document is created.
           */

          await setDoc(
            ref,
            defaultSettings
          );

          setSettings(
            defaultSettings
          );
        }
      } catch (error) {
        console.error(
          "Firestore Error:",
          error
        );

        /*
         * Keep default settings
         * if Firestore fails.
         */

        setSettings(
          defaultSettings
        );
      } finally {
        setLoading(false);
      }
    }

    loadSettings();
  }, []);

  /*
   * =========================
   * UPDATE SETTINGS
   * =========================
   */

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

      throw error;
    }
  }

  /*
   * =========================
   * PROVIDER
   * =========================
   */

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

            flexDirection:
              "column",

            justifyContent:
              "center",

            alignItems:
              "center",

            background:
              "#ffffff",

            gap: "20px",
          }}
        >
          <div
            style={{
              width: "60px",

              height: "60px",

              border:
                "5px solid #e5e7eb",

              borderTop:
                "5px solid #15803d",

              borderRadius:
                "50%",

              animation:
                "spin 1s linear infinite",
            }}
          />

          <h2
            style={{
              color:
                "#15803d",

              margin: 0,

              fontSize:
                "22px",

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

/*
 * =========================
 * HOOK
 * =========================
 */

export function useStore() {
  const context =
    useContext(
      StoreContext
    );

  if (!context) {
    throw new Error(
      "useStore must be used inside StoreProvider"
    );
  }

  return context;
}