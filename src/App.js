import React, { useEffect, useState } from 'react';
import Weather from './components/Weather';
import Forecast from './components/Forecast';
import { Dimmer, Loader } from 'semantic-ui-react';
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





  }, [latitude, longitude]);

  function getWeather(latitude, longitude) {
    return fetch(`${process.env.REACT_APP_API_URL}/weather/?latitude=${latitude}&longitude=${longitude}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(weather => {
        if (Object.entries(weather).length) {
          const mappedData = mapDataToWeatherInterface(weather);
          return mappedData;
        }
      });
    }

    function getForecast(lat, long) {
      return fetch(
        `${process.env.REACT_APP_API_URL}/forecast/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
      )
        .then(res => handleResponse(res))
        .then(forecastData => {
          if (Object.entries(forecastData).length) {
            return forecastData.list
              .filter(forecast => forecast.dt_txt.match(/09:00:00/))
              .map(mapDataToWeatherInterface);
          }
        });
    }

    return (
      <div className="App">
        {(typeof data.main != 'undefined') ? (
          <div>
            <Weather weatherData={data} />
            <Forecast forecast={forecast} weatherData={weatherData} />
          </div>
        ) : (
          <div>
            <Dimmer active>
              <Loader>Loading..</Loader>
            </Dimmer>
          </div>
        )}
      </div>
    );
  }

  export default App;
