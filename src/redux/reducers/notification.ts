import { Reducer } from 'redux';
import { ErrorTypes } from '../metaTypes/error';
import { NotifAction, NotifState, NotifTypes } from '../metaTypes/notif';

const initialState: NotifState = {
    list: [
        { content: 'Games starting soon', status: false},
        { content: 'Tickets on sale', status: false},
        { content: 'Events near you', status: false},
    ],
    loading: false
};

const notification: Reducer<NotifState, NotifAction> = (state = initialState, action: NotifAction) => {
  switch (action.type) {
        case NotifTypes.SET_NOTIF:
            let currentList: any[] = state.list;
            currentList[action.payload.id].status = action.payload.status;
            return {
                ...state, 
                list: currentList,
                loading: false
            };
        case NotifTypes.SET_LOADING:
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

export default notification;