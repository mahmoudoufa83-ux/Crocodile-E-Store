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
  createContext<OrderContextType | null>(null);

export function OrderProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const { user } = useAuth();

  const [orders, setOrders] =
    useState<Order[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    refreshOrders();

  }, []);

  async function refreshOrders() {

    try {

      setLoading(true);

      const q = query(
        collection(db, "orders"),
        orderBy("date", "desc")
      );

      const snapshot =
        await getDocs(q);

      const data = snapshot.docs.map(
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
        "Failed to load orders",
        error
      );

    } finally {

      setLoading(false);

    }

  }

  async function addOrder(
    order: OrderData
  ) {

    try {

      await addDoc(
        collection(db, "orders"),
        {

          ...order,

          userId: user?.uid ?? "",

          date:
            new Date().toISOString(),

          status: "Pending",

        }
      );

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
                name: item.name,
                quantity:
                  item.quantity,
                price: item.price,
              })
            ),

        }
      );

      await refreshOrders();

      console.log(
        "✅ Order Saved Successfully"
      );

    } catch (error) {

      console.error(
        "Order Error:",
        error
      );

    }

  }  async function updateOrderStatus(
    id: string,
    status: Order["status"]
  ) {

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
        "Failed to update order",
        error
      );

    }

  }

  async function deleteOrder(
    id: string
  ) {

    try {

      await deleteDoc(
        doc(db, "orders", id)
      );

      await refreshOrders();

    } catch (error) {

      console.error(
        "Failed to delete order",
        error
      );

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