export enum MapTypes {
    GET_MAP_DATA = 'MAP/GET_MAP_DATA',
    SET_MAP_DATA = 'MAP/SET_MAP_DATA',

    SET_LOADING = 'MAP/SET_LOADING',
}

export interface MapState {
    readonly data: any[];
    readonly loading: boolean;
    readonly mapStyle: any[];
  }
  
  export interface MapAction {
    type: string;
    payload: any;
  }