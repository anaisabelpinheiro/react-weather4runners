import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import WeatherIcon from "./WeatherIcon";
import Search from "./Search";
import CurrentLocation from "./CurrentLocation.js";
import "./App.css";

export default class App extends Component {
  state = {};

  static propTypes = {
    city: PropTypes.string.isRequired
  };

  static defaultProps = {
    city: "vizela"
  };

  constructor(props) {
    super(props);

    let apiUrl = "https://api.openweathermap.org";
    let apiKey = "094c98f2466ee55acfdba0d40a1b1546";
    let apiParams = "appid=" + apiKey + "&units=metric";

    axios
      .get(apiUrl + "/data/2.5/weather?" + apiParams + "&q=" + this.props.city)
      .then(response => {
        this.setState({
          conditions: {
            city: response.data.name,
            description: response.data.weather[0].main,
            icon: response.data.weather[0].icon,
            precipitation: Math.round(response.data.main.humidity) + "%",
            temperature: Math.round(response.data.main.temp),
            time: this.friendlyDate(new Date()),
            wind: Math.round(response.data.wind.speed) + "km/h"
            
          }
        });
      });
  }

  friendlyDate(date) {
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let minutes = date.getMinutes();
    if (minutes < 10) minutes = "0" + minutes;

    return days[date.getDay()] + " " + date.getHours() + ":" + minutes;
  }

  render() {
    if (this.state.conditions) {
      return (
        <div className="weather-summary">
          <div className="weather-summary-header">
            <h1>{this.state.conditions.city}</h1>
            <div className="weather-detail__text">
              {this.state.conditions.time}
            </div>
            <div className="weather-detail__text">
              {this.state.conditions.description}
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="clearfix">
              
                <div className="weather-temp weather-temp--today">
                  {this.state.conditions.temperature}
                  <WeatherIcon  icon={this.state.conditions.icon}/>
                </div>
                <div className="weather-unit__text weather-unit__text--today">
                  °C
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="weather-detail__text">
                Precipitation: {this.state.conditions.precipitation}
              </div>
              <div className="weather-detail__text">
                Wind: {this.state.conditions.wind}
              </div>
              <br>
              </br>
              {<Search refresh={this.refreshWeatherFromCity} />}
            {<CurrentLocation
              refresh={this.refreshWeatherFromLatitudeAndLongitude}
            />}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          Please wait...
        </div>
      );
    }
  }
}
