import {WeatherData} from "../../api/open-weather-map";

export enum ReminderColor {
    RED_1_DARK = '#B80000',
    RED_2_DARK = '#DB3E00',
    YELLOW_DARK = '#FCCB00',
    GREEN_1_DARK = '#008B02',
    GREEN_2_DARK = '#006B76',
    BLUE_1_DARK = '#1273DE',
    BLUE_2_DARK ='#004DCF',
    PURPLE_DARK = '#5300EB',
    RED_1_LIGHT = '#EB9694',
    RED_2_LIGHT = '#FAD0C3',
    YELLOW_LIGHT = '#FEF3BD',
    GREEN_1_LIGHT = '#C1E1C5',
    GREEN_2_LIGHT = '#BEDADC',
    BLUE_1_LIGHT = '#C4DEF6',
    BLUE_2_LIGHT = '#BED3F3',
    PURPLE_LIGHT = '#D4C4FB'
}

export interface CityModel {
    name: string,
    placeId: string
}

export interface ReminderModel {
    id?: string
    day: number
    month: number
    year: number
    dateTime: number
    description: string
    color: ReminderColor,
    city?: CityModel,
    weather?: WeatherData
}
