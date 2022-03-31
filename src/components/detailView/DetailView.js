import React from 'react';
import { Link } from 'react-router-dom';
import CityWeather from '../CityWeather/CityWeather';
import '../detailView/DetailView.css';

const DetailView = ({ match }) => {
  const city = match.params.city;

  return (
    <div>
      <div className="row">
        <h1>Weather Details</h1>
        <span>
          <Link to={`/fiveDayForecast/${city}`}>Five Day Forecast</Link>
        </span>
      </div>
      <div className="row">
        <div className="col-6 padding-0">
          <CityWeather cityName={city} />
          <div id="weatherDetailNow">
            <ul>
              <li>
                <b>Time:</b> 10:12 am
              </li>
              <li>
                <b>Event:</b> Cloudy
              </li>
              <li>
                <b>Precip:</b> 100%
              </li>
              <li>
                <b>Humidity:</b> 56&deg;
              </li>
              <li>
                <b>Wind:</b> 56&deg;
              </li>
            </ul>
          </div>
        </div>
        <div className="col-6 padding-0">
          {/* Component for Listing Encapsulate */}
          <div id="weatherDetails">
            <ul className="weatherDataLabel">
              <li>Time</li>
              <li>Event</li>
              <li>Precip</li>
              <li>Humidity</li>
              <li>Wind</li>
            </ul>
            {/* Iterate results for hourly results */}
            <ul className="weatherDataContainer">
              <li>11:00 am</li>
              <li>Cloudy</li>
              <li>56&deg;</li>
              <li>56&deg;</li>
              <li>56&deg;</li>
            </ul>
            <ul className="weatherDataContainer">
              <li>12:00 pm</li>
              <li>Cloudy Rains</li>
              <li>56&deg;</li>
              <li>56&deg;</li>
              <li>56&deg;</li>
            </ul>
            <ul className="weatherDataContainer">
              <li>1:00 pm</li>
              <li>Cloudy</li>
              <li>56&deg;</li>
              <li>56&deg;</li>
              <li>56&deg;</li>
            </ul>
            <ul className="weatherDataContainer">
              <li>2:00 pm</li>
              <li>Cloudy Winds</li>
              <li>56&deg;</li>
              <li>56&deg;</li>
              <li>56&deg;</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailView;
