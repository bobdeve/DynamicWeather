import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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
import { RiTempHotFill,RiBlazeFill,RiWaterPercentFill } from '@remixicon/react'
export const ForcastDisplay = ({ weatherData }) => {
  console.log(weatherData);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  function formatDate(dateStr) {
    const date = new Date(dateStr);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }
  let days = weatherData.dateInfo;

  return (
    <Carousel className="forcast-container" responsive={responsive}>
      {days.map((day, index) => {
        let icons = faSun;
        if (weatherData?.weatherInfo[index] === "Rain, Overcast" || weatherData?.weatherInfo[index] === "Rain, Partially cloudy") {
          icons = faCloudRain;
        }
        if (weatherData?.weatherInfo[index] === "snow") {
          icons = faSnowflake;
        }
        if (weatherData?.weatherInfo[index] === "Overcast" || weatherData?.weatherInfo[index]  === "Partially cloudy"){
          icons = faCloud;
        }
        return (
          <div className="forcast-items" key={index}>
            <div className="for-dispaly">
            <FontAwesomeIcon className="display-main-icon" icon={icons} />
            <div className="display-forc-info">
            <h3>{formatDate(weatherData.dateInfo[index])}</h3>
            <h4>{weatherData.weatherInfo[index]}</h4>
            </div>
           

            </div>
            <div className="forc-disc-container">
            <div className="forc-disc"><RiBlazeFill/> <p> UV Index: {weatherData.uvIndex[index]}</p></div>
            <div className="forc-disc"> <RiWaterPercentFill/>  <p> Humidity: {weatherData.humidity[index]}</p></div>
            <div className="forc-disc"><RiTempHotFill/><p> Temp: {((weatherData.tempMax[index]-30)/2).toFixed(2)} <sup style={{ fontSize: "smaller" }}>C</sup></p></div>
            </div>
          
            
          </div>
        );
      })}
    </Carousel>
  );
};
