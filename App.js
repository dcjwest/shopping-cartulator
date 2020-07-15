import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GlobalProvider } from './state/globalState';
import HomeStack from './routes/homeStack';

export default function App() {
  return (
    <NavigationContainer>
        <StatusBar style='light'/>
        <GlobalProvider>
          <HomeStack />
        </GlobalProvider>
        
      </NavigationContainer>
  );
}
