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
  const { user, loading: authLoading } =
    useAuth();

  const [orders, setOrders] =
    useState<Order[]>([]);

  const [loading, setLoading] =
    useState(true);

  /*
   * =========================
   * LOAD ORDERS
   * =========================
   *
   * Orders are readable only by Admin.
   *
   * Guests and normal users must NOT
   * try to read the orders collection.
   */

  useEffect(() => {
    if (authLoading) {
      return;
    }

    refreshOrders();
  }, [user, authLoading]);

  async function refreshOrders() {
    /*
     * =========================
     * GUEST / NORMAL USER
     * =========================
     *
     * Do not query Firestore orders.
     *
     * This is important because the
     * Firestore Rules only allow the
     * Admin to read orders.
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
          (document) => ({
            id: document.id,

            ...(document.data() as Omit<
              Order,
              "id"
            >),
          })
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
   * This function works for:
   *
   * 1. Guest
   * 2. Normal User
   * 3. Admin
   *
   * Login is NOT required.
   */

  async function addOrder(
    order: OrderData
  ): Promise<void> {
    try {
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
           * If the customer is logged in,
           * save the Firebase UID.
           *
           * If Guest:
           * userId = ""
           */
          userId:
            user?.uid ??
            order.userId ??
            "",

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

          total:
            order.total,

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
       * REFRESH
       * =========================
       *
       * Only Admin should refresh
       * because only Admin can read
       * orders.
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
       * VERY IMPORTANT:
       *
       * Re-throw the error so Checkout
       * knows that the order failed.
       *
       * This prevents clearCart()
       * from running after a failed order.
       */

      throw error;
    }
  }

  /*
   * =========================
   * UPDATE ORDER STATUS
   * =========================
   *
   * Admin only.
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
   *
   * Admin only.
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