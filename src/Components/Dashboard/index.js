import React, { useContext, useEffect } from "react";
import "./dashboard.css";
import DataContext from "../DataContext";
import WeatherCard from "../WeatherCard";
const Dashboard = () => {
    const {selectedCity, cities, setCities} = useContext(DataContext);
    useEffect(() => {
        try {
            const citiesWeather = JSON.parse(localStorage.getItem("cities")) || [];
            setCities(citiesWeather);
        } catch (error) {
            console.error("Error parsing cities from localStorage", error);
            setCities([]);
        }
    },[])
    console.log(selectedCity);
    return(
        <div className="dashboard">
            {cities.length !== 0 ? (
                cities.map((city, index) => 
                    <WeatherCard city={city} key={index} />
                )
            ) : (
                <div>No cities available. Add a city to view the weather.</div>
            )}
        </div>
    )
}
export default Dashboard;