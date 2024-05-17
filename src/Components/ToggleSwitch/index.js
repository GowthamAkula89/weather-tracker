import React, { useContext, useState } from 'react';
import './toggleSwitch.css';
import DataContext from '../DataContext';

const ToggleSwitch = () => {
  const {temp, setTemp, speed, setSpeed} = useContext(DataContext);
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
    if(temp === "Celsius" && speed === "kph"){
      setTemp("Farenhiet");
      setSpeed("mph")
    }else{
      setTemp("Celsius");
      setSpeed("kph");
    }
  };
  
  return (
    <div className='toggle-container'>
      <div className="toggle-switch" onClick={handleToggle}>
        <div className={`toggle-knob ${isToggled ? 'active' : ''}`}>
          <span className="toggle-label">{isToggled ? '°F' : '°C'}</span>
        </div>
      </div>
    </div>
    
  );
};

export default ToggleSwitch;