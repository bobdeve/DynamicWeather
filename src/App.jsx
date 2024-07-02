
import axios from "axios";
import React, { useEffect, useState } from "react";


import {
  Ring,
  Roller,
  DualRing,
  Circle,
  Heart,
  Ripple,
  Default,
} from "react-awesome-spinners";

import "./App.css";
import { CityWeather } from "./CityWeather";

import { ForcastDisplay } from "./ForcastDisplay";
import LineChartComponent from "./LineChartComponent";

function App() {

  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(null);

  const [latLong, setLatLong] = useState({
    latitude: "",
    longitude: "",
  });

  const [location, setLocation] = useState(null);
  const [errorlocation, setErrorLocation] = useState(null);

  const [weather, setWeather] = useState("");
  const [error, setError] = useState(null);


  const API_KEY2 = "4AMBKRR7CLG37JRVP5YS578E7";
 
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          setErrorLocation('Error getting location: ' + error.message);
          console.error('Error getting location:', error);
        }
      );
    } else {
      setErrorLocation('Geolocation is not supported by your browser.');
      console.error('Geolocation is not supported.');
    }
  }, []);



  const getWeather = async (values) => {
    console.log("getWeather" + values)
    try {
      setError("");
      let url = "";
     
      if (values === "current" && city ==="" && location !== null ) {
        console.log("using lat and long" )
        url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location.lat},${location.lng}?unitGroup=us&key=${API_KEY2}`;
            
         console.log(url)
         
  
      } else  {
        console.log("using user city name")
        url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${API_KEY2}`;
        setLatLong({})
       
      }
      
      const response = await axios.get(url);
      setWeather(response);
    } catch (error) {
      setError("Error fetching the weather data");
      setWeather(null);
    }
    setCurrentIndex(prvValue => 0)
  };
  const handleWeather = (e) => {
    e.preventDefault();
    getWeather();
    setCity("");
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };
  const handleError = () => {
    if (loading) {
      return (
        <div className="spinner-overlay">
          <Roller size="180px" color="#3B5998" />
          
        </div>
      );
    } else {
      return <h1>No data, check your spelling or you Internet connection</h1>;
    }
  };
  useEffect(() => {
    console.log("use effect triggered ")
    if (location !== null){
     
        getWeather("current");
       console.log("use effect inside triggered")

    }
   
  }, [location]);
   

  let hadWeatherData = weather !== null && weather !== "";

  // console.log(weather?.data?.days[0]?.icon);
  console.log(weather?.data?.days[0]?.icon);
  console.log(location);
  // console.log(city);
  // console.log(error);
 
  let mainid = "main-container";
  if (weather && weather?.data?.days[0]?.conditions === "Clear") {
  
    mainid += " clear";
  }
  if (weather && weather?.data?.days[0]?.conditions === "Rain, Overcast"  || weather?.data?.days[0]?.conditions === "Rain, Partially cloudy" ) {
    mainid += " rain";
    
  }
  if (weather && weather?.data?.days[0]?.conditions === "Overcast"  || weather?.data?.days[0]?.conditions === "Partially cloudy" ) {
    mainid += " clouds";
   
  }
 

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    const options = {  month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  const datas = [
    { name: formatDate (weather?.data?.days[0]?.datetime), uv: weather?.data?.days[0]?.uvindex, tempmax: weather?.data?.days[0]?.tempmax, hum: weather?.data?.days[0]?.humidity },
    { name: formatDate (weather?.data?.days[1]?.datetime), uv: weather?.data?.days[1]?.uvindex, tempmax: weather?.data?.days[1]?.tempmax, hum: weather?.data?.days[1]?.humidity },
    { name: formatDate (weather?.data?.days[2]?.datetime), uv: weather?.data?.days[2]?.uvindex, tempmax: weather?.data?.days[2]?.tempmax, hum: weather?.data?.days[2]?.humidity },
    { name: formatDate (weather?.data?.days[3]?.datetime), uv: weather?.data?.days[3]?.uvindex, tempmax: weather?.data?.days[3]?.tempmax, hum: weather?.data?.days[3]?.humidity },
    { name: formatDate (weather?.data?.days[4]?.datetime), uv: weather?.data?.days[4]?.uvindex, tempmax: weather?.data?.days[4]?.tempmax, hum: weather?.data?.days[4]?.humidity },
    { name: formatDate (weather?.data?.days[5]?.datetime), uv: weather?.data?.days[5]?.uvindex, tempmax: weather?.data?.days[5]?.tempmax, hum: weather?.data?.days[5]?.humidity },
    { name: formatDate (weather?.data?.days[6]?.datetime), uv: weather?.data?.days[6]?.uvindex, tempmax: weather?.data?.days[6]?.tempmax, hum: weather?.data?.days[6]?.humidity },
  ];

 const handleCurrentIndex =(index)=>{
  setCurrentIndex(prvValue => index)
 }
 

  return ( <>
    <div className={mainid}>
      <form action="">
        <input
      placeholder="Enter city name"
           type="text"
           value={city}
           onChange={(e) => setCity(e.target.value)}
        />
        <button  disabled={city ===""} onClick={(e) => handleWeather(e)}>Get Weather Data</button>
      </form>

     {hadWeatherData ? <CityWeather setIndex={handleCurrentIndex} currentIndex={currentIndex} weather={weather} /> : handleError()}

     {hadWeatherData ? <LineChartComponent datas={datas} /> : handleError()}

     
     </div> 
  </> );
}

export default App;
