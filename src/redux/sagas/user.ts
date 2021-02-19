
import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';

import { loginUserFailure, loginUserSuccess, registerUserFailure, registerUserSuccess, updateUserFailed, updateUserSuccess } from '../actions/user';
import { guestApi, loginApi, registerApi, updateApi } from '../api/userApi';
import { UserAction, UserTypes } from '../metaTypes/user';

function* guest() {
  try {
      const data = yield call(guestApi);
      yield put(loginUserSuccess(data.data));
  } catch (error) {
    // if(!!error.response) yield put(loginUserFailure(error.response.data));
    // else yield put(loginUserFailure(error.message));
    let message: any[] = []
    if(!!error.response) {
      console.log('Error from data: ', error.response.data)
      if(!!error.response.data.message) {
        message = [`${error.response.data.message}`]
        yield put(loginUserFailure(message))
      } else {
        yield put(loginUserFailure(error.response.data.errors))
      }
    } else if(!!error.message) {
      console.log('Error from message: ', error.message)
      message = [`${error.message}`]
      yield put(loginUserFailure(message))
    };
  }
}

function* updateUserDetails(action: UserAction) {
  try {
    const data = yield call(updateApi, action.payload);
    yield put(updateUserSuccess(data.data));
  } catch ( error ) {
    // if(!!error.response) yield put(loginUserFailure(error.response.data));
    // else yield put(loginUserFailure(error.message));
    let message: any[] = []
    if(!!error.response) {
      console.log('Error from data: ', error.response.data)
      if(!!error.response.data.message) {
        message = [`${error.response.data.message}`]
        yield put(updateUserFailed(message))
      } else {
        yield put(updateUserFailed(error.response.data.errors))
      }
    } else if(!!error.message) {
      console.log('Error from message: ', error.message)
      message = [`${error.message}`]
      yield put(updateUserFailed(message))
    };
  }
}

function* login(action: UserAction) {
  try {
    if(action.payload.username.length > 0 && action.payload.password.length > 0) {
      const data = yield call(loginApi, action.payload);
      yield put(loginUserSuccess(data.data));
    }else{
      yield put(loginUserFailure(['Please enter your username and password']))
    }
  } catch (error) {
    // if(!!error.response) yield put(loginUserFailure(error.response.data));
    // else yield put(loginUserFailure(error.message));
    let message: any[] = []
    if(!!error.response) {
      console.log('Error from data: ', error.response.data)
      if(!!error.response.data.message) {
        message = [`${error.response.data.message}`]
        yield put(loginUserFailure(message))
      } else {
        yield put(loginUserFailure(error.response.data.errors))
      }
    } else if(!!error.message) {
      console.log('Error from message: ', error.message)
      message = [`${error.message}`]
      yield put(loginUserFailure(message))
    };
  }
}

function* register(action: UserAction) {
  try {
    console.log('Register Saga: ', action.payload)
    const data = yield call(registerApi, action.payload);
    yield put(registerUserSuccess(data.data));
  } catch (error) {
    let message: any[] = []
    if(!!error.response) {
      console.log('Error from data: ', error.response.data)
      yield put(registerUserFailure(error.response.data.errors))
    } else if(!!error.message) {
      console.log('Error from message: ', error.message)
      message = [`${error.message}`]
      yield put(registerUserFailure(message))
    };
  }
}

export default function* userSaga() {
  yield takeLatest(UserTypes.GET_REQUEST_GUEST_LOGIN, guest);
  yield takeLatest(UserTypes.GET_REQUEST_LOGIN, login);
  yield takeLatest(UserTypes.GET_REQUEST_REGISTER, register);
  yield takeLatest(UserTypes.USER_UPDATE, updateUserDetails)
}