import { useState } from "react";
import axios from 'axios';

const URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = '4d58d6f0a435bf7c5a52e2030f17682d';

export const CurrentWeather = () => {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    const search = async (e) => {
        if(e.key === 'Enter') {
            const params = {
                q: query,
                APPID: API_KEY,
                units: 'metric'
            }
            const { data } = await axios.get(URL, {
                params: params
            })
            setWeather(data);
        }
    }

  return (
    <>
      <label htmlFor="keyword">Indtast bynavn</label>
      <input
        type="text"
        id="keyword"
        className="search"
        placeholder="Søg..." 
        value={query} 
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={search}    
      ></input>

      {weather.main && (
          <div className="city">
              <h2>
                  <span>{weather.name}</span>
                  <sup>{weather.sys.country}</sup>
              </h2>
              <div className="city-temp">
                {Math.round(weather.main.temp)}
                <sup>&deg;C</sup>
              </div>
              <div className="info">
                <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description}></img>            
                <p>{weather.weather[0].description}</p>
              </div>
          </div>
      )}
    </>
  );
};
