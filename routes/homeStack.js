import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/home';
import About from '../screens/about';
import EditItem from '../screens/editItem';

const Stack = createStackNavigator();

export default function HomeStack() {
    return (
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen 
                name='Home'
                component={Home}
            />
            <Stack.Screen 
                name='About'
                component={About}
            />
            <Stack.Screen 
                name='Edit Item'
                component={EditItem}
            />
        </Stack.Navigator>
    );
}