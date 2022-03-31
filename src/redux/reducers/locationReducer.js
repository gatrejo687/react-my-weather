import {
  ADD_CITY,
  LOAD_CITY_FAILURE,
  LOAD_CITY_IN_PROGRESS,
  LOAD_CITY_SUCCESS,
} from '../actions/actionTypes';

export default function locationReducer(
  state = [
    {
      city: 'New York',
    },
  ],
  action
) {
  switch (action.type) {
    case ADD_CITY:
      const newCity = {
        city: action.city,
      };
      return [...state, newCity];

    case LOAD_CITY_SUCCESS:
      // This admittedly looks weird, but because we are constrained
      // by immutability in redux this is simply a pattern to update
      // an existing object within an array.

      // Array.map takes a function that returns a value based on its
      // input.  Each element in the array is passed to the function
      // and the return values are used to create a new array

      // Here we only want to modify the city that the action designates.
      // By mapping and returning the object passed in, you end up with a
      // copy of the original array:
      //
      //  [1,2,3].map(value => value)  // [1,2,3]

      // We can then do a quick comparison to find the value we want
      // to modify and return a different object for just that case
      return state.map(cityObj => {
        if (cityObj.city === action.city) {
          return {
            ...cityObj, // this 'spreads' the existing object

            // these overwrite the existing keys
            failure: false,
            loading: false,
            weatherData: action.weatherData,
          };
        }
        return cityObj;
      });

    case LOAD_CITY_FAILURE:
      return state.map(cityObj => {
        if (cityObj.city === action.city) {
          return {
            ...cityObj,
            failure: true,
            loading: false,
            error: action.error,
          };
        }
        return cityObj;
      });

    case LOAD_CITY_IN_PROGRESS:
      return state.map(cityObj => {
        if (cityObj.city === action.city) {
          return {
            ...cityObj,
            loading: true,
          };
        }
        return cityObj;
      });

    default:
      return state;
  }
}
