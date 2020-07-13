import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/home';
import About from '../screens/about';
import EditItem from '../screens/editItem';
import Header from '../components/header';

const Stack = createStackNavigator();

export default function HomeStack() {
    return (
        <Stack.Navigator 
            initialRouteName='Home'>
            <Stack.Screen 
                name='Home'
                component={Home}
                options={{
                    headerTitle: () => <Header />,
                    headerBackground: () => (
                        <ImageBackground
                            source={require('../assets/header_bg.jpg')}
                            style={StyleSheet.absoluteFill}
                        >
                        </ImageBackground>
                    )
                }}
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
