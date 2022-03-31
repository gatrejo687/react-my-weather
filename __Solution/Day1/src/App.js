import React, { Component } from 'react';

import './App.css';
import AddCityForm from './components/AddCityForm/AddCityForm';
import CityWeather from './components/CityWeather/CityWeather';

class App extends Component {
  state = {
    cities: ['New York', 'Chennai', 'Monterrey'],
  };

  // This function adds a City name to the current state.
  addCity = newCityName => {
    this.setState(prevState => {
      return {
        cities: [...prevState.cities, newCityName],
      };
    });
  };

  render() {
    return (
      <div className="container">
        <div className="header">
          <h1>My Weather App - React-Redux</h1>
        </div>
        <div className="contentArea">
          {
            // Here we pass the addCity method to the form.
            // This allows the AddCityForm component to call it
            // and add data to App's state.
          }
          <AddCityForm addCity={this.addCity} />
          <div className="weatherList">
            {// Here we use the cities array in App component's state
            // We can use normal array methods within JavaScript expressions
            // to map over the array and return a React component for each
            // city.
            //
            // The map method returns an array of <CityWeather> components
            // which React then renders for us.
            //
            // Here we're only providing the name of the city and letting
            // the defaultProps in CityWeather.js fill in the rest

            this.state.cities.map(city => (
              <CityWeather cityName={city} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
