import React from "react";
import "./header.css";
import { MdSunny } from "react-icons/md";
const Header = () => {
    return(
        <div className="header">
            <div className="headerSubsection">
                <MdSunny className="appLogo"/>
                <div className="appName">Weather Tracker</div>
            </div>
            <input className="searchCity" type="text" placeholder="Search City....."/>
            <button type="submit" className="addButton">Add</button>
        </div>
    )
}
export default Header