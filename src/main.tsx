import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import App from "./App";

import "./index.css";

import { StoreProvider } from "./context/StoreContext";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { SearchProvider } from "./context/SearchContext";
import { FilterProvider } from "./context/FilterContext";
import { RecentlyViewedProvider } from "./context/RecentlyViewedContext";
import { OrderProvider } from "./context/OrderContext";
import { ProductProvider } from "./context/ProductContext";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <BrowserRouter>

      <StoreProvider>

        <ThemeProvider>

          <LanguageProvider>

            <AuthProvider>

              <SearchProvider>

                <FilterProvider>

                  <RecentlyViewedProvider>

                    <OrderProvider>

                      <WishlistProvider>

                        <ProductProvider>

                          <CartProvider>

                            <App />

                          </CartProvider>

                        </ProductProvider>

                      </WishlistProvider>

                    </OrderProvider>

                  </RecentlyViewedProvider>

                </FilterProvider>

              </SearchProvider>

            </AuthProvider>

          </LanguageProvider>

        </ThemeProvider>

      </StoreProvider>

    </BrowserRouter>
  </React.StrictMode>
);