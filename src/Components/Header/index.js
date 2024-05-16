import React, {useEffect, useState} from "react";
import "./header.css";
import { MdSunny } from "react-icons/md";
import Menu from "../Menu";
const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [filteredCities,setFilteredCities]=useState([]);
    const [debounceTimer,setDebounceTimer]=useState(null);
    const [searchValue, setSearchValue] = useState("");
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

    // const debounceSearch = (event, debounceTimeout) => {
    //   const searchText = event.target.value;
    //   setSearchValue(searchText)
    //     if(debounceTimeout){
    //       clearTimeout(debounceTimer);
    //     }
    //     const timer=setTimeout(()=>{
    //       performSearch(searchText)
    //     },500)
    //     setDebounceTimer(timer);
    // };

    const handleSearchCity = (city) => {
      const searchText = `${city.name}, ${city.admin1}, ${city.country_code}`
      console.log("searchText")
      setSearchValue(searchText)
      setIsMenuOpen(false);
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
                <button type="submit" className="addButton">Add</button>
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