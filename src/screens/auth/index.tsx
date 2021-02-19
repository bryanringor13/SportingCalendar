import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from '../../config/consts/routes';
import Initial from './Initial';
import Login from './Login';
import Register from './Register';
import Recovery from './Recovery';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';

const Stack = createStackNavigator();

const AuthStack = () => {
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
        </Stack.Navigator>
    );
};

export default AuthStack;