import React from 'react';
import { Link } from 'react-router-dom';
import '../fiveDayForecast/FiveDayForecast.css';
import weatherImg from '../CityWeather/sun_cloud.svg';

const FiveDayForecast = ({ match }) => {
  const city = match.params.city;

  return (
    <div>
      <div className="row">
        <h1>{city}'s 5 Day Forecast</h1>
        <span>
          <Link to={`/detailView/${city}`}>Detail View</Link>
        </span>
      </div>
      <div className="row">
        <div id="weatherDetailNow">
          <ul>
            <li>
              <b>Mon:</b>
              <div className="imgSz">
                <img src={weatherImg} alt="" />
              </div>
              High: 56&deg;
              <br />
              Low:56&deg;
            </li>
            <li>
              <b>Tue:</b>
              <div className="imgSz">
                <img src={weatherImg} alt="" />
              </div>
              High: 56&deg; <br /> Low:56&deg;
            </li>
            <li>
              <b>Wed:</b>
              <div className="imgSz">
                <img src={weatherImg} alt="" />
              </div>
              High: 56&deg;
              <br /> Low:56&deg;
            </li>
            <li>
              <b>Thr:</b>
              <div className="imgSz">
                <img src={weatherImg} alt="" />
              </div>
              High: 56&deg; <br /> Low:56&deg;
            </li>
            <li>
              <b>Fri:</b>
              <div className="imgSz">
                <img src={weatherImg} alt="" />
              </div>
              High: 56&deg; <br /> Low:56&deg;
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FiveDayForecast;
