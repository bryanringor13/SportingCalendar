import { Reducer } from 'redux';
import { ErrorTypes } from '../metaTypes/error';
import { MapState, MapAction, MapTypes } from '../metaTypes/map';

import arsenal_vs_tottenham from '../../assets/images/discover/arsenal_vs_tottenham_2x.png';
import france_vs_italy from '../../assets/images/discover/france_vs_italy_2x.png';
import first_race from '../../assets/images/discover/first_race_2x.png';

const initialState: MapState = {
    data: [
        {
            id: '1',
            eventHeaderImage: arsenal_vs_tottenham,
            coordinate: {
                latitude: 15.418460997014595,
                longitude: 120.59698184128061
            },
            title: "Event 1",
            description: 'Event 1 description',
            address: 'Event 1 address',
            eventLeague: 'Six Nations',
            eventTicketStatus: 1, 
            eventTicketStatusText: 'Tickets Low', 
            eventTime: '6:00 pm', 
            eventName: 'France vs ITALY', 
            eventAddress: 'Rangers Lodge, Hyde Park, London, W2 2UH'
        },
        {
            id: '2',
            eventHeaderImage: france_vs_italy,
            coordinate: {
                latitude: 15.418124203919655,
                longitude: 120.59703251273741
            },
            title: "Event 2",
            description: 'Event 2 description',
            address: 'Event 2 address',
            eventLeague: 'Six Nations',
            eventTicketStatus: 1, 
            eventTicketStatusText: 'Tickets Low', 
            eventTime: '6:00 pm', 
            eventName: 'France vs ITALY', 
            eventAddress: 'Rangers Lodge, Hyde Park, London, W2 2UH'
        },
        {
            id: '3',
            eventHeaderImage: first_race,
            coordinate: {
                latitude: 15.418349,
                longitude: 120.596582
            },
            title: "Event 3",
            description: 'Event 3 description',
            address: 'Event 3 address',
            eventLeague: 'Six Nations',
            eventTicketStatus: 1, 
            eventTicketStatusText: 'Tickets Low', 
            eventTime: '6:00 pm', 
            eventName: 'France vs ITALY', 
            eventAddress: 'Rangers Lodge, Hyde Park, London, W2 2UH'
        },
    ],
    mapStyle: [{
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    }],
    loading: false
};

const mapReducer: Reducer<MapState, MapAction> = (state = initialState, action: MapAction) => {
  switch (action.type) {
        case MapTypes.SET_MAP_DATA:
            return {
                ...state, 
                data: action.payload.mapData,
                loading: false
            };
        case MapTypes.SET_LOADING:
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

export default mapReducer;