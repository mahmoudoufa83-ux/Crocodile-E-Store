import type { CartItem } from "../context/CartContext";

export type OrderStatus =
  | "Pending"
  | "Processing"
  | "Delivered";

export interface Order {
  id: string;

  items: CartItem[];

  // Products total before shipping
  total: number;

  // Shipping cost
  shippingCost: number;

  // Final total including shipping
  finalTotal: number;

  date: string;

  status: OrderStatus;

  customerName: string;

  email: string;

  phone: string;

  city: string;

  address: string;

  paymentMethod: string;

  userId: string;
}

export interface OrderData {
  customerName: string;

  email: string;

  phone: string;

  city: string;

  address: string;

  paymentMethod: string;

  items: CartItem[];

  // Products total before shipping
  total: number;

  // Shipping cost
  shippingCost: number;

  // Final total including shipping
  finalTotal: number;

  userId: string;
}