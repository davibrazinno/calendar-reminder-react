import { all, fork } from 'redux-saga/effects';

import { rootSaga as calendar } from './calendar';

export function* rootSaga() {
  const sagas = [
    calendar
  ].map(fork);

  yield all(sagas);
}

export default rootSaga;
