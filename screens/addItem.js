import React from 'react';
import { View, Text } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

export default function AddItem() {
    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.textTitle}>Add Item Screen</Text>
        </View>
    );
}
