import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthStack from './auth';
import MainStack from './main';
import GuestStack from './guest';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducers';

const { Navigator, Screen } = createStackNavigator();
const selectScreen = (isAuth: boolean) => {
    if (isAuth) {
        return MainStack;
    }
    return GuestStack;
};

function AppRoutes() {
    // const isAuth = true;
    const user = useSelector((state: RootState) => state.user)
    const isAuth = ( user.token || '').length > 0 && user.token.toLowerCase() !== 'guest';
    const CurrentScreen = selectScreen(isAuth);
    return (
        <NavigationContainer >
            <CurrentScreen />
        </NavigationContainer >
    );
}

export default AppRoutes;