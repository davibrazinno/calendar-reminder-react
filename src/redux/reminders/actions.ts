import {createSagaAction} from "../rootSaga";
import {createAction} from "@reduxjs/toolkit";
import {ReminderModel} from "./types";

export const ADD_REMINDER = createSagaAction('ADD_REMINDER')

export const addReminderRequest = createAction<ReminderModel>(ADD_REMINDER.REQUEST)
export const addReminderSuccess = createAction<ReminderModel>(ADD_REMINDER.SUCCESS)
export const addReminderFailure = createAction(ADD_REMINDER.FAILURE)
