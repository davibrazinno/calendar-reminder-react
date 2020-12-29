
import { combineReducers } from '@reduxjs/toolkit'

import calendarReducer from '../redux/calendar'
import reminderReducer from '../redux/reminders'

const reducers = {
  calendar: calendarReducer,
  reminders: reminderReducer
}

export let rootReducer = combineReducers({
  ...reducers
})

export default function createReducer(injectedReducers = {}) {
  rootReducer = combineReducers({
    ...reducers,
    ...injectedReducers,
  });

  return rootReducer;
}

export type RootState = ReturnType<typeof rootReducer>
