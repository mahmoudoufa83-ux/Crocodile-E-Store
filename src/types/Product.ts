export type Product = {
  id: string;

  name: string;

  category: string;

  brand: string;

  price: number;

  oldPrice: number;

  rating: number;

  stock: number;

  image: string;

  description?: string;

  featured?: boolean;

  createdAt?: string;
};