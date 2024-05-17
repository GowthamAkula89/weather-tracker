import React, { useContext } from "react";
import "./weatherCard.css";
import { FaSun, FaCloudSun, FaCloudRain, FaSnowflake } from "react-icons/fa";
import { IoThunderstorm } from "react-icons/io5";
import { RiDeleteBin2Line } from "react-icons/ri";
import DataContext from "../DataContext";

const WeatherCard = ({city, index}) => {
  const {cities, setCities} = useContext(DataContext);
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
  const cityData = city.cityDetails;
  const weatherData=city.weatherDetails;
  return(
      <div className="weatherCard">
          <div className="weather-subsection">
              <div className="weather-summary">
                  {getWeatherIcon(weatherData.current_weather.temperature)}
                  <div className="city-temparature">{weatherData.current_weather.temperature} °C</div>
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
                <div className="weather-value">: {weatherData.current_weather.temperature} °C</div>
            </div>
            <div className="weather-row">
                <div className="weather-label">Wind Speed</div>
                <div className="weather-value">: {weatherData.current_weather.windspeed} km/hr</div>
            </div>
            <div className="weather-row">
                <div className="weather-label">Wind Direction</div>
                <div className="weather-value">: {weatherData.current_weather.winddirection} °</div>
            </div>
        </div>

          <RiDeleteBin2Line className="delete-btn" onClick={handleDelete}/>
      </div>
  )
}
export default WeatherCard;