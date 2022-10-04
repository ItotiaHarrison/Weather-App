import React, { useEffect, useState } from 'react';
import Weather from './components/Weather';
import './App.css';

function App() {
  const [latitude, setLatitude] = useState([]);
  const [longitude, setLongitude] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });

      await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
        .then(res => res.json())
        .then(result => {
          setData(result)
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
