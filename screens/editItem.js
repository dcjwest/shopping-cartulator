import React, { useLayoutEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import InputItemScreen from '../components/inputItem';

export default function EditItem({ route, navigation }) {
    function submitItem(newItem) {
        navigation.navigate('Home', newItem);
    }

    function deleteItem(key) {
        navigation.navigate('Home', { deleteItemKey: key });
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => deleteItem(route.params.key)}>
                    <MaterialIcons
                        name='delete'
                        size={28}
                        color='#555'
                        style={{margin: 15}}
                    />
                </TouchableOpacity>
                
            )
        });
    });
    
    return (
        <View>
            <InputItemScreen 
                currentItem={route.params} 
                submitItem={submitItem}
            />
        </View>
    );
}
