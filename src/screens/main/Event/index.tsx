import * as React from 'react';
import { Text, View } from 'react-native';
import { Ionicons, Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DiscoverScreen from './Screens/Discover';
import CalendarScreen from './Screens/Calendar';
import FilterFollow from '../Follow';
import NotificationScreen from './Screens/Notification';
import ProfileScreen from './Screens/Profile';

const Tab = createBottomTabNavigator();

export default function Event() {
    return (
        <Tab.Navigator
            screenOptions={({ route }: any) => ({
                tabBarIcon: ({ focused, color, size }: any) => {
                    if (route.name === 'Calendar') {
                        return (
                            <Entypo
                                name={'calendar'}
                                size={size}
                                color={color}
                            />
                        );
                    } else if (route.name === 'Discover') {
                        return (
                            <Ionicons
                                name={'ios-search'}
                                size={size}
                                color={color}
                            />
                        );
                    } else if (route.name === 'Notification') {
                        return (
                            <Ionicons
                                name={'ios-notifications-outline'}
                                size={size}
                                color={color}
                            />
                        );
                    } else if (route.name === 'Profile') {
                        return (
                            <FontAwesome
                                name={'user-o'}
                                size={size}
                                color={color}
                            />
                        );
                    }
                },
            })}
            tabBarOptions={{
                activeTintColor: '#FFFFFF',
                inactiveTintColor: 'gray',
                showLabel: false,
                style: {
                    backgroundColor: '#000000'
                }
            }}
        >
            <Tab.Screen name="Calendar" component={CalendarScreen}/>
            <Tab.Screen name="Discover" component={DiscoverScreen} />
            <Tab.Screen name="Notification" component={NotificationScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}