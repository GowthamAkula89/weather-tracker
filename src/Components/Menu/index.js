import React from "react";
import "./menu.css";

function MenuItem ({ city,  onClick }){
    return (
        <div className="menuItem" onClick={onClick}>
            <div className="cityName">{city.name}</div>
            <div className="locationDetails">
                <div>{city.admin1}, {city.country}</div>
                <div>{city.timezone}</div>
            </div>
        </div>
    );
};


const Menu = ({filteredCities,handleSearchCity}) => {
    return(
        <div className="menuBar">
            {filteredCities &&
                <>
                    {filteredCities.map((city)=> 
                    <div key={city.id} >
                        <MenuItem 
                            city={city}
                            onClick={() => handleSearchCity(city)}
                        />
                    </div>)}
                </>
            }
        </div>
    )
}
export default Menu;