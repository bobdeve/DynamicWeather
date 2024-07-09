import React, { useContext } from 'react';
import MyWeatherContext, { MyContextProvider } from './assets/context/MyContext';
import { Roller } from 'react-awesome-spinners';
import './App.css';
import {CityWeather} from './CityWeather';
import LineChartComponent from './LineChartComponent';

function App() {
  const {
    mainid,
    city,
    setCity,
    handleWeather,
    handleCurrentIndex,
    currentIndex,
    weather,
    handleError,
    datas,
    hadWeatherData,
    loading
  } = useContext(MyWeatherContext);

  console.log(mainid )

  return (
    <div className={mainid}>
      <form action="">
        <input
          placeholder="Enter city name"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button disabled={city === ''} onClick={(e) => handleWeather(e)}>
          Get Weather Data
        </button>
      </form>

      {!loading && weather ? (
        <>
          <CityWeather  />
          <LineChartComponent datas={datas} />
        </>
      ) : (
        handleError()
      )}
    </div>
  );
}

function AppWrapper() {
  return (
    <MyContextProvider>
      <App />
    </MyContextProvider>
  );
}

export default AppWrapper;
