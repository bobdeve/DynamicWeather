import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faCloudRain,
  faWind,
  faCloud,
  faSnowflake,
  faRuler,
  faEye
} from "@fortawesome/free-solid-svg-icons";
import { FaBeer, FaWater, } from "react-icons/fa";

export const CityWeather = ({ weather }) => {
  const hasWeatherData = weather !== null;
  const visibility = weather.visibility/1000
  const cityName = weather.name;
  const weatherInfo = weather?.weather[0].main;
  const weatherDesc = weather?.weather[0].description;
  const windSpeed = weather.wind.speed;
  const humidity = weather.main.humidity;
  const seaLevel = weather.main.sea_level;

  const sunriseDate = new Date(weather.sys.sunrise * 1000);
  const sunriseTime = sunriseDate.toLocaleTimeString();

  const sunSetDate = new Date(weather.sys.sunset * 1000);
  const sunSetTime = sunSetDate.toLocaleTimeString();

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Get today's date
  const today = new Date();

  // Get the day of the week (0-6)
  const dayOfWeek = today.getDay();

  // Get the name of the day using the dayOfWeek index
  const dayName = daysOfWeek[dayOfWeek];

  let icon = faSun;
  if (weatherInfo === "Rain") {
    icon = faCloudRain;
  }
  if (weatherInfo === "snow") {
    icon = faSnowflake;
  }
  if (weatherInfo === "Clouds") {
    icon = faCloud;
  }

  let mainClass = "main-containers";
  let weatherClass = "weather-icon";

  console.log(weather);
  console.log(sunSetTime);
  console.log(sunSetDate);
  return (
    <div className={mainClass}>
      <div className="main-container-sub">
        <FontAwesomeIcon className={weatherClass} icon={icon} />
        <div className="main-container-sub-detail">
          <h1 className="today-text">{dayName}</h1>
          <h1 className="city-text">{cityName}</h1>
          <h2 className="temp-text">
            Temperature {`${weather.main.temp_min.toFixed(2)}\u00B0`}
            <sup style={{ fontSize: "smaller" }}>C</sup>
          </h2>
          
          <h2 className="wea-text">{weatherInfo}</h2>
        </div>
      </div>
      <div>
        <div className="detail-container">
          <div className="weather-disc">
            <h3>{visibility}KM</h3>
            <FontAwesomeIcon className='small-icons' icon={faEye} />
            <h4>Visibility</h4>

          </div>
          <div className="wind-speed">
            <h1>{windSpeed}</h1>
            <FontAwesomeIcon className="small-icons" icon={faWind} />
            <h4>Wind</h4>
          </div>

          {/* <h2>{maxtemp}</h2> */}
          <div className="humidity">
            <h2>{humidity}</h2>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="small-icons"
              viewBox="0 0 30 30"
            >
              <path
                fill="currentColor"
                d="M7.56 17.19c0-.88.24-1.89.72-3.03s1.1-2.25 1.86-3.31c1.56-2.06 2.92-3.62 4.06-4.67l.75-.72c.25.26.53.5.83.72c.41.42 1.04 1.11 1.88 2.09s1.57 1.85 2.17 2.65c.71 1.01 1.32 2.1 1.81 3.25s.74 2.16.74 3.03c0 1-.19 1.95-.58 2.86c-.39.91-.91 1.7-1.57 2.36c-.66.66-1.45 1.19-2.37 1.58c-.92.39-1.89.59-2.91.59c-1 0-1.95-.19-2.86-.57c-.91-.38-1.7-.89-2.36-1.55c-.66-.65-1.19-1.44-1.58-2.35s-.59-1.89-.59-2.93m2.26-2.93c0 .83.17 1.49.52 1.99c.35.49.88.74 1.59.74c.72 0 1.25-.25 1.61-.74c.35-.49.53-1.15.54-1.99c-.01-.84-.19-1.5-.54-2c-.35-.49-.89-.74-1.61-.74c-.71 0-1.24.25-1.59.74c-.35.5-.52 1.16-.52 2m1.57 0v-.35c0-.08.01-.19.02-.33s.02-.25.05-.32s.05-.16.09-.24c.04-.08.09-.15.15-.18c.07-.04.14-.06.23-.06c.14 0 .25.04.33.12s.14.21.17.38c.03.18.05.32.06.45s.01.3.01.52c0 .23 0 .4-.01.52s-.03.27-.06.45c-.03.17-.09.3-.17.38s-.19.12-.33.12c-.09 0-.16-.02-.23-.06a.335.335 0 0 1-.15-.18c-.04-.08-.07-.17-.09-.24c-.02-.08-.04-.19-.05-.32c-.01-.14-.02-.25-.02-.32zm.59 7.75h1.32l4.99-10.74h-1.35zm4.3-2.99c.01.84.2 1.5.55 2c.35.49.89.74 1.6.74c.72 0 1.25-.25 1.6-.74c.35-.49.52-1.16.53-2c-.01-.84-.18-1.5-.53-1.99c-.35-.49-.88-.74-1.6-.74c-.71 0-1.25.25-1.6.74c-.36.49-.54 1.15-.55 1.99m1.57 0c0-.23 0-.4.01-.52s.03-.27.06-.45s.09-.3.17-.38s.19-.12.33-.12c.09 0 .17.02.24.06c.07.04.12.1.16.19c.04.09.07.17.1.24s.04.18.05.32l.01.32v.69l-.01.32l-.05.32l-.1.24l-.16.19l-.24.06c-.14 0-.25-.04-.33-.12s-.14-.21-.17-.38c-.03-.18-.05-.33-.06-.45s-.01-.3-.01-.53"
              />
          
            </svg>
            <h4>Humidity</h4>
          </div>
          <div className="sea-level">
              <h2>{seaLevel??`No Data found`}</h2>
              <FontAwesomeIcon className='small-icons' icon={faRuler} />
              <h4>Sea Level</h4>
          </div>
        </div>
      </div>
    </div>
  );
};
