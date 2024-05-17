import React from "react";
import "./forecast.css";
import { RiDeleteBin2Line } from "react-icons/ri";
const Forecast = ({ city, handleOpenForecast }) => {
    console.log(city);
  const forecastData = city.forecastDetails.daily;
  const forecastDataUnits = city.forecastDetails.daily_units;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit'
    });
  };

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };
  const handleDelete = () => {
    handleOpenForecast()
  }
  return (
    <div className="forecast">
      <div className="forecast-row">
        <div className="forecast-date">Forecast/Date</div>
        <div>Sun Rise</div>
        <div>Sun Set</div>
        <div>Max Temp</div>
        <div>Min Temp</div>
        <div>Rain</div>
      </div>
      {forecastData.time.map((date, index) => (
        <div key={index} className="forecast-row">
          <div className="forecast-date">{formatDate(date)}</div>
          <div className="forecast-cell">{formatTime(forecastData.sunrise[index])}</div>
          <div className="forecast-cell">{formatTime(forecastData.sunset[index])}</div>
          <div className="forecast-cell">
            {forecastData.temperature_2m_max[index]} {forecastDataUnits.temperature_2m_max}
          </div>
          <div className="forecast-cell">
            {forecastData.temperature_2m_min[index]} {forecastDataUnits.temperature_2m_min}
          </div>
          <div className="forecast-cell">
            {forecastData.rain_sum[index]} {forecastDataUnits.rain_sum}
          </div>
        </div>
      ))}
      <RiDeleteBin2Line className="delete-btn" onClick={handleDelete}/>
    </div>
  );
};

export default Forecast;
