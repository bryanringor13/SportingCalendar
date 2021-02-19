import { combineReducers } from 'redux';
import eventReducer from './event';
import mapReducer from './map';
import notification from './notification';
import questionAndAnswer from './qas';
import sportsReducer from './sports';
import userReducer from './user';
import venueReducer from './venue';

const rootReducer = combineReducers({
    user: userReducer,
    sports: sportsReducer,
    maps: mapReducer,
    notif: notification,
    qas: questionAndAnswer,
    event: eventReducer,
    venue: venueReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;