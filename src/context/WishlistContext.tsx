import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import type { Product } from "../types/Product";

type WishlistContextType = {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: string) => void;
};

const WishlistContext =
  createContext<WishlistContextType | null>(null);

export function WishlistProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const savedWishlist =
      localStorage.getItem("wishlist");

    return savedWishlist
      ? JSON.parse(savedWishlist)
      : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  function addToWishlist(product: Product) {
    setWishlist((prev) => {
      const exists = prev.some(
        (item) => item.id === product.id
      );

      if (exists) return prev;

      return [...prev, product];
    });
  }

  function removeFromWishlist(id: string) {
    setWishlist((prev) =>
      prev.filter((item) => item.id !== id)
    );
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext)!;
}