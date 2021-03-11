import { useState } from "react";
import axios from 'axios';

const URL = 'https://api.openweathermap.org/data/2.5/forecast';
const API_KEY = '4d58d6f0a435bf7c5a52e2030f17682d';

export const CurrentForecast = () => {
    const [query, setQuery] = useState('');
    const [hours, setHours] = useState([]);
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

            // Bygger array ud fra timestamp
            //const arrDays = [...new Set(data.list.map((item) => { return new Date((item.dt-3600)*1000).setHours(0)}))]
            //const arrHours = arrDays.map((day) => { return data.list.filter((item) => ((item.dt*1000) >= day && (item.dt*1000) <= (day + 86400000)))})

            // Sætter et array af unikke datoer ud fra datotext feltet
            const arrDays = [...new Set(data.list.map((item) => { return item.dt_txt.substring(8,10)}))];
            // Looper unikke datoer og bygger array med timer fordelt på dage
            const arrHours = arrDays.map((day) => { return data.list.filter((item) => (item.dt_txt.substring(8,10) === day))})
            
            setWeather(data);
            setHours(arrHours);
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

      {hours && (
          <div className="forecast">
            {hours.map((day, i) => {
                 
              console.log(day);
              return (
                <div key={i}>
                  <div><strong>{day[0].dt_txt.substring(0,10)}</strong></div>
                  {day.map((hour, j) => {
                    
                    const d = new Date((hour.dt-3600)*1000);
                    const h = (d.getHours().toString().length < 2) ? `0${d.getHours()}` : d.getHours();
                    const m = (d.getMinutes().toString().length < 2) ? `0${d.getMinutes()}` : d.getMinutes();
                    const time = `${h}:${m}`;

                    console.log(hour);
                    return (
                      <div key={j}>
                        {`${time} - ${Math.round(hour.main.temp)}`} &deg;C - 
                        <img src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`} alt={hour.weather[0].description}></img>            
                      </div>
                    )
                  })}
                </div>
              )
            })}            
          </div>
      )}
    </>
  );
};
