import { Reducer } from 'redux';
import { ErrorTypes } from '../metaTypes/error';
import { VenueAction, VenueState, VenueTypes } from '../metaTypes/venue';

const initialState: VenueState = {
    venues: [],
    loading: false,
    error: null,
};

const venueReducer: Reducer<VenueState, VenueAction> = (state = initialState, action: VenueAction) => {
  switch (action.type) {
        case VenueTypes.GET_SUCCESS_VENUE:
            console.log('GET_SUCCESS_VENUE', action.payload.data)
            return {
                ...state, 
                venues: [{
                    ...action.payload.data
                }],
                loading: false
            };
        case VenueTypes.GET_FAILURE_VENUE:
            console.log('GET_FAILURE_VENUE', action.payload)
            return {
                ...state, 
                venues: [],
                loading: false,
                error: action.payload,
            };
        case VenueTypes.SET_LOADING:
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

export default venueReducer;