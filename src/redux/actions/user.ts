
import { action } from 'typesafe-actions';
import { Login, Register, User, UserTypes } from '../metaTypes/user';

export const setLoading = () => action(UserTypes.SET_LOADING);
export const loginGuest = () => action(UserTypes.GET_REQUEST_GUEST_LOGIN);
export const loginUser = (payload: Login) => action(UserTypes.GET_REQUEST_LOGIN, payload);
export const loginUserSuccess = (payload: null) => action(UserTypes.GET_SUCCCESS_LOGIN, payload);
export const loginUserFailure = (payload: null) => action(UserTypes.GET_FAILURE_LOGIN, payload);

export const updateUser = (payload: User) => action(UserTypes.USER_UPDATE, payload);
export const updateUserSuccess = (payload: null) => action(UserTypes.USER_UPDATE_SUCCESS, payload);
export const updateUserFailed = (payload: null) => action(UserTypes.USER_UPDATE_FAILED, payload);

export const userLocation = (payload: null) => action(UserTypes.SET_USER_LOCATION, payload);

export const registerUser = (payload: Register) => action(UserTypes.GET_REQUEST_REGISTER, payload);
export const registerUserSuccess = (payload: null) => action(UserTypes.GET_SUCCCESS_REGISTER, payload);
export const registerUserFailure = (payload: null) => action(UserTypes.GET_FAILURE_REGISTER, payload);

export const userLogout = () => action(UserTypes.USER_LOGOUT);