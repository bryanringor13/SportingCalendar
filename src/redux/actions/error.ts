
import { action } from 'typesafe-actions';
import { ErrorTypes } from '../metaTypes/error';

export const clearErrorUser = () => action(ErrorTypes.REQUEST_CLEAR_USER);
export const clearErrorSports = () => action(ErrorTypes.REQUEST_CLEAR_SPORTS);