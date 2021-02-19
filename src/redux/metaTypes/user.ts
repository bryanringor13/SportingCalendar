export enum UserTypes {
  SET_LOADING = 'USER/SET_LOADING',
  GET_REQUEST_GUEST_LOGIN = 'USER/GET_REQUEST_GUEST_LOGIN',
  GET_REQUEST_LOGIN = 'USER/GET_REQUEST_LOGIN',
  GET_SUCCCESS_LOGIN = 'USER/GET_SUCCCESS_LOGIN',
  GET_FAILURE_LOGIN = 'USER/GET_FAILURE_LOGIN',
  GET_REQUEST_REGISTER = 'USER/GET_REQUEST_REGISTER',
  GET_SUCCCESS_REGISTER = 'USER/GET_SUCCCESS_REGISTER',
  GET_FAILURE_REGISTER = 'USER/GET_FAILURE_REGISTER',
  USER_LOGOUT = 'USER/USER_LOGOUT',

  USER_UPDATE = 'USER/USER_UPDATE',
  USER_UPDATE_SUCCESS = 'USER/USER_UPDATE_SUCCESS',
  USER_UPDATE_FAILED = 'USER/USER_UPDATE_FAILED',
  
  SET_USER_LOCATION = 'USER/SET_USER_LOCATION',
}
  
export interface Login {
  username: string;
  password: string;
}

export interface User {
  name: string;
  email: string;
  dob: string;
  username: string;
  token: string;
}
  
export interface Register {
  name: string;
  email: string;
  username: string;
  dob: string;
  password: string;
  password_confirmation: string;
  is_admin: number;
}

export interface UserState {
  readonly token: string;
  readonly data: null;
  readonly loading: boolean;
  readonly error: null;
  readonly logout: boolean;
  readonly location: null;
}

export interface UserAction {
  type: string;
  payload: any;
}