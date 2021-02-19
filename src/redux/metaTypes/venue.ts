export enum VenueTypes {
    GET_VENUES = 'VENUE/GET_VENUES',
    GET_SUCCESS_VENUE = 'VENUE/GET_SUCCESS_VENUE',
    GET_FAILURE_VENUE = 'VENUE/GET_FAILURE_VENUE',

    SET_LOADING = 'VENUE/SET_LOADING',
}

export interface VenueState {
    readonly venues: any[];
    readonly loading: boolean;
    readonly error: null;
}
  
export interface VenueAction {
    type: string;
    payload: any;
}

export interface VenueRequest {
    readonly token: string;
}
