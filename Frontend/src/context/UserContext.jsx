import React, {
  createContext,
  useCallback,
  useMemo,
  useReducer,
  useEffect,
} from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const UserDataContext = createContext({
  loading: true,
  activeTab: null,
  allSuit: [],
  filteredSuit: [],
  sortType: "",
  user: null,
  setUser: () => {},
  setFilteredSuit: () => {},
  setSortType: () => {},
  setActiveTab: () => {},
  filterSuitsByCategory: () => {},
  filterSuitsByPrice: () => {},
});

const initialState = {
  loading: true,
  activeTab: null,
  allSuit: [],
  filteredSuit: [],
  sortType: "",
  user: null,
};

function contextReducer(state, action) {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        ...state,
        allSuit: Array.isArray(action.allSuit) ? action.allSuit : [],
        filteredSuit: Array.isArray(action.allSuit) ? action.allSuit : [],
        user: action.user ?? state.user,
        loading: false,
      };
    case "FETCH_FAILURE":
      return { ...state, user: null, loading: false };
    case "SET_USER":
      return { ...state, user: action.user };
    case "SET_FILTERED_SUIT":
      return {
        ...state,
        filteredSuit: Array.isArray(action.filteredSuit)
          ? action.filteredSuit
          : [],
      };
    case "SET_SORT_TYPE":
      return { ...state, sortType: action.sortType };
    case "SET_ACTIVE_TAB":
      return { ...state, activeTab: action.activeTab };
    default:
      return state;
  }
}

function useInitialData() {
  const token = localStorage.getItem("token");

  return useQuery({
    queryKey: ["initialData", token],
    queryFn: async () => {
      const suitsRes = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/suits`,
      );

      let user = null;
      if (token) {
        try {
          const userRes = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/users/me`,
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );
          user = userRes.data.user;
        } catch (err) {
          if (err.response?.status === 401) {
            localStorage.removeItem("token");
          }
        }
      }

      return {
        allSuit: suitsRes.data.allSuit,
        user,
      };
    },
    staleTime: 1000 * 60 * 5,
    retry: 2,
    refetchOnMount: false, // ✅ avoid refetch on route change
    refetchOnWindowFocus: false, // ✅ avoid refetch on tab focus
  });
}

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(contextReducer, initialState);
  const { data, isLoading, error } = useInitialData();

  useEffect(() => {
    if (data) {
      dispatch({
        type: "FETCH_SUCCESS",
        allSuit: data.allSuit,
        user: data.user,
      });
    } else if (error) {
      dispatch({ type: "FETCH_FAILURE" });
    }
  }, [data, error]);

  useEffect(() => {
    if (state.loading && !isLoading && !data) {
      dispatch({ type: "FETCH_FAILURE" });
    }
  }, [isLoading, state.loading, data]);

  const setUserFn = useCallback((user) => {
    dispatch({ type: "SET_USER", user });
  }, []);

  const setFilteredSuitFn = useCallback((filteredSuit) => {
    dispatch({ type: "SET_FILTERED_SUIT", filteredSuit });
  }, []);

  const setSortTypeFn = useCallback((sortType) => {
    dispatch({ type: "SET_SORT_TYPE", sortType });
  }, []);

  const setActiveTabFn = useCallback((activeTab) => {
    dispatch({ type: "SET_ACTIVE_TAB", activeTab });
  }, []);

  const filterSuitsByCategoryFn = useCallback(
    (category) => {
      const allSuits = Array.isArray(state.allSuit) ? state.allSuit : [];
      const filtered =
        category === "All"
          ? allSuits
          : allSuits.filter((suit) => suit.category === category);
      dispatch({ type: "SET_FILTERED_SUIT", filteredSuit: filtered });
    },
    [state.allSuit],
  );

  const filterSuitsByPriceFn = useCallback(
    (minPrice, maxPrice = null) => {
      const allSuits = Array.isArray(state.allSuit) ? state.allSuit : [];
      const filtered = allSuits.filter((suit) => {
        const price = suit.price;
        if (maxPrice !== null) {
          return price >= minPrice && price <= maxPrice;
        } else {
          return price <= minPrice;
        }
      });
      dispatch({ type: "SET_FILTERED_SUIT", filteredSuit: filtered });
    },
    [state.allSuit],
  );

  const sortedSuits = useMemo(() => {
    if (!Array.isArray(state.filteredSuit)) return [];
    const suits = [...state.filteredSuit];
    switch (state.sortType) {
      case "Price, low to high":
        return suits.sort((a, b) => a.price - b.price);
      case "Price, high to low":
        return suits.sort((a, b) => b.price - a.price);
      case "Alphabetically, A-Z":
        return suits.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
      case "Alphabetically, Z-A":
        return suits.sort((a, b) => (b.name || "").localeCompare(a.name || ""));
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
  }, [state.filteredSuit, state.sortType]);

  const value = {
    activeTab: state.activeTab,
    user: state.user,
    setUser: setUserFn,
    allSuit: state.allSuit,
    filteredSuit: sortedSuits,
    setFilteredSuit: setFilteredSuitFn,
    setSortType: setSortTypeFn,
    setActiveTab: setActiveTabFn,
    filterSuitsByCategory: filterSuitsByCategoryFn,
    filterSuitsByPrice: filterSuitsByPriceFn,
    loading: state.loading,
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};
