import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import type { CartItem } from "./CartContext";

export type Order = {
  id: number;
  items: CartItem[];
  total: number;
  date: string;
  status: "Pending" | "Processing" | "Delivered";
};

type OrderContextType = {
  orders: Order[];

  addOrder: (
    items: CartItem[],
    total: number
  ) => void;

  updateOrderStatus: (
    id: number,
    status: Order["status"]
  ) => void;

  deleteOrder: (id: number) => void;
};

const OrderContext =
  createContext<OrderContextType | null>(null);

export function OrderProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [orders, setOrders] = useState<Order[]>(() => {

    const saved = localStorage.getItem("orders");

    return saved ? JSON.parse(saved) : [];

  });

  useEffect(() => {

    localStorage.setItem(
      "orders",
      JSON.stringify(orders)
    );

  }, [orders]);

  function addOrder(
    items: CartItem[],
    total: number
  ) {

    const newOrder: Order = {

      id: Date.now(),

      items,

      total,

      date: new Date().toLocaleString(),

      status: "Pending",

    };

    setOrders((prev) => [

      newOrder,

      ...prev,

    ]);

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

  function deleteOrder(id: number) {

    setOrders((prev) =>

      prev.filter((order) => order.id !== id)

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

  return useContext(OrderContext)!;

}