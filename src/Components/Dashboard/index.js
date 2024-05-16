import React, { useContext } from "react";
import "./dashboard.css";
import DataContext from "../DataContext";
import WeatherCard from "../WeatherCard";
const Dashboard = () => {
    const {selectedCity, cities} = useContext(DataContext);
    console.log(selectedCity);
    return(
        <div className="dashboard">
            {cities.length !== 0 && <WeatherCard city={selectedCity}/>}
        </div>
    )
}
export default Dashboard;