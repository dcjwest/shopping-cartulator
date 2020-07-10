import React from 'react';
import { View, Text } from 'react-native';
import InputItemScreen from '../components/inputItem';

export default function EditItem({ route, navigation }) {
    function submitItem(newItem) {
        navigation.navigate('Home', newItem);
    }
    
    return (
        <View>
            <InputItemScreen 
                currentItem={route.params} 
                submitItem={submitItem}
            />
        </View>
    );
}
