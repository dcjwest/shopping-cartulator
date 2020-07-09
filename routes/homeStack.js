import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/home';
import About from '../screens/about';
import AddItem from '../screens/addItem';

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
                name='AddItem'
                component={AddItem}
            />
        </Stack.Navigator>
    );
}