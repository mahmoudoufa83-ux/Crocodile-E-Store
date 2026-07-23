import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import initialProducts from "../data/products";

export type Product = {

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

type ProductContextType = {

  products: Product[];

  addProduct: (product: Product) => void;

  updateProduct: (product: Product) => void;

  deleteProduct: (id: number) => void;

};

const ProductContext = createContext<ProductContextType | null>(null);

export function ProductProvider({

  children,

}: {

  children: React.ReactNode;

}) {

  const [products, setProducts] = useState<Product[]>(() => {

    const savedProducts = localStorage.getItem("products");

    if (savedProducts) {

      return JSON.parse(savedProducts);

    }

    return initialProducts;

  });

  function addProduct(product: Product) {

    setProducts((prev) => [

      ...prev,

      product,

    ]);

  }

  function updateProduct(updatedProduct: Product) {

    setProducts((prev) =>

      prev.map((product) =>

        product.id === updatedProduct.id

          ? updatedProduct

          : product

      )

    );

  }

  function deleteProduct(id: number) {

    setProducts((prev) =>

      prev.filter(

        (product) => product.id !== id

      )

    );

  }

  useEffect(() => {

    localStorage.setItem(

      "products",

      JSON.stringify(products)

    );

  }, [products]);

  return (

    <ProductContext.Provider

      value={{

        products,

        addProduct,

        updateProduct,

        deleteProduct,

      }}

    >

      {children}

    </ProductContext.Provider>

  );

}

export function useProducts() {

  return useContext(ProductContext)!;

}