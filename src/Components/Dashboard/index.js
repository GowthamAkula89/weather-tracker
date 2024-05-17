import React, { useContext, useEffect, useState } from "react";
import "./dashboard.css";
import DataContext from "../DataContext";
import WeatherCard from "../WeatherCard";
import Forecast from "../Forecast";

const Dashboard = () => {
    const { cities, setCities} = useContext(DataContext);
    const [openForecast, setOpenForecast] = useState(false);
    const [cityIndex, setCityIndex] = useState(-1);
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
    const handleOnClick = (idx) => {
        setCityIndex(idx);
        setOpenForecast(true);
    }
    const handleOpenForecast = () => {
        setOpenForecast(false)
    }
    return(
        <div className="dashboard">
            {cities.length !== 0 ? (
                cities.map((city, index) => (
                <div key={index}>
                    <div
                        onDrop={(e) => handleDrop(e, index)}
                        onDragOver={handleDragOver}
                    >
                    <WeatherCard
                        city={city}
                        index={index}
                        onDragStart={handleDragStart}
                        onClick={() => handleOnClick(index)}
                        
                    />
                    </div>
                    {openForecast && cityIndex === index && <Forecast city={cities[cityIndex]} handleOpenForecast={handleOpenForecast}/>}
                </div>
                ))
            ) : (
                <div>No cities available. Add a city to view the weather.</div>
            )}
        </div>
    )
}
export default Dashboard;