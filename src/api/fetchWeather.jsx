import axios from 'axios';

const URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = '4d58d6f0a435bf7c5a52e2030f17682d';

export const fetchWeather = async (query) => {
    const params = {
        q: query,
        APPID: API_KEY,
        units: 'metric'
    }

    const { data } = await axios.get(URL, {
        params: params
    })

    return data;
}