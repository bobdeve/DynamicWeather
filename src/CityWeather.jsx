import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faCloudRain,
  faWind,
  faCloud,
  faSnowflake,
  faRuler,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { RiHeartFill } from "@remixicon/react";
import { FaBeer, FaWater } from "react-icons/fa";
import { CurrentDisplay } from "./CurrentDisplay";
import { ForcastDisplay } from "./ForcastDisplay";
import MyWeatherContext, {
  MyContextProvider,
} from "./assets/context/MyContext";

export const CityWeather = () => {
  const { handleCurrentIndex, currentIndex, weather } =useContext(MyWeatherContext);
  console.log(weather);
  const hasWeatherData = weather !== null;
  const visibility = (weather?.days).map((day) => day.windspeed / 1000);
  const cityName = weather?.resolvedAddress;

  let weatherInfo = (weather?.days).map((day) => day.conditions);

  const weatherDesc = (weather?.days).map((day) => day.description);
  const windSpeed = (weather?.days).map((day) => day.windspeed);
  const humidity = (weather?.days).map((day) => day.humidity);
  const uvIndex = (weather?.days).map((day) => day.uvindex);
  const tempMax = (weather?.days).map((day) => day.tempmax);
  const dateInfo = (weather?.days).map((day) => day.datetime);
  const pressure = (weather?.days).map((day) => day.pressure);
  const snow = (weather?.days).map((day) => day.snow);
  const cloudcover = (weather?.days).map((day) => day.cloudcover);
  const solarradiation = (weather?.days).map((day) => day.solarradiation);
  const tempmin = (weather?.days).map((day) => day.tempmin);
  const dew = (weather?.days).map((day) => day.dew);
  const solarenergy = (weather?.days).map((day) => day.solarenergy);
  const moonphase = (weather?.days).map((day) => day.moonphase);

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const today = new Date().getDay();
  const currentDayName = daysOfWeek[today];

  let icon = faSun;
  if (
    weatherInfo[0] === "Rain, Overcast" ||
    weatherInfo[0] === "Rain, Partially cloudy"
  ) {
    icon = faCloudRain;
  }
  if (weatherInfo[0] === "snow") {
    icon = faSnowflake;
  }
  if (weatherInfo[0] === "Overcast" || weatherInfo[0] === "Partially cloudy") {
    icon = faCloud;
  }

  let mainClass = "main-containers";
  let weatherClass = "weather-icon";
  function formatDate(dateStr) {
    const date = new Date(dateStr);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  const weatherData = {
    currentDayName,
    hasWeatherData,
    visibility,
    cityName,
    weatherInfo,
    weatherDesc,
    windSpeed,
    humidity,
    uvIndex,
    tempMax,
    dateInfo,
    pressure,
    snow,
    cloudcover,
    solarradiation,
    tempmin,
    dew,
    solarenergy,
    moonphase,
  };

  return (
    <>
      <CurrentDisplay
        weatherData={weatherData}
        mainClass={mainClass}
        weatherClass={weatherClass}
        icon={icon}
        currentIndex={currentIndex}
      />
      <ForcastDisplay
        currentIndex={currentIndex}
        setIndex={handleCurrentIndex}
        weatherData={weatherData}
      />
    </>
  );
};
