import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(!!localStorage.getItem("token"));

  const setToken = useCallback((newToken) => {
    setTokenState(newToken);
    if (newToken) localStorage.setItem("token", newToken);
    else localStorage.removeItem("token");
  }, []);

  useEffect(() => {
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/me`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        if (res.status === 200) setUser(res.data.user);
      } catch (err) {
        if (err.response?.status === 401) {
          setToken(null);
          setUser(null);
        }
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token, setToken]);

  const value = useMemo(
    () => ({
      token,
      setToken,
      user,
      setUser,
      loading,
    }),
    [token, user, loading, setToken],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
