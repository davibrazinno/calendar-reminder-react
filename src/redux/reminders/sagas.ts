import {all, fork, put, takeLatest} from 'redux-saga/effects'
import {delay} from "q";
import {ADD_REMINDER, addReminderFailure, addReminderSuccess} from "./actions";

export function* addReminder(action: any) {
    try {
        yield delay(500)
        yield put(addReminderSuccess(action.payload))
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
