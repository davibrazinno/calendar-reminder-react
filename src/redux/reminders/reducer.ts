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
            if (!state[dayKey]) {
                state[dayKey] = [action.payload]
            } else {
                const newState = state[dayKey].filter((reminder) => reminder.id !== action.payload.id)
                state[dayKey] = [...newState, action.payload]
            }
        })
})

export default remindersReducer
