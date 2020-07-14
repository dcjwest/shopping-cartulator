import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function AddItemButton({ toggleModal }) {
    return (
        <TouchableOpacity activeOpacity={0.5} onPress={toggleModal}>
            <MaterialIcons
                name='add-circle'
                size={60}
                color='#1988DC'
                style={{margin: -6}}
            />
        </TouchableOpacity>
    );
}
