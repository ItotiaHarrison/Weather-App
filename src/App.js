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
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });

    fetch(`${process.env.REACT_APP_API_URL}/weather/?latitude=${latitude}&longitude=${longitude}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(result => {

      });


  }, [latitude, longitude]);

  return (
    <div className="App">
      {(typeof data.main != 'undefined') ? (
        <div>
          <Weather weatherData={data} />
          <Forecast forecast={forecast} weatherData={weatherData} />
        </div>
      ) : (
        <div>
        </div>)}
    </div>
  );
}

export default App;
