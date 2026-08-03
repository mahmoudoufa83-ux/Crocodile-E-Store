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
} from "firebase/firestore";

import { db } from "../firebase";

import type { CartItem } from "./CartContext";

export type Order = {
  id: number;
  items: CartItem[];
  total: number;
  date: string;
  status: "Pending" | "Processing" | "Delivered";
};

export type OrderData = {
  customerName: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  paymentMethod: string;
  items: CartItem[];
  total: number;
};

type OrderContextType = {
  orders: Order[];

  addOrder: (
    order: OrderData
  ) => Promise<void>;

  updateOrderStatus: (
    id: number,
    status: Order["status"]
  ) => void;

  deleteOrder: (
    id: number
  ) => void;
};

const OrderContext =
  createContext<OrderContextType | null>(null);

export function OrderProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [orders, setOrders] =
    useState<Order[]>(() => {
      const saved =
        localStorage.getItem("orders");

      return saved
        ? JSON.parse(saved)
        : [];
    });

  useEffect(() => {
    localStorage.setItem(
      "orders",
      JSON.stringify(orders)
    );
  }, [orders]);

  async function addOrder(
    order: OrderData
  ) {
    const newOrder: Order = {
      id: Date.now(),
      items: order.items,
      total: order.total,
      date: new Date().toLocaleString(),
      status: "Pending",
    };

    setOrders((prev) => [
      newOrder,
      ...prev,
    ]);

    try {
      // Save in Firestore
      await addDoc(
        collection(db, "orders"),
        {
          ...order,
          date: new Date().toISOString(),
          status: "Pending",
        }
      );

      // Send to Railway API
      await axios.post(
        "https://crocodile-order-api-production.up.railway.app/send-order",
        {
          customerName: order.customerName,
          email: order.email,
          phone: order.phone,
          city: order.city,
          address: order.address,
          paymentMethod: order.paymentMethod,
          total: order.total,
          items: order.items.map(
            (item) => ({
              name: item.name,
              quantity: item.quantity,
              price: item.price,
            })
          ),
        }
      );

      console.log(
        "✅ Order saved and sent."
      );
    } catch (error) {
      console.error(
        "Order Error:",
        error
      );
    }
  }

  function updateOrderStatus(
    id: number,
    status: Order["status"]
  ) {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id
          ? {
              ...order,
              status,
            }
          : order
      )
    );
  }

  function deleteOrder(
    id: number
  ) {
    setOrders((prev) =>
      prev.filter(
        (order) =>
          order.id !== id
      )
    );
  }

  return (
    <OrderContext.Provider
      value={{
        orders,
        addOrder,
        updateOrderStatus,
        deleteOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  return useContext(
    OrderContext
  )!;
}