import React, { createContext, use, useMemo, useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export const UserDataContext = createContext();

const UsersContext = ({ children }) => {
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = React.useState(null);
  const [allSuit, setAllSuit] = React.useState([]);
  const [filteredSuit, setFilteredSuit] = useState([]); // suits after category filter
  const [sortType, setSortType] = useState("");

  const [user, setUser] = React.useState({
    email: "",
    fullName: {
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      phone: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1️⃣ Always fetch suits
        const suitRes = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/suit/all`,
        );
        if (suitRes.status === 200) {
          setAllSuit(suitRes.data.allSuit);
          setFilteredSuit(suitRes.data.allSuit); // initialize filtered list
        }

        // 2️⃣ Fetch user ONLY if token exists
        if (token) {
          const userRes = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/users/profile`,
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );

          if (userRes.status === 200) {
            setUser(userRes.data.user);
          }
        } else {
          setUser(null); // logged out user
        }
      } catch (err) {
        console.log(err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  // Filter suits by category (frontend only)
  const filterSuitsByCategory = (category) => {
    if (category === "All" || !category) {
      setFilteredSuit(allSuit);
    } else {
      const filtered = allSuit.filter((suit) => suit.category === category);
      setFilteredSuit(filtered);
    }
  };

  // Filter suits by price range
  const filterSuitsByPrice = (min, max) => {
    const filtered = allSuit.filter((suit) => {
      if (max) {
        return suit.price >= min && suit.price <= max;
      }
      return suit.price >= min;
    });

    setFilteredSuit(filtered);
  };

  const sortedSuits = useMemo(() => {
    const suits = [...filteredSuit];

    switch (sortType) {
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
  }, [activeTab, user, allSuit, filteredSuit, sortType]);

  const value = {
    activeTab,
    setActiveTab,
    user,
    setUser,
    allSuit,
    setAllSuit,
    filteredSuit,
    filterSuitsByCategory,
    setFilteredSuit,
    sortType,
    setSortType,
    sortedSuits,
    filterSuitsByPrice,
  };

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UsersContext;
