
import { action } from 'typesafe-actions';
import { NotifSet, NotifTypes } from '../metaTypes/notif';

export const getNotif = () => action(NotifTypes.GET_NOTIF);
export const setNotif = (payload: NotifSet) => action(NotifTypes.SET_NOTIF, payload);