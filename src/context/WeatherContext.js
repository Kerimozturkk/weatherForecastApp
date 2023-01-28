import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { cityList } from "../myCity";

const WeatherContext = createContext();
const API_KEY = "d498a04f6cf75f8d3858c418b4888eb5";

export const WeatherProvider = ({ children }) => {
  const [city, setCity] = useState({});
  const [weekForecast, setWeekForecast] = useState([]);
  const [permission, setPermission] = useState(false);
  const [geoLocation,setGeoLocation] = useState({}); 
  const [icon,setIcon] = useState(false);
  const [loading,setLoading] = useState(true);


  const apiCall = (loc) => {
    // Gelen objenin boş olma durumunda apiye istek atmamalı koşulu burda koymam lazım. 404 yeriz.
    // Hooklar içinde kontrol yapamam.
    // Ilk state atamasından tetiklenen effecti boşa çıkarıyorum.
    if(!(loc.hasOwnProperty('name') && loc.hasOwnProperty('lat') && loc.hasOwnProperty('lon'))){
        return;
    }
    axios(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${loc.lat}&lon=${loc.lon}&units=metric&appid=${API_KEY}`
    )
      .then((res) => {
        setWeekForecast(res.data.daily);
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  };

  // Browser location izni verilirse ya da verilmesse ilk haftayı api'den alıp manuel initialize ediyorum
  useEffect(() => {
    initialLocation()
      .then((geo) => {
        setPermission(true);
        setGeoLocation({name: "Your Location",lat: geo.coords.latitude,lon: geo.coords.longitude})
        setCity({
          name: "Your Location",
          lat: geo.coords.latitude,
          lon: geo.coords.longitude,
        });
        setIcon(true);
      })
      .catch(() => {
        setPermission(false);
        setCity({
          name: cityList[0].name,
          lat: cityList[0].coord.lat,
          lon: cityList[0].coord.lon,
        });
      });
  }, []);

  useEffect(() => { // ile değişimde cartlıyor...
    apiCall(city);
  },[city])

  const values = { permission, city, setCity,geoLocation,icon,setIcon,weekForecast,loading,setLoading };

  return (
    <WeatherContext.Provider value={values}>{children}</WeatherContext.Provider>
  );
};

const initialLocation = () => {
  return new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition(res, rej);
  });
};

export const useWeather = () => useContext(WeatherContext);
