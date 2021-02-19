
import { action } from 'typesafe-actions';
import { QasTypes, SetSelected } from '../metaTypes/qas';

export const getTopicData = () => action(QasTypes.GET_QAS);
export const setTopicSelected = (payload: SetSelected) => action(QasTypes.SET_QAS_TOPIC_SELECTED, payload);