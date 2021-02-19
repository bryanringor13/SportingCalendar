import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from '../../config/consts/routes';
import Follow from './Follow';
import Event from './Event';
import Venue from './Venue';
import Filter from './Event/Screens/Filter';
import Featured from './Event/Screens/Profile/Featured';
import FeaturedEvents from './Event/Screens/Discover/FeaturedEvents';
import EventDetails from './Event/Screens/Discover/EventDetails';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';
import Settings from './Event/Screens/Profile/Settings';
import ContentDisplay from './Event/Screens/Profile/Settings/ContentDisplay';
import Account from './Event/Screens/Profile/Settings/Account';
import Notifications from './Event/Screens/Profile/Settings/Notifications';
import EventMaps from './Event/Screens/Discover/EventMaps';
import Favourites from './Event/Screens/Calendar/Favourites';
import Qas from './Event/Screens/Profile/Settings/Qas';
import Login from '../auth/Login';
import Register from '../auth/Register';

const Stack = createStackNavigator();

const MainStack = () => {
    const user = useSelector((state: RootState) => state.user);
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
        
            { user.token.toLowerCase() != 'guest' && <Stack.Screen
                name={ROUTES.MAIN_FOLLOW}
                component={Follow}
                initialParams={{ initial: true }}
            /> }
            <Stack.Screen
                name={ROUTES.MAIN_EVENT}
                component={Event}
                options={{ gestureEnabled: false }}
            />
            <Stack.Screen
                name={ROUTES.MAIN_VENUE}
                component={Venue}
            />
            <Stack.Screen
                name={ROUTES.SCREEN_FILTER}
                component={Filter}
            />

            {/* SETTINGS */}
            <Stack.Screen
                name={ROUTES.SETTINGS_PROFILE}
                component={Settings}
            />
            <Stack.Screen
                name={ROUTES.SETTINGS_CONTENT_DISPLAY}
                component={ContentDisplay}
            />
            <Stack.Screen
                name={ROUTES.SETTINGS_ACCOUNT}
                component={Account}
            />
            <Stack.Screen
                name={ROUTES.SETTINGS_NOTIFICATIONS}
                component={Notifications}
            />
            <Stack.Screen
                name={ROUTES.SETTINGS_FAQS}
                component={Qas}
            />

            <Stack.Screen
                name={ROUTES.FILTER_FOLLOW}
                component={Follow}
                initialParams={{ initial: true }}
            />

            <Stack.Screen
                name={ROUTES.SCREEN_FAVOURITES}
                component={Favourites}
            />
            <Stack.Screen
                name={ROUTES.SCREEN_FEATURED}
                component={Featured}
            />
            <Stack.Screen
                name={ROUTES.SCREEN_FEATURED_EVENTS}
                component={FeaturedEvents}
            />
            <Stack.Screen
                name={ROUTES.SCREEN_EVENTS_DETAILS}
                component={EventDetails}
            />

            <Stack.Screen
                name={ROUTES.EVENTS_MAPS}
                component={EventMaps}
            />
        </Stack.Navigator>
    );
};

export default MainStack;