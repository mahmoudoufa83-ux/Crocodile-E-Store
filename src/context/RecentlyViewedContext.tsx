import {
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";

import type { Product } from "../types/Product";

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

  const addViewed = useCallback((product: Product) => {
    setViewed((prev) => {
      const filtered = prev.filter(
        (item) => String(item.id) !== String(product.id)
      );

      return [product, ...filtered].slice(0, 6);
    });
  }, []);

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
  const context = useContext(RecentlyViewedContext);

  if (!context) {
    throw new Error(
      "useRecentlyViewed must be used inside RecentlyViewedProvider"
    );
  }

  return context;
}