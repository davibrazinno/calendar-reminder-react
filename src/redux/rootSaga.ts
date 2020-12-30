import { all, fork } from 'redux-saga/effects';

import { rootSaga as reminders } from './reminders/sagas';

export function createSagaAction(type: string) {
  return {
    REQUEST: `${type}.REQUEST`,
    SUCCESS: `${type}.SUCCESS`,
    FAILURE: `${type}.FAILURE`
  };
}


export function* rootSaga() {
  const sagas = [
    reminders
  ].map(fork);

  yield all(sagas);
}

export default rootSaga;
