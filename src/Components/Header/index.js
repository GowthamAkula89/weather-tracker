import React, {useContext, useEffect, useState} from "react";
import "./header.css";
import { MdSunny } from "react-icons/md";
import Menu from "../Menu";
import DataContext from "../DataContext";

const Header = () => {
  const { cities, setCities} = useContext(DataContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [filteredCities,setFilteredCities]=useState([]);
  const [debounceTimer,setDebounceTimer]=useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [searchCity, setSearchCity] = useState([]);
  const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
  };

  const performSearch = async (text) => {
      if (text.trim() === "") {
          setFilteredCities([]);
          return;
        }
        try {
          const response = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${text}&count=10&language=en&format=json`
          );
          const data = await response.json();
          console.log(data.results)
          setFilteredCities(data.results)
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
  };

  useEffect(() =>{
    //applying debouncing for searching efficiency
    if (searchValue.trim() === "") {
      setFilteredCities([]);
      return;
    }
    if(debounceTimer){
      clearTimeout(debounceTimer);
    }
    const timer=setTimeout(()=>{
      performSearch(searchValue.trim());
    },500)
    setDebounceTimer(timer);
    return () => {
      clearTimeout(timer);
    };
  },[searchValue])

  const handleSearchCity = (city) => {
    const searchText = `${city.name}, ${city.admin1}, ${city.country_code}`;
    setSearchValue(searchText)
    setSearchCity(city);
    setIsMenuOpen(false);
  }

  const fetchData = async(city,needData) => {
    const latitude = city.latitude;
    const longitude = city.longitude;
    try {
      let response;
      if(needData === "weather"){
        response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        );
      }else if(needData ==="forecast"){
        response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_min,temperature_2m_max,sunrise,sunset,rain_sum`
        );
      }
      const data = await response.json();
      console.log(data.data);
      return data;
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  }

  const handleAdd = async() => {
    if (!searchCity) return;

    const weatherData = await fetchData(searchCity, "weather");
    const forecastData = await fetchData(searchCity, "forecast");

    const newCityData = {
      cityDetails: searchCity,
      weatherDetails: weatherData,
      forecastDetails: forecastData,
    };

    const updatedCities = [...cities, newCityData];
    setCities(updatedCities);
    localStorage.setItem("cities", JSON.stringify(updatedCities));
    setSearchCity([]);
    setSearchValue("");
  }

  console.log(searchValue)
  return(
      <div className="header">
          <div className="headerSubsection">
              <MdSunny className="appLogo"/>
              <div className="appName">Weather Tracker</div>
          </div>
          <div className="searchBox">
              <input 
                  className="searchCity" 
                  value={searchValue}
                  type="text" 
                  placeholder="Search City....."
                  onFocus={toggleMenu}
                  //onBlur={toggleMenu}
                  onChange={(e)=>setSearchValue(e.target.value)}
              />
              <button type="submit" className="addButton" onClick={handleAdd}>Add</button>
              {isMenuOpen && 
                <Menu 
                  filteredCities={filteredCities}
                  handleSearchCity={handleSearchCity}
                />
              }
          </div>
      </div>
  )
}
export default Header;