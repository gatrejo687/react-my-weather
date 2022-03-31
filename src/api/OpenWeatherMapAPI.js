// In your terminal you'll need to add the OpenWeatherMaps API key to
// your environment variables
//
// These are typically injected at build time to avoid committing
// the key to source control
//
// NOTE: create-react-app ignores any environment variables that
// don't start with 'REACT_APP_'
const API_KEY = "c810a9693acd4ea4708236406ce28978";
//const API_KEY = process.env.REACT_APP_OWM_API_KEY;
const baseUrl = "http://api.openweathermap.org";

export const getWeatherForCity = (city) =>
  fetch(`${baseUrl}/data/2.5/weather?q=${city}&units=imperial&appid=${API_KEY}`)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    })
    .then((response) => {
      return response.json();
    });
