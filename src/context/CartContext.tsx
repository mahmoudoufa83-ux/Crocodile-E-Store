import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";

export type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;

  brand: string;
  category: string;

  stock: number;

  quantity: number;
};

type CartContextType = {
  cart: CartItem[];

  addToCart: (product: Omit<CartItem, "quantity">) => void;

  removeFromCart: (id: number) => void;

  increaseQuantity: (id: number) => void;

  decreaseQuantity: (id: number) => void;

  clearCart: () => void;

  totalItems: number;

  totalPrice: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({

  children,

}: {

  children: React.ReactNode;

}) {

  const [cart, setCart] = useState<CartItem[]>(() => {

    const savedCart = localStorage.getItem("cart");

    return savedCart ? JSON.parse(savedCart) : [];

  });

  useEffect(() => {

    localStorage.setItem(

      "cart",

      JSON.stringify(cart)

    );

  }, [cart]);

  function addToCart(product: Omit<CartItem, "quantity">) {

    setCart((prev) => {

      const existing = prev.find(

        (item) => item.id === product.id

      );

      if (existing) {

        return prev.map((item) =>

          item.id === product.id

            ? {

                ...item,

                quantity: Math.min(

                  item.quantity + 1,

                  item.stock

                ),

              }

            : item

        );

      }

      return [

        ...prev,

        {

          ...product,

          quantity: 1,

        },

      ];

    });

  }

  function removeFromCart(id: number) {

    setCart((prev) =>

      prev.filter((item) => item.id !== id)

    );

  }

  function increaseQuantity(id: number) {

    setCart((prev) =>

      prev.map((item) =>

        item.id === id

          ? {

              ...item,

              quantity: Math.min(

                item.quantity + 1,

                item.stock

              ),

            }

          : item

      )

    );

  }

  function decreaseQuantity(id: number) {

    setCart((prev) =>

      prev

        .map((item) =>

          item.id === id

            ? {

                ...item,

                quantity: item.quantity - 1,

              }

            : item

        )

        .filter((item) => item.quantity > 0)

    );

  }

  function clearCart() {

    setCart([]);

  }

  const totalItems = useMemo(

    () =>

      cart.reduce(

        (acc, item) =>

          acc + item.quantity,

        0

      ),

    [cart]

  );

  const totalPrice = useMemo(

    () =>

      cart.reduce(

        (acc, item) =>

          acc + item.price * item.quantity,

        0

      ),

    [cart]

  );

  return (

    <CartContext.Provider

      value={{

        cart,

        addToCart,

        removeFromCart,

        increaseQuantity,

        decreaseQuantity,

        clearCart,

        totalItems,

        totalPrice,

      }}

    >

      {children}

    </CartContext.Provider>

  );

}

export function useCart() {

  return useContext(CartContext)!;

}