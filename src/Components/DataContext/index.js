import React, { createContext, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const[selectedCity, setSelectedCity] = useState({
    cityDetails:[],
    weatherDetials:[],
    forecastDetails:[]
  });
  const[cities, setCities] = useState([]);

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
