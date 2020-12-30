import {WeatherData} from "../../api/open-weather-map";

export enum ReminderColor {
    RED = 'red',
    GREEN = 'green',
    BLUE = 'blue',
    YELLOW = 'yellow'
}

export interface ReminderModel {
    day: number
    month: number
    year: number
    dateTime: number
    description: string
    color: ReminderColor,
    city: string,
    weather?: WeatherData
}
