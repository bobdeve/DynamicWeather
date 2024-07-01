import { useEffect, useState } from "react";
import axios from "axios";
import { Roller } from "react-awesome-spinners";
import "./App.css";
import { CityWeather } from "./CityWeather";

function App() {
  const [error, setError] = useState(null);
  const [city, setCity] = useState("Addis Ababa");
  const [loading, setLoading] = useState(true);
  const [latLong, setLatLong] = useState({ latitude: "", longitude: "" });
  const [weather, setWeather] = useState(null);

  const API_KEY = "32bf7a4c08453d3c1027b4b1c8656552";
  const DEFAULT_CITY = "Addis Ababa"; // Default city name to use if geolocation is denied

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setLatLong({ latitude, longitude });
        },
        function (error) {
          console.error("Error getting geolocation: ", error);
          alert("Geolocation error: " + error.message);
          // If geolocation fails, set default city
          setCity(DEFAULT_CITY);
          getWeather(DEFAULT_CITY);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      alert("Geolocation is not supported in this browser");
      // If geolocation is not supported, set default city
      setCity(DEFAULT_CITY);
      getWeather('Addis Ababa');
    }
  }, []);

  useEffect(() => {
    if (latLong.latitude !== "" && latLong.longitude !== "") {
      getWeather("current");
    }
    else {
      getWeather('Addis Ababa')
    }
  }, [latLong]);

  const getWeather = async (values) => {
    try {
      setError(null);
      let url = "";
      if (values === "current") {
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${latLong.latitude}&lon=${latLong.longitude}&appid=${API_KEY}&units=metric`;
      } else {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
      }
      const response = await axios.get(url);
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching weather data: ", error);
      setError("Error fetching weather data");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleWeather = (e) => {
    e.preventDefault();
    if (city.trim() !== "") {
      setLoading(true);
      getWeather("");
      setCity("");
    }
  };

  const handleError = () => {
    if (loading) {
      return (
        <div className="spinner-overlay">
          <Roller size="180px" color="#3B5998" />
        </div>
      );
    } else {
      return <h1>No data, check your spelling or your Internet connection</h1>;
    }
  };

  const hadWeatherData = weather !== null;

  let mainClassName = "main-container";
  if (weather && weather.weather[0].main === "Rain") {
    mainClassName += " sunny";
  } else if (weather && weather.weather[0].main === "Clouds") {
    mainClassName += " clouds";
  } else if (weather && weather.weather[0].main === "Clear") {
    mainClassName += " clear";
  }

  return (
    <div className={mainClassName}>
      <form onSubmit={handleWeather}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          Get Weather Data
        </button>
      </form>

      {hadWeatherData ? <CityWeather weather={weather} /> : handleError()}
    </div>
  );
}

export default App;
