import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./App.css";

import HeaderBar from "./components/headerbar/HeaderBar";
import HomePage from "./components/home/HomePage";
import DetailView from "./components/detailView/DetailView";
import FiveDayForecast from "./components/fiveDayForecast/FiveDayForecast";
import SettingsPage from "./components/settingsPage/SettingsPage";

/*
 * Now that we have redux we don't need to maintain
 * state in the App component.  We did this before
 * because it is the 'highest' point in the application
 * and could therefore send data down the component
 * tree.
 *
 * With redux we can store state outside of React and
 * access it only where it is needed!
 *
 * This component is much simpler now.
 */
class App extends Component {
  render() {
    return (
      <div className="container">
        <HeaderBar />
        <div className="contentArea">
          <Route exact path="/" component={HomePage} />
          <Route path="/home" component={HomePage} />
          <Route path="/DetailView/:city" component={DetailView} />
          <Route path="/FiveDayForecast/:city" component={FiveDayForecast} />
          <Route path="/SettingsPage" component={SettingsPage} />
        </div>
      </div>
    );
  }
}

export default App;
