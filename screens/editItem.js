import React, { useContext, useLayoutEffect } from 'react';
import { GlobalContext } from '../state/globalState';
import { View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import InputItemScreen from '../components/inputItem';

export default function EditItem({ route, navigation }) {
    const { editItem, deleteItem } = useContext(GlobalContext);

    function submitEditedItem(editedItem) {
        editItem(editedItem);
        navigation.navigate('Home');
    }

    function deleteCurrentItem(key) {
        deleteItem(key);
        navigation.navigate('Home');
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => deleteCurrentItem(route.params.key)}>
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
                submitItem={submitEditedItem}
            />
        </View>
    );
}
