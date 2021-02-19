import { Reducer } from 'redux';
import { ErrorTypes } from '../metaTypes/error';
import { EventAction, EventState, EventTypes } from '../metaTypes/event';

const initialState: EventState = {
    events: [],
    loading: false,
    eventDetails: {},
    error: null
};

const eventReducer: Reducer<EventState, EventAction> = (state = initialState, action: EventAction) => {
  switch (action.type) {
        case EventTypes.GET_SUCCESS_EVENTS:
            console.log('GET_SUCCESS_EVENTS')
            return {
                ...state, 
                events: action.payload.events,
                loading: false
            };
        case EventTypes.GET_FAILURE_EVENTS:
            console.log('GET_FAILURE_EVENTS')
            return {
                ...state, 
                events: [],
                loading: false,
                error: action.payload,
            };
        case EventTypes.GET_SUCCESS_EVENT:
            console.log('GET_SUCCESS_EVENT',action.payload.data)
            return {
                ...state, 
                eventDetails: action.payload.data,
                loading: false,
                error: action.payload,
            };
        case EventTypes.SET_LOADING:
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

export default eventReducer;