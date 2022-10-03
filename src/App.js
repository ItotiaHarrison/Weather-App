import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [latitude, setLatitude] = useState([]);
  const [longitude, setLongitude] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    }, [latitude, longitude]);

    return (
      <div className="App">

      </div>
    );
  }

export default App;
