import {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useCallback,
} from "react";
import { useSuits } from "./SuitsContext";

const initialState = {
  category: "All",
  priceRange: { min: null, max: null },
  sortBy: "",
};

function filterReducer(state, action) {
  switch (action.type) {
    case "SET_CATEGORY":
      return { ...state, category: action.payload };
    case "SET_PRICE_RANGE":
      return { ...state, priceRange: action.payload };
    case "SET_SORT_BY":
      return { ...state, sortBy: action.payload };
    default:
      return state;
  }
}

const FilterContext = createContext(null);

export function FilterProvider({ children }) {
  const { allSuit } = useSuits();
  const [state, dispatch] = useReducer(filterReducer, initialState);

  const filteredAndSortedSuits = useMemo(() => {
    let suits = [...allSuit];

    if (state.category !== "All") {
      suits = suits.filter((s) => s.category === state.category);
    }

    const { min, max } = state.priceRange;
    if (min !== null) suits = suits.filter((s) => s.price >= min);
    if (max !== null) suits = suits.filter((s) => s.price <= max);

    switch (state.sortBy) {
      case "Price, low to high":
        return suits.sort((a, b) => a.price - b.price);
      case "Price, high to low":
        return suits.sort((a, b) => b.price - a.price);
      case "Alphabetically, A-Z":
        return suits.sort((a, b) => a.name.localeCompare(b.name));
      case "Alphabetically, Z-A":
        return suits.sort((a, b) => b.name.localeCompare(a.name));
      case "Date, new to old":
        return suits.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
      case "Date, old to new":
        return suits.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
        );
      default:
        return suits;
    }
  }, [allSuit, state.category, state.priceRange, state.sortBy]);

  const filterByCategory = useCallback((category) => {
    dispatch({ type: "SET_CATEGORY", payload: category });
  }, []);

  const filterByPrice = useCallback((min, max = null) => {
    dispatch({ type: "SET_PRICE_RANGE", payload: { min, max } });
  }, []);

  const setSortType = useCallback((sortBy) => {
    dispatch({ type: "SET_SORT_BY", payload: sortBy });
  }, []);

  const value = useMemo(
    () => ({
      filteredSuits: filteredAndSortedSuits,
      filterByCategory,
      filterByPrice,
      setSortType,
      activeCategory: state.category,
      sortType: state.sortBy,
    }),
    [
      filteredAndSortedSuits,
      filterByCategory,
      filterByPrice,
      setSortType,
      state.category,
      state.sortBy,
    ],
  );

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
}

export const useFilter = () => useContext(FilterContext);
