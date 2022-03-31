import React from "react";
import { Link } from "react-router-dom";
import "./HeaderBar.css";
import FontAwesome from "react-fontawesome";

function HeaderBar() {
  return (
    <div id="headerBar">
      <Link to="/SettingsPage">
        <FontAwesome className="icon top" name="cog" spin="true" />
      </Link>
      <Link to="/home">
        <FontAwesome className="icon bottom" name="home" />
      </Link>
      <h1>
        <h1>My Weather App - React-Redux</h1>
      </h1>
    </div>
  );
}

export default HeaderBar;
