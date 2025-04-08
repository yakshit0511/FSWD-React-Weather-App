import { useState, useEffect } from "react";
import "./../styles/weather.css"; // Import external CSS

const Weather = () => {
  const [city, setCity] = useState("Ahmedabad");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_KEY = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API Key

  // Fetch Weather Data
  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error("City not found");
        }
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]); // Runs when city changes

  return (
    <div className="weather-container">
      <h2>Weather App</h2>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {weather && !loading && !error && (
        <div className="weather-info">
          <h3>{weather.name}, {weather.sys.country}</h3>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Condition: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
