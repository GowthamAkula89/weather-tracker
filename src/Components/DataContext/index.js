import React, { createContext, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const[selectedCity, setSelectedCity] = useState([]);
  const[cities, setCities] = useState("dataContext");

  return (
    <DataContext.Provider
      value={{
        selectedCity, 
        setSelectedCity,
        cities, 
        setCities
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
