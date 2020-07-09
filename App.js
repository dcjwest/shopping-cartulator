import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeStack from './routes/homeStack';

export default function App() {
  return (
    <NavigationContainer>
        <StatusBar style="auto" />
        <HomeStack />
      </NavigationContainer>
  );
}
