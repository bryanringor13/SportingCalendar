
import {call, put, takeEvery} from 'redux-saga/effects';
import { fetchVenueFailure, fetchVenueSuccess } from '../actions/venue';
import { venueApi } from '../api/venuesApi';
import { VenueAction, VenueTypes } from '../metaTypes/venue';

function* getAllVenue(action: VenueAction) {
  try {
    console.log('Venue: ', action.payload)
    const data = yield call(venueApi, action.payload);
    yield put(fetchVenueSuccess(data.data));
  } catch (error) {
    if(!!error.response) yield put(fetchVenueFailure(error.response.data));
    // else yield put(fetchVenueFailure(error.message));
  }
}

export default function* venuesSaga() {
  yield takeEvery(VenueTypes.GET_VENUES, getAllVenue);
}