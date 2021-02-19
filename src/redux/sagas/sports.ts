
import {call, put, takeEvery} from 'redux-saga/effects';
import { fetchSportsSuccess, fetchSportsFailure, setGenderSport, fetchLeagueSport, setLeagueSport, setTeamSport, fetchLeaguesSuccess, fetchLeaguesFailure, fetchTeamSuccess, fetchTeamFailure } from '../actions/sports';
import { sportsApi, sportsLeagueApi, sportsTeamApi } from '../api/sportsApi';
import { SportsTypes } from '../metaTypes/sports';
import { UserAction } from '../metaTypes/user';

function* getAllSports(action: UserAction) {
  try {
    const data = yield call(sportsApi, action.payload);
    yield put(fetchSportsSuccess(data.data));
  } catch (error) {
    if(!!error.response) yield put(fetchSportsFailure(error.response.data));
    else yield put(fetchSportsFailure(error.message));
  }
}

function* getLeagueSports(action: UserAction) {
  try {
    const data = yield call(sportsLeagueApi, action.payload);
    yield put(fetchLeaguesSuccess(data.data));
  } catch (error) {
    if(!!error.response) yield put(fetchLeaguesFailure(error.response.data));
    else yield put(fetchLeaguesFailure(error.message));
  }
}

function* getTeamSports(action: UserAction) {
  try {
    const data = yield call(sportsTeamApi, action.payload);
    yield put(fetchTeamSuccess(data.data));
  } catch (error) {
    if(!!error.response) yield put(fetchTeamFailure(error.response.data));
    else yield put(fetchTeamFailure(error.message));
  }
}

function* setGender(action: UserAction) {
  try {
    yield put(setGenderSport({
      indexId: action.payload.indexId,
      gender: action.payload.gender,
      id: action.payload.id,
    }));
    // console.log('Sent Gender: ', action.payload)
    // const data = yield call(sportsLeagueApi, action.payload.token)
    // // console.log('Set Gender Result', data.data.tournaments)
    // yield put(fetchLeagueSport({
    //   data: data.data.tournaments,
    //   id: action.payload.id,
    //   gender: action.payload.gender
    // }));
  } catch (error) {
    if(!!error.response) yield put(fetchSportsFailure(error.response.data));
    else yield put(fetchSportsFailure(error.message));
  }
}

function* setLeague(action: UserAction) {
  yield put(setLeagueSport(action.payload));
}

function* setTeam(action: UserAction) {
  yield put(setTeamSport(action.payload));
}

export default function* sportsSaga() {
  yield takeEvery(SportsTypes.GENDER_CLICKED, setGender);
  yield takeEvery(SportsTypes.LEAGUE_CLICKED, setLeague);
  yield takeEvery(SportsTypes.TEAM_CLICKED, setTeam);
  yield takeEvery(SportsTypes.GET_ALL_SPORTS, getAllSports);
  yield takeEvery(SportsTypes.GET_LEAGUE_SPORTS, getLeagueSports);
  yield takeEvery(SportsTypes.GET_TEAM_SPORTS, getTeamSports);
}