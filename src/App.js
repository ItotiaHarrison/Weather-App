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
  const [error, setError] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });

    getWeather(latitude, longitude)
      .then(weather => {
        setWeatherData(weather);
        setError(null);
      })
      .catch(err => {
        setError(err.message);
      });

    getForecast(latitude, longitude)
      .then(data => {
        setForecast(data);
        setError(null);
      })
      .catch(err => {
        setError(err.message);
      });



  }, [latitude, longitude, error]);

  function handleResponse(response) {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Please Enable your Location in your browser!");
    }
  }

  function getWeather(latitude, longitude) {
    return fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${latitude}&lon=${longitude}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(weather => {
        if (Object.entries(weather).length) {
          const mappedData = mapDataToWeatherInterface(weather);
          return mappedData;
        }
      });
  }

  function getForecast(latitude, longitude) {
    return fetch(
      `${process.env.REACT_APP_API_URL}/forecast/?lat=${latitude}&lon=${longitude}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
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

  function mapDataToWeatherInterface(data) {
    const mapped = {
      date: data.dt * 1000,
      description: data.weather[0].main,
      temperature: Math.round(data.main.temp),
    };
    if (data.dt_txt) {
      mapped.dt_txt = data.dt_txt;
    }

    return mapped;
  }

  return (
    <div className="App">
      {(typeof weatherData.main != 'undefined') ? (
        <div>
          <Weather weatherData={weatherData} />
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
