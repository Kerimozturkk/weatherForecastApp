import React from "react";
import Dropdown from "./Dropdown";
import Card from "./Card";
import { useWeather } from "../context/WeatherContext";
import Loading from "./Loading";

function Container() {
  const { weekForecast,loading } = useWeather();
  return (
    <div>
      <h1 className="text-3xl font-bold font-mulish m-2">
        Weekly Weather Forecast
      </h1>
      <Dropdown />
      
      <div className={loading ? `mt-10 flex items-center justify-center` :`grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 py-1`}>
        {
            loading 
            ? 
            <Loading/> 
            :
            weekForecast.map((item,i) => (
              <Card key={i} day={item} index={i}/>
            ))
        }
        {
           

        }
      </div>
    </div>
  );
}

export default Container;
