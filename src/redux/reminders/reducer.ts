import {createReducer, PayloadAction} from '@reduxjs/toolkit'
import {ReminderModel} from "./types";
import {addReminderSuccess} from "./actions";

export type RemindersState = {
    [dayKey: string]: ReminderModel[]
}

let initialState: RemindersState = {}

const remindersReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(addReminderSuccess, (state, action: PayloadAction<ReminderModel>) => {
            const dayKey = `${action.payload.year}${action.payload.month}${action.payload.day}`
            state[dayKey] = state[dayKey] ? [...state[dayKey], action.payload] : [action.payload]
        })
})

export default remindersReducer
