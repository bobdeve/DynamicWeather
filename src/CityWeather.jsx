import React, { useState } from "react";
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

export const CityWeather = ({ weather }) => {
  const hasWeatherData = weather !== null;
  const visibility = (weather?.data?.days).map((day) => day.windspeed / 1000);
  const cityName = weather?.data?.resolvedAddress;

  let weatherInfo = (weather?.data?.days).map((day) => day.conditions);
  console.log(weatherInfo);
  const weatherDesc = (weather?.data?.days).map((day) => day.description);
  const windSpeed = (weather?.data?.days).map((day) => day.windspeed);
  const humidity = (weather?.data?.days).map((day) => day.humidity);
  const uvIndex = (weather?.data?.days).map((day) => day.uvindex);
  const tempMax = (weather?.data?.days).map((day) => day.tempmax);
  const dateInfo = (weather?.data?.days).map((day) => day.datetime);

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
  if (weatherInfo[0] === "Rain, Overcast" || weatherInfo[0] === "Rain, Partially cloudy") {
    icon = faCloudRain;
  }
  if (weatherInfo[0] === "snow") {
    icon = faSnowflake;
  }
  if (weatherInfo[0] === "Overcast" || weatherInfo[0] === "Partially cloudy"){
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
  };

  return (
    <>
      <CurrentDisplay
        weatherData={weatherData}
        mainClass={mainClass}
        weatherClass={weatherClass}
        icon={icon}
      />
      <ForcastDisplay weatherData={weatherData} />
    </>
  );
};
