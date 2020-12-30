import {all, fork, put, takeLatest, call} from 'redux-saga/effects'
import {ADD_REMINDER, addReminderFailure, addReminderSuccess} from "./actions";
import {
    DailyWeatherData,
    getLocationWeatherForecast,
    getLocationWeatherHistory,
    HistoricWeatherData
} from "../../api/open-weather-map";
import {Coordinates, getCoordinates} from "../../api/google-geocoder";
import {ReminderModel} from "./types";
import {DateTime} from "luxon";

export function* addReminder(action: any) {
    try {
        const reminder: ReminderModel = action.payload

        const today = DateTime.local().set({hour: 0, minute: 0, second: 0, millisecond: 0})
        const reminderDate = DateTime.fromMillis(reminder.dateTime).set({hour: 0, minute: 0, second: 0, millisecond: 0})
        const daysDiff = reminderDate.diff(today, 'days').toObject().days as number

        if (daysDiff >= -5 && daysDiff <= 7) {
            const coordinates: Coordinates = yield call(getCoordinates, reminder.city)
            if (daysDiff < 0) {
                // get weather history
                const ts = Math.round(reminder.dateTime / 1000)
                const weather: HistoricWeatherData = yield call(getLocationWeatherHistory, coordinates, ts)
                reminder.weather = weather.current.weather[0]
            } else if (daysDiff <= 7) {
                // get weather forecast
                const weather: DailyWeatherData = yield call(getLocationWeatherForecast, coordinates)
                reminder.weather = weather.daily[daysDiff].weather[0]
            }
        }

        yield put(addReminderSuccess(reminder))
    } catch (e) {
        yield put(addReminderFailure(e))
    }
}

export function* watchAddReminder() {
    yield takeLatest(ADD_REMINDER.REQUEST, addReminder)
}

// single entry point to start all Sagas at once
export function* rootSaga() {
    yield all([fork(watchAddReminder)]);
}
