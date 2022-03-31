import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadCity } from '../../redux/actions/locationActions';

import styles from './CityWeather.module.css';
import weatherImg from './sun_cloud.svg';

class CityWeather extends Component {
  componentDidMount() {
    const { city, failure, loading, weatherData, loadCityData } = this.props;
    if (!failure && !loading && !weatherData) {
      loadCityData(city);
    }
  }

  render() {
    const { cityName, weatherData, failure } = this.props;

    return (
      <div className={styles.cardWrapper}>
        <div className="card">
          <div className="card-header">
            <div className={styles.addMargin}>{cityName}</div>
          </div>

          <div className="card-body">
            <div className={styles.contentArea}>
              {failure && <h4>Failed to load data</h4>}
              {weatherData && weatherData.main ? (
                <React.Fragment>
                  <div className={styles.widgetCol}>
                    <div className={styles.localBlockM}>
                      <div className={styles.tempratureBig}>
                        {weatherData.main.temp}&#176;
                      </div>
                    </div>
                  </div>
                  <div className={styles.widgetCol}>
                    <img src={weatherImg} className={styles.imgWht} alt="" />
                  </div>
                  <div className={styles.widgetColRight}>
                    <div className={styles.dayblock}>
                      Low: {weatherData.main.temp_min}&#176;
                    </div>
                    <div className={styles.dayblock}>
                      High: {weatherData.main.temp_max}&#176;
                    </div>
                    <div className={styles.dayblockLast}>
                      Humidity: {`${weatherData.main.humidity}%`}
                    </div>
                  </div>
                </React.Fragment>
              ) : (
                <h4>Loading</h4>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CityWeather.propTypes = {
  cityName: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  failure: PropTypes.bool.isRequired,
  // You can be as detailed are you want about PropTypes.
  // Here we specify the shape instead of just
  // 'PropTypes.object'
  weatherData: PropTypes.shape({
    main: PropTypes.shape({
      temp: PropTypes.number,
      temp_min: PropTypes.number,
      temp_max: PropTypes.number,
      humidity: PropTypes.number,
    }),
  }),
};

CityWeather.defaultProps = {
  cityName: '',
  loading: false,
  failure: false,
  weatherData: null,
};

function mapStateToProps(state, ownProps) {
  return state.locations.find(cityObj => cityObj.city === ownProps.cityName);
}

function mapDispatchToProps(dispatch) {
  return {
    loadCityData: cityName => dispatch(loadCity(cityName)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CityWeather);
