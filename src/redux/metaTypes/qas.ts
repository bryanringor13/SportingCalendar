export enum QasTypes {
    GET_QAS = 'NOTIF/GET_QAS',
    SET_QAS = 'NOTIF/SET_QAS',
    SET_QAS_TOPIC_SELECTED = 'NOTIF/SET_QAS_TOPIC_SELECTED',

    SET_LOADING = 'NOTIF/SET_LOADING',
}

export interface QasState {
    readonly items: any[];
    readonly topic: any[];
    readonly loading: boolean;
  }
  
export interface QasAction {
  type: string;
  payload: any;
}

export interface SetSelected {
  id: number;
  selected: boolean;
}