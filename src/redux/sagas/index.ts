// Imports: Dependencies
import { all, fork } from 'redux-saga/effects';
import eventsSaga from './event';
import sportsSaga from './sports';
import userSaga from './user';
import venuesSaga from './venue';

// Imports: Redux Sagas

// Redux Saga: Root Saga
export default function* rootSaga() {
    yield all([
        fork(userSaga),
        fork(sportsSaga),
        fork(eventsSaga),
        fork(venuesSaga),
    ]);
};