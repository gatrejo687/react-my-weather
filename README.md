# Exercise 0 - Get your OpenWeatherMap API Keys

Today we'll update the application to use real data from OpenWeatherMap. OpenWeatherMap provides a free tier of their API but requires registration to get an API key.

Follow the steps here to set your account up and get your API key: https://openweathermap.org/appid

# Exercise 1 - Setup the API

##### 1. Create the file `src/api/OpenWeatherMapAPI.js`

To keep your API key out of source control we can pass the application the key through an environment variable. The below implementation can be run like so:

`REACT_APP_OWM_API_KEY=your_api_key npm start`

We'll be using the current weather API: https://openweathermap.org/current. From the documentation you'll find that you can pass in a query on the `q` query string parameter. In the implementation below we pass the city name. You can also adjust the units if you prefer metric over imperial.

##### `src/api/OpenWeatherMapAPI.js`

```javascript
const API_KEY = process.env.REACT_APP_OWM_API_KEY;
const baseUrl = 'http://api.openweathermap.org';

export const getWeatherForCity = city =>
  fetch(
    `${baseUrl}/data/2.5/weather?q=${city}&units=imperial&appid=${API_KEY}`
  ).then(response => {
    // fetch provides an `ok` property to see if
    // the statusCode is in the successful range
    if (!response.ok) {
      throw Error(response.statusText); // if it's not ok throw; (this rejects the promise)
    }
    return response.json(); // if ok return the json
  });
```

# Exercise 2 - Setup your thunk (`src/redux/actions/locationActions.js`)

##### 1. Install `redux-thunk`

`npm i redux-thunk`

##### 2. Add `thunk` to the store's middlware

`redux-thunk` is a middlware package that allows us to delay the dispatching of actions. Because fetching data from the server is asynchronous and the redux flow is synchronous it is helpful to have middleware to handle this for us. You don't strictly need to do this but as your application grows middleware is almost always preferred for handling asynchronicity.

```javascript
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk'; // import thunk

export default function configureStore(initialState) {
  //Redux DevTools
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(
    rootReducer,
    initialState,
    // add thunk to the middleware
    composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant()))
  );
}
```

##### 3. Create new action types

There are usually three interesting stages of an API request:

- LOADING - the call has been/is about to be made, typically used to show spinners or skeletons
- FAILURE - the call returned but failed
- SUCCESS - the call returned with data

Create action types for each stage.

##### 4. Add new action creators and your thunk

##### `src/redux/actions/locationActions.js`

```javascript
import { getWeatherForCity } from '../../api/OpenWeatherMapAPI';

import {
  ADD_CITY,
  LOAD_CITY_FAILURE,
  LOAD_CITY_IN_PROGRESS,
  LOAD_CITY_SUCCESS
} from './actionTypes';

export const addCity = city => ({ type: ADD_CITY, city });

/*** New Action Creators ***/
export const loadCityFailure = (city, error) => ({
  type: LOAD_CITY_FAILURE,
  city,
  error
});

export const loadCityInProgress = city => ({
  type: LOAD_CITY_IN_PROGRESS,
  city
});

export const loadCitySuccess = (city, weatherData) => ({
  type: LOAD_CITY_SUCCESS,
  city,
  weatherData
});

/*** Thunk ***/
export const loadCity = city => {
  return dispatch => {
    // Change the state to loading

    return getWeatherForCity(city)
      .then(weatherData => {
        // Dispatch the data on success
      })
      .catch(error => {
        // Console the error, and dispatch an error to the reducer
      });
  };
};
```

##### 5. Update your reducer

Add cases for each of the new action types. We should also update the shape of our data to make things easier to work with. We'll want an array of city objects that tracks the city name, loading status, error status, and weatherData:

Suggested:

```javascript
{
  city: 'San Francisco',
  failure: boolean
  loading: boolean
  weatherData: Object // response from API
};
```

```javascript
case LOAD_CITY_SUCCESS:
  // find the city in the state (it was added by ADD_CITY)
  // update failure and loading to false and add the
  // response to weatherData

case LOAD_CITY_FAILURE:
  // find the city in the state
  // update failure to true; loading to false

case LOAD_CITY_IN_PROGRESS:
  // find the city in the state
  // update loading to true
```

# Exercise 3 - Leverage your thunk

Make the CityWeather component responsible for loading its own data. When the CityWeather component mounts it should call the `loadCityData` thunk which will dispatch the actions.

**Note: You should not call loadCityData if data is already available or if it is loading**

```javascript
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadCity } from '../../redux/actions/locationActions';

class CityWeather extends Component {
  componentDidMount() {
    const { city, failure, loading, weatherData, loadCityData } = this.props;
    if (/* you can prevent the API call from firing in this conditional */) {
      loadCityData(city);
    }
  }

  render() {
    const { cityName, weatherData, failure } = this.props;

    return (
      { weatherData && /* render the widget with data experience */ }
      { loading && /* render a loading experience */ }
      { failure && /* render a failure experience */ }
    );
  }
}

function mapStateToProps(state, ownProps) {
  return state.locations.find(cityObj => cityObj.city === ownProps.cityName);
}

function mapDispatchToProps(dispatch) {
  return {
    loadCityData: cityName => dispatch(loadCity(cityName))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CityWeather);
```

# Troubleshooting

Some tips for troubleshooting

- Check the network tab in your browser to make sure the API all is returning the data you expect.
- If the API response is erroring make sure your API key is appended as `appid=your_key_here` (see code above)
- If you're confused about the state or actions fired use the redux dev tools!
- If you have issues in rendering, simplify your render method temporarily, or use console.logs to debug
