import {Coordinates} from "./google-geocoder";

export interface WeatherData {
    description: string,
    icon: string,
    main: string
}

export interface DailyWeatherData {
    daily: [{ weather: WeatherData[] }]
}

export interface HistoricWeatherData {
    current: { weather: WeatherData[] }
}


export async function getLocationWeatherForecast(coordinates: Coordinates) {
    const apiKey = process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lng}&exclude=current,minutely,hourly,alerts&appid=${apiKey}`
    return fetch(url)
        .then((response) => response.json())
        .then((data) => data as DailyWeatherData)
        .catch((error) => {
            throw error
        })
}

export async function getLocationWeatherHistory(coordinates: Coordinates, date: number) {
    const apiKey = process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY
    const url = `http://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${coordinates.lat}&lon=${coordinates.lng}&dt=${date}&appid=${apiKey}`
    return fetch(url)
        .then((response) => response.json())
        .then((data) => data as HistoricWeatherData)
        .catch((error) => {
            throw error
        })
}
