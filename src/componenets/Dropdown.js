import React from "react";
import { useWeather } from "../context/WeatherContext";
import { cityList } from "../myCity";

function Dropdown() {

  const { permission, setCity,geoLocation,icon,setIcon,setLoading } = useWeather();
  
  //Burası Location iznine göre selectBox return ediyor.   
  const createSelect = (permission) => {
    if (permission) {
      return (
        <select id="citySelect"
        onChange={onChangeSelect}
        className="
        px-4
        py-2.5
        text-weather-black
        font-medium
        text-x
        leading-tight
        uppercase
        rounded
        shadow-md
        transition
        duration-150
        ease-in-out
        flex
        items-center
        whitespace-nowrap
        cursor-pointer
        "
        >
          <option
            key={"userLocation"}
            value={JSON.stringify(geoLocation)}
          >{`${geoLocation.name} lat:${geoLocation.lat.toFixed(2)} lon:${geoLocation.lon.toFixed(2)}`}</option>
          {cityList.map((item) => (
            <option
              key={item.id}
              value={JSON.stringify({
                name: item.name,
                lat: item.coord.lat,
                lon: item.coord.lon,
              })}
            >
              {item.name}
            </option>
          ))}
        </select>
      );
    } else {
      return (
        <select id="citySelect"
        onChange={onChangeSelect}
        className="
        px-4
        py-2.5
        text-weather-black
        font-medium
        text-x
        leading-tight
        uppercase
        rounded
        shadow-md
        transition
        duration-150
        ease-in-out
        flex
        items-center
        whitespace-nowrap
        cursor-pointer
        "
        >
          {cityList.map((item) => (
            <option
              key={item.id}
              value={JSON.stringify({
                name: item.name,
                lat: item.coord.lat,
                lon: item.coord.lon,
              })}
            >
              {item.name}
            </option>
          ))}
        </select>
      );
    }
  };

  //select change eventi
  const onChangeSelect = (e) => {
    setLoading(true);
    if(JSON.parse(e.target.value).name === 'Your Location'){
        setIcon(true);
    }else{
        setIcon(false);
    }
    setCity(JSON.parse(e.target.value))
  }

  return <div className="bg-weather-blue py-8 pl-3 flex items-center space-x-2">
    {createSelect(permission)}
    {icon ? (<i className="fa-solid fa-location-dot fa-xl"></i>) : null}
    </div>;
}

export default Dropdown;
