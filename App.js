import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GlobalProvider } from './state/globalState';
import HomeStack from './routes/homeStack';
import FlashMessage from 'react-native-flash-message';

export default function App() {
  return (
    <NavigationContainer>
        <StatusBar style='light'/>
        <GlobalProvider>
          <HomeStack />
        </GlobalProvider>
        <FlashMessage position='bottom' />
      </NavigationContainer>
  );
}
