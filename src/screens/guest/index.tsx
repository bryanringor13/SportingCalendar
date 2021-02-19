import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from '../../config/consts/routes';
import Login from '../auth/Login';
import Register from '../auth/Register';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';
import Event from '../main/Event';
import Venue from '../main/Venue';
import Filter from '../main/Event/Screens/Filter';
import Settings from '../main/Event/Screens/Profile/Settings';
import Qas from '../main/Event/Screens/Profile/Settings/Qas';
import Featured from '../main/Event/Screens/Profile/Featured';
import FeaturedEvents from '../main/Event/Screens/Discover/FeaturedEvents';
import EventDetails from '../main/Event/Screens/Discover/EventDetails';
import EventMaps from '../main/Event/Screens/Discover/EventMaps';
import ContentDisplay from '../main/Event/Screens/Profile/Settings/ContentDisplay';
import Initial from '../auth/Initial';
import Recovery from '../auth/Recovery';

const Stack = createStackNavigator();

const GuestStack = () => {
    const user = useSelector((state: RootState) => state.user);
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
                
            {!user.logout && <Stack.Screen
                name={ROUTES.INITIAL}
                component={Initial}
            />}
            <Stack.Screen
                name={ROUTES.AUTH_LOGIN}
                component={Login}
            />
            <Stack.Screen
                name={ROUTES.REGISTER}
                component={Register}
            />
            <Stack.Screen
                name={ROUTES.RECCOVERY}
                component={Recovery}
            />
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
                name={ROUTES.SETTINGS_FAQS}
                component={Qas}
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

export default GuestStack;