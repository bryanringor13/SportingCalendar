export enum EventTypes {
    GET_EVENTS = 'EVENT/GET_EVENTS',
    GET_SUCCESS_EVENTS = 'EVENT/GET_SUCCESS_EVENTS',
    GET_FAILURE_EVENT = 'EVENT/GET_FAILURE_EVENTS',

    GET_EVENT = 'EVENT/GET_EVENT',
    GET_SUCCESS_EVENT = 'EVENT/GET_SUCCESS_EVENT',

    SET_LOADING = 'EVENT/SET_LOADING',
    GET_FAILURE_EVENTS = "GET_FAILURE_EVENTS"
}

export interface EventState {
    readonly events: any[];
    readonly loading: boolean;
    readonly eventDetails: {};
    readonly error: null;
}
  
export interface EventAction {
    type: string;
    payload: any;
}

export interface EventRequest {
    readonly token: string;
}
