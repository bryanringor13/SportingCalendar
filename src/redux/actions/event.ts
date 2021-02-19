
import { action } from 'typesafe-actions';
import { EventRequest, EventTypes } from '../metaTypes/event';

export const fetchEvent = (payload: string) => action(EventTypes.GET_EVENTS, payload);
export const fetchEventsSuccess = (payload: null) => action(EventTypes.GET_SUCCESS_EVENTS, payload);
export const fetchEventFailure = (payload: null) => action(EventTypes.GET_FAILURE_EVENT, payload);

export const getEvent = (payload: { token: string, id: string }) => action(EventTypes.GET_EVENT, payload);
export const fetchEventSuccess = (payload: null) => action(EventTypes.GET_SUCCESS_EVENT, payload);