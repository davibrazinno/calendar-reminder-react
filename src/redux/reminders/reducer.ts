import {createReducer, PayloadAction} from '@reduxjs/toolkit'
import {ReminderModel} from "./types";
import {addReminderSuccess, deleteDayReminderAction, deleteReminderAction} from "./actions";

export type RemindersState = {
    [dayKey: string]: ReminderModel[]
}

let initialState: RemindersState = {}

function findKey(state: any, action: PayloadAction<ReminderModel>) {
    let existingKey = null
    Object.keys(state).forEach((key) => {
        const existingReminder = state[key].find((reminder: any) => reminder.id === action.payload.id)
        if (existingReminder) {
            existingKey = `${existingReminder.year}${existingReminder.month}${existingReminder.day}`
        }
    })
    return existingKey
}

function remove(state: any, action: PayloadAction<ReminderModel>) {
    let existingKey = findKey(state, action)
    if (existingKey) {
        if (state[existingKey]) {
            const newState = state[existingKey].filter((reminder: ReminderModel) => reminder.id !== action.payload.id)
            if (newState.length) {
                state[existingKey] = [...newState]
            } else {
                delete state[existingKey]
            }
        }
    }
}

const remindersReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(addReminderSuccess, (state, action: PayloadAction<ReminderModel>) => {
                // remove the reminder if existing
                remove(state, action)
                // add or update the reminder
                const newKey = `${action.payload.year}${action.payload.month}${action.payload.day}`
                if (state[newKey]) {
                    // there are other reminders on the same day
                    const newState = state[newKey].filter((reminder) => reminder.id !== action.payload.id)
                    state[newKey] = [...newState, action.payload]
                } else {
                    // no other reminders on the same day
                    state[newKey] = [action.payload]
                }
            }
        )
        .addCase(deleteReminderAction, (state, action: PayloadAction<ReminderModel>) => {
            // remove the reminder if existing
            remove(state, action)
        })
        .addCase(deleteDayReminderAction, (state, action: PayloadAction<string>) => {
            delete state[action.payload]
        })
})

export default remindersReducer
