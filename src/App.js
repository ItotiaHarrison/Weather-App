import React, { useEffect, useState } from 'react';
import Weather from './components/Weather';
import Forecast from './components/Forecast';
import './App.css';

function App() {
  const [latitude, setLatitude] = useState([]);
  const [longitude, setLongitude] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });

      await fetch(`${process.env.REACT_APP_API_URL}/weather/?latitude=${latitude}&longitude=${longitude}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
        .then(res => res.json())
        .then(result => {
         
        });
    }
    fetchData();

  }, [latitude, longitude]);

  return (
    <div className="App">
      {(typeof data.main != 'undefined') ? (<Weather weatherData={data}/>) : (<div></div>)}
    </div>
  );
}

export default App;
