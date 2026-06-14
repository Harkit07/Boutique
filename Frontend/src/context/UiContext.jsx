import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";

const UiContext = createContext();

export function UiProvider({ children }) {
  const [activeTab, setActiveTab] = useState("home");

  const changeTab = useCallback((tab) => setActiveTab(tab), []);

  const value = useMemo(
    () => ({
      activeTab,
      setActiveTab: changeTab,
    }),
    [activeTab, changeTab],
  );

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
}

export const useUi = () => useContext(UiContext);
