import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import axios from "axios";

import {
  addDoc,
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";

import { db } from "../firebase";

import { useAuth } from "./AuthContext";
import { useStore } from "./StoreContext";

import type {
  Order,
  OrderData,
} from "../types/Order";

type OrderContextType = {
  orders: Order[];

  loading: boolean;

  addOrder: (
    order: OrderData
  ) => Promise<void>;

  updateOrderStatus: (
    id: string,
    status: Order["status"]
  ) => Promise<void>;

  deleteOrder: (
    id: string
  ) => Promise<void>;

  refreshOrders: () => Promise<void>;

  getShippingCost: (
    city: string
  ) => number;
};

const OrderContext =
  createContext<OrderContextType | null>(
    null
  );

export function OrderProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    user,
    loading: authLoading,
  } = useAuth();

  const { settings } = useStore();

  const [orders, setOrders] =
    useState<Order[]>([]);

  const [loading, setLoading] =
    useState(true);

  /*
   * =========================
   * SHIPPING COST
   * =========================
   *
   * Finds the shipping price
   * according to the customer's
   * governorate.
   */

  function getShippingCost(
    city: string
  ): number {
    if (!city) {
      return 0;
    }

    const normalizedCity =
      city.trim().toLowerCase();

    const shippingRates =
      settings.shippingRates;

    const cityMap: Record<
      string,
      keyof typeof shippingRates
    > = {
      cairo: "Cairo",

      "القاهرة": "Cairo",

      giza: "Giza",

      "الجيزة": "Giza",

      alexandria:
        "Alexandria",

      "الإسكندرية":
        "Alexandria",

      "alexandria governorate":
        "Alexandria",

      qalyubia:
        "Qalyubia",

      "القليوبية":
        "Qalyubia",

      dakahlia:
        "Dakahlia",

      "الدقهلية":
        "Dakahlia",

      sharqia:
        "Sharqia",

      "الشرقية":
        "Sharqia",

      gharbia:
        "Gharbia",

      "الغربية":
        "Gharbia",

      monufia:
        "Monufia",

      "المنوفية":
        "Monufia",

      beheira:
        "Beheira",

      "البحيرة":
        "Beheira",

      "kafr el sheikh":
        "KafrElSheikh",

      "kafr-el-sheikh":
        "KafrElSheikh",

      "كفر الشيخ":
        "KafrElSheikh",

      damietta:
        "Damietta",

      "دمياط":
        "Damietta",

      "port said":
        "PortSaid",

      "port-said":
        "PortSaid",

      "بورسعيد":
        "PortSaid",

      ismailia:
        "Ismailia",

      "ismailia governorate":
        "Ismailia",

      "الإسماعيلية":
        "Ismailia",

      suez:
        "Suez",

      "السويس":
        "Suez",

      "north sinai":
        "NorthSinai",

      "north-sinai":
        "NorthSinai",

      "شمال سيناء":
        "NorthSinai",

      "south sinai":
        "SouthSinai",

      "south-sinai":
        "SouthSinai",

      "جنوب سيناء":
        "SouthSinai",

      fayoum:
        "Fayoum",

      "الفيوم":
        "Fayoum",

      "beni suef":
        "BeniSuef",

      "beni-suef":
        "BeniSuef",

      "بني سويف":
        "BeniSuef",

      minya:
        "Minya",

      "المنيا":
        "Minya",

      assiut:
        "Assiut",

      "أسيوط":
        "Assiut",

      sohag:
        "Sohag",

      "سوهاج":
        "Sohag",

      qena:
        "Qena",

      "قنا":
        "Qena",

      luxor:
        "Luxor",

      "الأقصر":
        "Luxor",

      aswan:
        "Aswan",

      "أسوان":
        "Aswan",

      "red sea":
        "RedSea",

      "red-sea":
        "RedSea",

      "البحر الأحمر":
        "RedSea",

      "new valley":
        "NewValley",

      "new-valley":
        "NewValley",

      "الوادي الجديد":
        "NewValley",

      matrouh:
        "Matrouh",

      "مطروح":
        "Matrouh",
    };

    const rateKey =
      cityMap[normalizedCity];

    if (!rateKey) {
      return 0;
    }

    return Number(
      shippingRates[rateKey] ?? 0
    );
  }

  /*
   * =========================
   * LOAD ORDERS
   * =========================
   *
   * Only Admin can read all
   * orders according to the
   * current Firestore rules.
   */

  useEffect(() => {
    if (authLoading) {
      return;
    }

    refreshOrders();
  }, [user, authLoading]);

  async function refreshOrders() {
    /*
     * Guests and normal users
     * must not query orders because
     * Firestore rules only allow
     * Admin to read them.
     */

    if (
      !user ||
      user.role !== "admin"
    ) {
      setOrders([]);

      setLoading(false);

      return;
    }

    try {
      setLoading(true);

      const q = query(
        collection(db, "orders"),
        orderBy("date", "desc")
      );

      const snapshot =
        await getDocs(q);

      const data =
        snapshot.docs.map(
          (document) => {
            const firestoreData =
              document.data();

            return {
              id: document.id,

              ...firestoreData,

              shippingCost:
                Number(
                  firestoreData.shippingCost ??
                    0
                ),

              finalTotal:
                Number(
                  firestoreData.finalTotal ??
                    firestoreData.total ??
                    0
                ),
            } as Order;
          }
        );

      setOrders(data);
    } catch (error) {
      console.error(
        "Failed to load orders:",
        error
      );

      setOrders([]);
    } finally {
      setLoading(false);
    }
  }

  /*
   * =========================
   * ADD ORDER
   * =========================
   *
   * Works for:
   *
   * 1. Guest
   * 2. Normal User
   * 3. Admin
   */

  async function addOrder(
    order: OrderData
  ): Promise<void> {
    try {
      /*
       * Calculate shipping again
       * before saving the order.
       *
       * This makes sure the price
       * stored in Firestore matches
       * the selected governorate.
       */

      const shippingCost =
        getShippingCost(
          order.city
        );

      /*
       * Products total.
       */

      const productsTotal =
        Number(order.total);

      /*
       * Final order total.
       */

      const finalTotal =
        productsTotal +
        shippingCost;

      /*
       * =========================
       * SAVE TO FIRESTORE
       * =========================
       */

      await addDoc(
        collection(db, "orders"),
        {
          ...order,

          /*
           * Logged-in customer UID.
           *
           * Guest = empty string.
           */

          userId:
            user?.uid ??
            order.userId ??
            "",

          /*
           * Products total.
           */

          total:
            productsTotal,

          /*
           * Shipping price.
           */

          shippingCost,

          /*
           * Final total.
           */

          finalTotal,

          date:
            new Date().toISOString(),

          status: "Pending",
        }
      );

      /*
       * =========================
       * SEND TO TELEGRAM
       * =========================
       */

      await axios.post(
        "https://crocodile-order-api-production.up.railway.app/send-order",
        {
          customerName:
            order.customerName,

          email:
            order.email,

          phone:
            order.phone,

          city:
            order.city,

          address:
            order.address,

          paymentMethod:
            order.paymentMethod,

          /*
           * Products total.
           */

          total:
            productsTotal,

          /*
           * Shipping price.
           */

          shippingCost,

          /*
           * Final total.
           */

          finalTotal,

          items:
            order.items.map(
              (item) => ({
                name:
                  item.name,

                quantity:
                  item.quantity,

                price:
                  item.price,
              })
            ),
        }
      );

      /*
       * =========================
       * ADMIN REFRESH
       * =========================
       */

      if (
        user?.role === "admin"
      ) {
        await refreshOrders();
      }

      console.log(
        "✅ Order Saved Successfully"
      );
    } catch (error) {
      console.error(
        "Order Error:",
        error
      );

      /*
       * Re-throw the error so
       * Checkout knows that the
       * order failed.
       */

      throw error;
    }
  }

  /*
   * =========================
   * UPDATE ORDER STATUS
   * =========================
   */

  async function updateOrderStatus(
    id: string,
    status: Order["status"]
  ) {
    if (
      !user ||
      user.role !== "admin"
    ) {
      console.error(
        "Only admin can update orders."
      );

      return;
    }

    try {
      await updateDoc(
        doc(db, "orders", id),
        {
          status,
        }
      );

      await refreshOrders();
    } catch (error) {
      console.error(
        "Failed to update order:",
        error
      );

      throw error;
    }
  }

  /*
   * =========================
   * DELETE ORDER
   * =========================
   */

  async function deleteOrder(
    id: string
  ) {
    if (
      !user ||
      user.role !== "admin"
    ) {
      console.error(
        "Only admin can delete orders."
      );

      return;
    }

    try {
      await deleteDoc(
        doc(db, "orders", id)
      );

      await refreshOrders();
    } catch (error) {
      console.error(
        "Failed to delete order:",
        error
      );

      throw error;
    }
  }

  return (
    <OrderContext.Provider
      value={{
        orders,

        loading,

        addOrder,

        updateOrderStatus,

        deleteOrder,

        refreshOrders,

        getShippingCost,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context =
    useContext(OrderContext);

  if (!context) {
    throw new Error(
      "useOrders must be used inside OrderProvider"
    );
  }

  return context;
}