import { Reducer } from 'redux';
import { ErrorTypes } from '../metaTypes/error';
import { UserState, UserAction, UserTypes } from '../metaTypes/user';

const initialState: UserState = {
    token: '',
    data: null,
    loading: false,
    error: null,
    logout: false,
    location: null
};

const userReducer: Reducer<UserState, UserAction> = (state = initialState, action: UserAction) => {
  switch (action.type) {
        case UserTypes.GET_SUCCCESS_LOGIN:
        case UserTypes.GET_SUCCCESS_REGISTER:
            console.log('SUCCESS REGISTER/LOGIN', action.payload)
            return {
                ...state, 
                token: action.payload.token,
                data: action.payload.userInfo,
                loading: false,
                error: null,
            };
        case UserTypes.GET_FAILURE_LOGIN:
        case UserTypes.GET_FAILURE_REGISTER:
            // console.log("GET_FAILURE_LOGIN | GET_FAILURE_REGISTER", action.payload)
            console.log('FAILURE REGISTER/LOGIN', action.payload)
            return {
                ...state, 
                token: '',
                data: null,
                loading: false,
                error: action.payload,
            };
        case UserTypes.USER_UPDATE_SUCCESS:
            console.log('USER_UPDATE_SUCCESS: ',action.payload.data)
            return {
                ...state,
                data: action.payload.data,
                loading: false,
                error: null
            }
        case UserTypes.USER_UPDATE_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case UserTypes.USER_LOGOUT:
            return {
                ...state, 
                token: '',
                data: null,
                loading: false,
                error: null,
                logout: true
            };
        case UserTypes.SET_USER_LOCATION:
            return {
                ...state, 
                loading: false,
                location: action.payload.location
            };
        case UserTypes.SET_LOADING:
            return {
                ...state, 
                loading: true,
            };
        case ErrorTypes.REQUEST_CLEAR_USER:
            return {
                ...state, 
                error: null,
                loading: false,
            };
        default:
            return state;
  }
};

export default userReducer;