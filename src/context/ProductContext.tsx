import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

import type { ReactNode } from "react";
import type { Product } from "../types/Product";

export type { Product };

import {
  getProducts,
  addProduct as addProductService,
  updateProduct as updateProductService,
  deleteProduct as deleteProductService,
} from "../services/productService";

type ProductContextType = {
  products: Product[];
  loading: boolean;

  addProduct: (product: Product) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: string | number) => Promise<void>;

  refreshProducts: () => Promise<void>;
};

const ProductContext =
  createContext<ProductContextType | null>(null);

export function ProductProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  const refreshProducts = useCallback(
    async () => {
      try {
        const data = await getProducts();

        setProducts(data);
      } catch (error) {
        console.error(
          "Failed to load products",
          error
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    refreshProducts();
  }, [refreshProducts]);

  const addProduct = async (
    product: Product
  ): Promise<void> => {
    try {
      await addProductService(product);

      await refreshProducts();
    } catch (error) {
      console.error(
        "Failed to add product",
        error
      );
      throw error;
    }
  };

  const updateProduct = async (
    product: Product
  ): Promise<void> => {
    try {
      await updateProductService(product);

      await refreshProducts();
    } catch (error) {
      console.error(
        "Failed to update product",
        error
      );
      throw error;
    }
  };

  const deleteProduct = async (
    id: string | number
  ): Promise<void> => {
    try {
      await deleteProductService(id);

      await refreshProducts();
    } catch (error) {
      console.error(
        "Failed to delete product",
        error
      );
      throw error;
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        addProduct,
        updateProduct,
        deleteProduct,
        refreshProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context =
    useContext(ProductContext);

  if (!context) {
    throw new Error(
      "useProducts must be used inside ProductProvider"
    );
  }

  return context;
}