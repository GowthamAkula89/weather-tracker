import React, { useContext } from "react";
import "./weatherCard.css";
import { FaSun, FaCloudSun, FaCloudRain, FaSnowflake } from "react-icons/fa";
import { IoThunderstorm } from "react-icons/io5";
import { RiDeleteBin2Line } from "react-icons/ri";
import DataContext from "../DataContext";

const WeatherCard = ({city, index, onDragStart, onClick}) => {
  const {cities, setCities, temp, speed} = useContext(DataContext);
  const getWeatherIcon = (temperature) => {
      if (temperature >= 35) {
        return <FaSun className="weather-icon" />;
      } else if (temperature >= 21) {
        return <FaCloudSun className="weather-icon" />;
      } else if (temperature >= 16) {
        return <FaCloudRain className="weather-icon" />;
      } else if (temperature >= 5) {
        return <IoThunderstorm className="weather-icon" />;
      } else {
        return <FaSnowflake className="weather-icon" />;
      }
  };

  const handleDelete =() => {
    const updatedCities = cities.filter((city, cityIndex) => cityIndex !== index);
    setCities(updatedCities);
    localStorage.setItem("cities", JSON.stringify(updatedCities));
  }

  const convertTemperature = (temperature, type) => {
    if (type === "Farenhiet") {
      return (temperature * 9/5) + 32;
    }
    return temperature;
  };
  
  const convertWindSpeed = (speed, type) => {
    if (type === "mph") {
      return speed * 0.621371;
    }
    return speed;
  };
  const cityData = city.cityDetails;
  const weatherData=city.weatherDetails;
  
  return(
      <div className="weatherCard" draggable="true" onDragStart={(e) => onDragStart(e, index)} onClick={onClick}>
          <div className="weather-subsection">
              <div className="weather-summary">
                  {getWeatherIcon(weatherData.current_weather.temperature)}
                  <div className="city-temparature">
                  {convertTemperature(weatherData.current_weather.temperature, temp).toFixed(2)} °{temp === "Celsius" ? "C" : "F"}
                  </div>
              </div>
              <div className="location-details">
                  <div className="location-place">{cityData.name}</div>
                  <div className="location">{cityData.admin2}, {cityData.admin1}, {cityData.country_code}</div>
                  <div className="location">{cityData.timezone}</div>
              </div>
          </div>
          <div className="weather-details">
            <div className="weather-row">
                <div className="weather-label">Temperature</div>
                <div className="weather-value">: {convertTemperature(weatherData.current_weather.temperature, temp).toFixed(0)} °{temp === "Celsius" ? "C" : "F"}</div>
            </div>
            <div className="weather-row">
                <div className="weather-label">Wind Speed</div>
                <div className="weather-value">: {convertWindSpeed(weatherData.current_weather.windspeed,speed).toFixed(0)} {speed==="kph" ? "km/h":"Miles/h"} </div>
            </div>
            <div className="weather-row">
                <div className="weather-label">Wind Direction</div>
                <div className="weather-value">
                  : {weatherData.current_weather.winddirection} °</div>
            </div>
        </div>

          <RiDeleteBin2Line className="delete-btn" onClick={handleDelete}/>
      </div>
  )
}
export default WeatherCard;