import { createContext, useContext, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const SuitsContext = createContext();

export function SuitsProvider({ children }) {
  const { data, isLoading } = useQuery({
    queryKey: ["suits"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/suits`);
      return res.data.allSuit;
    },
    staleTime: 1000 * 60 * 5,
    retry: 2,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const allSuit = useMemo(() => (Array.isArray(data) ? data : []), [data]);

  const value = useMemo(
    () => ({
      allSuit,
      loading: isLoading,
    }),
    [allSuit, isLoading],
  );

  return (
    <SuitsContext.Provider value={value}>{children}</SuitsContext.Provider>
  );
}

export const useSuits = () => useContext(SuitsContext);
