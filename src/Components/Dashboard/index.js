import React, { useContext } from "react";
import "./dashboard.css";
import DataContext from "../DataContext";
const Dashboard = () => {
    const {selectedCity} = useContext(DataContext);
    console.log(selectedCity);
    return(
        <div>Hi</div>
    )
}
export default Dashboard;