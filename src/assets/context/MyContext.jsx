import React, { useState, createContext, useEffect } from 'react';
import axios from 'axios';
import { Roller } from 'react-awesome-spinners';

const MyWeatherContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [latLong, setLatLong] = useState({
    latitude: '',
    longitude: '',
  });
  const [location, setLocation] = useState(null);
  const [errorLocation, setErrorLocation] = useState(null);
  const [weather, setWeather] = useState(null); // Initialize with null or {}

  const API_KEY2 = '4AMBKRR7CLG37JRVP5YS578E7';

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
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
    try {
      setLoading(true);
      let url = '';

      if (values === 'current' && city === '' && location !== null) {
        url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location.lat},${location.lng}?unitGroup=us&key=${API_KEY2}`;
      } else {
        url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${API_KEY2}`;
        setLatLong({});
      }

      const response = await axios.get(url);
      setWeather(response.data); // Assuming your response data is stored in response.data
      setCurrentIndex(0);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleWeather = (e) => {
    e.preventDefault();
    getWeather();
    setCity('');
  };

  const handleError = () => {
    if (loading) {
      return (
        <div className="spinner-overlay">
          <Roller size="180px" color="#3B5998" />
        </div>
      );
    } else {
      return <h1>No data available. Please check your spelling or internet connection.</h1>;
    }
  };

  useEffect(() => {
    if (location !== null) {
      getWeather('current');
    }
  }, [location]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const options = { month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const datas = weather
    ? [
        { name: formatDate(weather?.days[0]?.datetime), uv: weather?.days[0]?.uvindex, tempmax: weather?.days[0]?.tempmax, hum: weather?.days[0]?.humidity },
        { name: formatDate(weather?.days[1]?.datetime), uv: weather?.days[1]?.uvindex, tempmax: weather?.days[1]?.tempmax, hum: weather?.days[1]?.humidity },
        { name: formatDate(weather?.days[2]?.datetime), uv: weather?.days[2]?.uvindex, tempmax: weather?.days[2]?.tempmax, hum: weather?.days[2]?.humidity },
        { name: formatDate(weather?.days[3]?.datetime), uv: weather?.days[3]?.uvindex, tempmax: weather?.days[3]?.tempmax, hum: weather?.days[3]?.humidity },
        { name: formatDate(weather?.days[4]?.datetime), uv: weather?.days[4]?.uvindex, tempmax: weather?.days[4]?.tempmax, hum: weather?.days[4]?.humidity },
        { name: formatDate(weather?.days[5]?.datetime), uv: weather?.days[5]?.uvindex, tempmax: weather?.days[5]?.tempmax, hum: weather?.days[5]?.humidity },
        { name: formatDate(weather?.days[6]?.datetime), uv: weather?.days[6]?.uvindex, tempmax: weather?.days[6]?.tempmax, hum: weather?.days[6]?.humidity },
      ]
    : [];

  let mainid = 'main-container';
  if (weather && weather?.days[0]?.conditions === 'Clear') {
    mainid += ' clear';
  }
  if (weather && (weather?.days[0]?.conditions === 'Rain, Overcast' || weather?.days[0]?.conditions === 'Rain, Partially cloudy')) {
    mainid += ' rain';
  }
  if (weather && (weather?.days[0]?.conditions === 'Overcast' || weather?.days[0]?.conditions === 'Partially cloudy')) {
    mainid += ' clouds';
  }
console.log(loading)
  return (
    <MyWeatherContext.Provider
      value={{
        mainid,
        city,
        setCity,
        handleWeather,
        handleCurrentIndex: setCurrentIndex,
        currentIndex,
        weather,
        handleError,
        datas,
        hadWeatherData: !!weather,
        loading
      }}
    >
      {children}
    </MyWeatherContext.Provider>
  );
};

export default MyWeatherContext;
