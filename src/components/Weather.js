import React from 'react';
import './styles.css';
import moment from 'moment';
import {
    faCloud,
    faBolt,
    faCloudRain,
    faCloudShowersHeavy,
    faSnowflake,
    faSun,
    faSmog,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function Weather({ weatherData }) {

    let weatherData = null;

    if (weatherData.weather[0].main === 'Snow') {
        weatherIcon = <FontAwesomeIcon icon={faSnowflake} />;
    } else if (weatherData.weather[0].main === 'Clouds') {
        weatherIcon = <FontAwesomeIcon icon={faCloud} />;
    } else if (weatherData.weather[0].main === 'Drizzle') {
        weatherIcon = <FontAwesomeIcon icon={faCloudRain} />;
    } else if (weatherData.weather[0].main === 'Rain') {
        weatherIcon = <FontAwesomeIcon icon={faCloudShowersHeavy} />;
    } else if (weatherData.weather[0].main === 'Thunderstorm') {
        weatherIcon = <FontAwesomeIcon icon={faBolt} />;
    } else if (weatherData.weather[0].main === 'Clear') {
        weatherIcon = <FontAwesomeIcon icon={faSun} />;
    } else {
        weatherIcon = <FontAwesomeIcon icon={faSmog} />;
    }

    return (
        <div>Weather</div>
    )
}

export default Weather