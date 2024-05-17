import React, { useContext, useEffect, useState } from "react";
import "./dashboard.css";
import DataContext from "../DataContext";
import WeatherCard from "../WeatherCard";
const Dashboard = () => {
    const {selectedCity, cities, setCities} = useContext(DataContext);
    const [draggedItemIndex, setDraggedItemIndex] = useState(null);
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

    const handleDragStart = (e, index) => {
        setDraggedItemIndex(index);
    };

    const handleDrop = (e, index) => {
        e.preventDefault();
        const updatedCities = [...cities];
        const draggedItem = updatedCities[draggedItemIndex];
        updatedCities.splice(draggedItemIndex, 1);
        updatedCities.splice(index, 0, draggedItem);
        setCities(updatedCities);
        localStorage.setItem("cities", JSON.stringify(updatedCities));
        setDraggedItemIndex(null);
    };

    const handleDragOver = (e) => {
    e.preventDefault();
    };
    return(
        <div className="dashboard">
            {cities.length !== 0 ? (
                cities.map((city, index) => 
                <div
                    key={index}
                    onDrop={(e) => handleDrop(e, index)}
                    onDragOver={handleDragOver}
                >
                    <WeatherCard
                        city={city}
                        index={index}
                        onDragStart={handleDragStart}
                    />
                </div>
                )
            ) : (
                <div>No cities available. Add a city to view the weather.</div>
            )}
        </div>
    )
}
export default Dashboard;