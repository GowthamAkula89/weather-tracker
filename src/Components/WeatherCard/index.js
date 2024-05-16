import React from "react";
import "./weatherCard.css";
import { FaSun, FaCloudSun, FaCloudRain, FaSnowflake } from "react-icons/fa";
import { IoThunderstorm } from "react-icons/io5";
import { RiDeleteBin2Line } from "react-icons/ri";
const WeatherCard = ({city}) => {
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
    const cityData = city.cityDetails;
    const weatherData=city.weatherDetials;
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
                <div>Temparature: {weatherData.current_weather.temperature} °C </div>
                <div>Wind Speed:{weatherData.current_weather.windspeed} km/hr</div>
                <div>Wind Direction: {weatherData.current_weather.winddirection}  °</div>
            </div>
            <RiDeleteBin2Line className="delete-btn"/>
        </div>
    )
}
export default WeatherCard;