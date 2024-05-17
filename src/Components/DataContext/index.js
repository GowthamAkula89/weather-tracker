import React, { createContext, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [selectedCity, setSelectedCity] = useState({
    cityDetails:[],
    weatherDetails:[],
    forecastDetails:[]
  });
  const [cities, setCities] = useState([]);
  const [temp, setTemp] = useState("Celsius");
  const [speed, setSpeed] = useState("kph");
  return (
    <DataContext.Provider
      value={{
        selectedCity, 
        setSelectedCity,
        cities, 
        setCities,
        temp, 
        setTemp,
        speed, 
        setSpeed
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
