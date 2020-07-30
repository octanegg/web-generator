import React from "react";
import ReactDOM from "react-dom";
import HomeComponent from "./Home";

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(
    React.createElement(HomeComponent),
    document.getElementById("mount")
  );
});
