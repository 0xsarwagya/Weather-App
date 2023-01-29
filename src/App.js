import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [weatherData, setWeatherData] = useState({});
  const [city, setCity] = useState("");
  const [unit, setUnit] = useState("F");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=your-api-key`
      );
      const data = await response.json();
      setWeatherData(data);
    };
    if (city) {
      fetchData();
    } else if (!city) {
      setWeatherData("");
    }
  }, [city]);

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
  };

  const temperature =
    weatherData.main &&
    (unit === "C"
      ? ((weatherData.main.temp - 32) * 5) / 9
      : weatherData.main.temp);

  return (
    <div className="weather-app">
      <form>
        <input
          className="input-field"
          type="text"
          placeholder="Enter a city name or zip code"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit" className="submit-button">
          Submit
        </button>
        <div className="unit-switch">
          <label>
            <input
              type="radio"
              value="C"
              checked={unit === "C"}
              onChange={handleUnitChange}
            />
            Celsius
          </label>
          <label>
            <input
              type="radio"
              value="F"
              checked={unit === "F"}
              onChange={handleUnitChange}
            />
            Fahrenheit
          </label>
        </div>
      </form>
      {weatherData.main ? (
        <div className="weather-info">
          <p>
            Temperature: {temperature}°{unit}
          </p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed}mph</p>
        </div>
      ) : (
        <p className="message">
          Enter a city name or zip code to see the weather information
        </p>
      )}
      <footer className="footer">
        <p>A weather app to check the current weather conditions in a city</p>
        <p> &copy; Sarwagya Singh {new Date().getFullYear()} </p>
      </footer>
    </div>
  );
};

export default App;
