import React, { useContext } from 'react';
import { GlobalContext } from '../state/globalState';
import { View, FlatList } from 'react-native';
import ListItem from './listItem';
import { globalStyles } from '../styles/globalStyles';

export default function List({ showEditItemScreen }) {
    const { cartItems } = useContext(GlobalContext);

    return (
        <View style={globalStyles.container}>
            <FlatList 
                style={{ width: '100%' }}
                data={cartItems}
                renderItem={({ item }) => (
                    <ListItem 
                        currentItem={item}
                        showEditItemScreen={showEditItemScreen}
                     />
                )}
            />
        </View>
    );
}
