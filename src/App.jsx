import { useEffect, useState } from "react";
import axios from "axios";

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


function App() {
  const [error, setError] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(true);

  const [latLong, setLatLong] = useState({
    latitude: "",
    longitude: "",
  });

  const [weather, setWeather] = useState("");

  const API_KEY = "32bf7a4c08453d3c1027b4b1c8656552";

  useEffect(() => {
    if ("geolocation" in navigator) {
      // Geolocation is available
      navigator.geolocation.getCurrentPosition(
        function (position) {
          // Success callback function
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setLatLong((prvValue) => {
            return { ...prvValue, latitude: latitude, longitude: longitude };
          });

          // You can do something with the coordinates here, e.g., display on a map
        },
        function (error) {
          // Error callback function
          console.error("Error getting geolocation: ", error);

          // Handle errors here
        },
        {
          // Optional: Options object
          enableHighAccuracy: true, // Enable high accuracy (GPS)
          timeout: 5000, // Timeout in milliseconds (5 seconds)
          maximumAge: 0, // Maximum age of cached position
        }
      );
    } else {
      // Geolocation is not available
      // Handle the case where the user's browser doesn't support Geolocation API
      alert("Geolocation is not available in this browser");
    }

    return () => {};
  }, []);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      getWeather("current");
    }, 2000);
  }, [latLong]);

  const getWeather = async (values) => {
    try {
      setError("");
      let url = "";
      if (values === undefined) {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
      } else {
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${latLong.latitude}&lon=${latLong.longitude}&appid=${API_KEY}&units=metric`;
      }

      const response = await axios.get(url);
      setWeather(response.data);
    } catch (error) {
      setError("Error fetching the weather data");
      setWeather(null);
    }
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

  let hadWeatherData = weather !== null && weather !== "";

  console.log(weather);
  console.log(city);
  console.log(error);

  let mainid = "main-container";
  if (weather && weather?.weather[0].main === "Rain") {
    mainid += " sunny";
  }
  if (weather && weather?.weather[0].main === "Clouds") {
    mainid += " clouds";
  }
  if (weather && weather?.weather[0].main === "Clear") {
    mainid += " clear";
  }
  console.log(mainid);
  return (
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

      {hadWeatherData ? <CityWeather weather={weather} /> : handleError()}
    </div>
  );
}

export default App;
