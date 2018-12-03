import React, { Component } from 'react';

class WeatherIcon extends Component {
url (icon) {
    return "http://openweathermap.org/img/w/"+ icon + ".png";

}

    render() {
        return (
        <img 
        className= "weather__icon weather__icon--today"
        src={this.url(this.props.icon)}
        alt="weather icon"
        />
        );
    }
}
             
export default WeatherIcon;