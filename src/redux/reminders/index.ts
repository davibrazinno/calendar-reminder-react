import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Reminder} from "./reminders.types";


export type RemindersState = {
    [dayKey: string]: Reminder[]
}

let initialState: RemindersState = {
}

const remindersSlice = createSlice({
    name: 'reminders',
    initialState,
    reducers: {
        addReminder(state, action: PayloadAction<Reminder>) {
            const dayKey = `${action.payload.year}${action.payload.month}${action.payload.day}`
            state[dayKey] = state[dayKey] ? [...state[dayKey], action.payload] : [action.payload]
        }
    }
})

export const {
    addReminder
} = remindersSlice.actions

export default remindersSlice.reducer
