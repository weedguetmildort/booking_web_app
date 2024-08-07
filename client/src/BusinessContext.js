import React, { createContext, useState, useEffect } from "react";

// Create a context for search
export const BusinessContext = createContext();

export const BusinessProvider = ({ children }) => {
  const [business, setBusiness] = useState(null);

  // Load the user state from local storage
  useEffect(() => {
    const storedBusiness = localStorage.getItem("business");

    if (storedBusiness) {
      setBusiness(JSON.parse(storedBusiness));
    }
  }, []);

  //
  const loadBusiness = (businessData) => {
    setBusiness(businessData);

    localStorage.setItem("business", JSON.stringify(businessData));
  };

  //
  const clearBusiness = () => {
    setBusiness(null);
    localStorage.removeItem("business");
  };

  return (
    <BusinessContext.Provider value={{ business, loadBusiness, clearBusiness }}>
      {children}
    </BusinessContext.Provider>
  );
};
