import {createSagaAction} from "../rootSaga";
import {createAction} from "@reduxjs/toolkit";
import {ReminderModel} from "./types";

export const ADD_REMINDER = createSagaAction('ADD_REMINDER')

export const addReminderRequest = createAction<ReminderModel>(ADD_REMINDER.REQUEST)
export const addReminderSuccess = createAction<ReminderModel>(ADD_REMINDER.SUCCESS)
export const addReminderFailure = createAction<Error>(ADD_REMINDER.FAILURE)

export const DELETE_REMINDER = 'DELETE_REMINDER'
export const deleteReminderAction = createAction<ReminderModel>(DELETE_REMINDER)

export const DELETE_DAY_REMINDER = 'DELETE_DAY_REMINDERS'
export const deleteDayReminderAction = createAction<string>(DELETE_DAY_REMINDER)
