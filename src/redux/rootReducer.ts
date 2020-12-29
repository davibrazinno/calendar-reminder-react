
import { combineReducers } from '@reduxjs/toolkit'

import reminderReducer from '../redux/reminders/reducer'

const reducers = {
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
