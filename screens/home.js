import React from 'react';
import { View, Text, Button } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

export default function Home({ navigation }) {
    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.textTitle}>Home Screen</Text>
            <View style={globalStyles.button}>
                <Button 
                    color='green'
                    title='Go to About Screen' 
                    onPress={() => navigation.navigate('About')} 
                />
            </View>
            <View style={globalStyles.button}>
                <Button 
                    color='blue' 
                    title='Go to Add Item Screen' 
                    onPress={() => navigation.navigate('AddItem')} />
            </View>
        </View>
    );
}