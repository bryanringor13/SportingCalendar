
import { action } from 'typesafe-actions';
import { VenueTypes } from '../metaTypes/venue';

export const fetchVenue = (payload: { token: string, event_id: string}) => action(VenueTypes.GET_VENUES, payload);
export const fetchVenueSuccess = (payload: null) => action(VenueTypes.GET_SUCCESS_VENUE, payload);
export const fetchVenueFailure = (payload: null) => action(VenueTypes.GET_FAILURE_VENUE, payload);