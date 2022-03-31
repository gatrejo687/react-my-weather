import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import AddCityForm from '../AddCityForm/AddCityForm';
import CityWeather from '../CityWeather/CityWeather';

// 'cities' is now provided by react-redux
// from the mapStateToProps function below
const HomePage = ({ cities }) => (
  <div>
    <div className="row">
      <h1>Overview - Weather Widget</h1>
    </div>
    <div className="row">
      <AddCityForm />
    </div>
    <div className="weatherList">
      {cities.map(({ city }) => (
        <React.Fragment key={city}>
          <Link to={`/detailView/${city}`}>
            <CityWeather cityName={city} />
          </Link>
        </React.Fragment>
      ))}
    </div>
  </div>
);

function mapStateToProps(state) {
  return {
    cities: state.locations,
  };
}

export default connect(
  mapStateToProps,
  null
)(HomePage);
