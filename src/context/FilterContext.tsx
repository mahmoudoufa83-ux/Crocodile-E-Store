import { createContext, useContext, useState } from "react";

type FilterContextType = {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;

  brand: string;
  setBrand: React.Dispatch<React.SetStateAction<string>>;

  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;

  maxPrice: number;
  setMaxPrice: React.Dispatch<React.SetStateAction<number>>;

  inStock: boolean;
  setInStock: React.Dispatch<React.SetStateAction<boolean>>;

  resetFilters: () => void;
};

const FilterContext = createContext<FilterContextType | null>(null);

export function FilterProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [sort, setSort] = useState("Newest");

  const [maxPrice, setMaxPrice] = useState(100000);

  const [inStock, setInStock] = useState(false);

  function resetFilters() {
    setCategory("All");
    setBrand("All");
    setSort("Newest");
    setMaxPrice(100000);
    setInStock(false);
  }

  return (
    <FilterContext.Provider
      value={{
        category,
        setCategory,

        brand,
        setBrand,

        sort,
        setSort,

        maxPrice,
        setMaxPrice,

        inStock,
        setInStock,

        resetFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  return useContext(FilterContext)!;
}