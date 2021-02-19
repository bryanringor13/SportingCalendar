
import {call, put, takeEvery} from 'redux-saga/effects';
import { fetchEventFailure, fetchEventsSuccess, fetchEventSuccess } from '../actions/event';
import { eventApi, eventsApi } from '../api/eventsApi';
import { EventAction, EventTypes } from '../metaTypes/event';

function* getAllEvents(action: EventAction) {
  try {
    const data = yield call(eventsApi, action.payload);
    yield put(fetchEventsSuccess(data.data));
  } catch (error) {
    if(!!error.response) yield put(fetchEventFailure(error.response.data));
    else yield put(fetchEventFailure(error.message));
  }
}

function* getEvent(action: EventAction) {
  try{
    const data = yield call(eventApi, action.payload);
    yield put(fetchEventSuccess(data.data));
  } catch (error) {
    if(!!error.response) yield put(fetchEventFailure(error.response.data));
    else yield put(fetchEventFailure(error.message));
  }
}

export default function* eventsSaga() {
  yield takeEvery(EventTypes.GET_EVENTS, getAllEvents);
  yield takeEvery(EventTypes.GET_EVENT, getEvent);
}