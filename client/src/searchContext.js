import React, { createContext, useState, useEffect } from "react";

// Create a context for search
export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState(null);

  // Load the user state from local storage
  useEffect(() => {
    const storedSearch = localStorage.getItem("search");

    if (storedSearch) {
      setSearch(JSON.parse(storedSearch));
    }
  }, []);

  //
  const loadSearch = (searchData) => {
    setSearch(searchData);

    localStorage.setItem("search", JSON.stringify(searchData));
  };

  //
  const clearSearch = () => {
    setSearch(null);
    localStorage.removeItem("search");
  };

  return (
    <UserContext.Provider value={{ search, loadSearch, clearSearch }}>
      {children}
    </UserContext.Provider>
  );
};
