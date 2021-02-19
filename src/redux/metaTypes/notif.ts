export enum NotifTypes {
    GET_NOTIF = 'NOTIF/GET_NOTIF',
    SET_NOTIF = 'NOTIF/SET_NOTIF',

    SET_LOADING = 'NOTIF/SET_LOADING',
}

export interface NotifState {
    readonly list: any[];
    readonly loading: boolean;
  }
  
  export interface NotifAction {
    type: string;
    payload: any;
  }

  export interface NotifSet {
    id: number;
    status: boolean;
  }