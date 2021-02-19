
import { action } from 'typesafe-actions';
import { MapTypes } from '../metaTypes/map';

export const getMapData = () => action(MapTypes.GET_MAP_DATA);
export const setMapData = () => action(MapTypes.SET_MAP_DATA);