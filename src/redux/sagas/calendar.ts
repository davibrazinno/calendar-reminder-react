import {all, call, fork, put, takeLatest} from 'redux-saga/effects'
import {DateTime} from "luxon";
import {createMonthView} from "../calendar/calendar.utils";
import {setMonth} from '../calendar'

export const SET_MONTH_DATA = 'SET_MONTH_DATA'

export function* setMonthData(action: any) {
    const monthView = yield call(createMonthView, DateTime.fromMillis(action.payload))
    yield put(setMonth(monthView))
}

export function* watchSetMonthData() {
    yield takeLatest(SET_MONTH_DATA, setMonthData)
}

// single entry point to start all Sagas at once
export function* rootSaga() {
    yield all([fork(watchSetMonthData)]);
}
