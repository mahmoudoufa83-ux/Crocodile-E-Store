import { createContext, useContext, useState } from "react";

type Product = {
  id: number;
  name: string;
  category: string;
  brand: string;
  price: number;
  oldPrice: number;
  rating: number;
  stock: number;
  image: string;
};

type RecentlyViewedContextType = {
  viewed: Product[];
  addViewed: (product: Product) => void;
};

const RecentlyViewedContext =
  createContext<RecentlyViewedContextType | null>(null);

export function RecentlyViewedProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [viewed, setViewed] = useState<Product[]>([]);

  function addViewed(product: Product) {

    setViewed((prev) => {

      const filtered = prev.filter(

        (item) => item.id !== product.id

      );

      return [product, ...filtered].slice(0, 6);

    });

  }

  return (

    <RecentlyViewedContext.Provider

      value={{

        viewed,

        addViewed,

      }}

    >

      {children}

    </RecentlyViewedContext.Provider>

  );

}

export function useRecentlyViewed() {

  return useContext(RecentlyViewedContext)!;

}