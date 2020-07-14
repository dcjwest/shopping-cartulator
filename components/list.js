import React from 'react';
import { View, FlatList } from 'react-native';
import ListItem from './listItem';
import { globalStyles } from '../styles/globalStyles';

export default function List({ cartItems, formatAmount, showEditItemScreen, toggleCheckedItem }) {
    return (
        <View style={globalStyles.container}>
            <FlatList 
                style={{ width: '100%' }}
                data={cartItems}
                renderItem={({ item }) => (
                    <ListItem 
                        currentItem={item}
                        formatAmount={formatAmount}
                        showEditItemScreen={showEditItemScreen}
                        toggleCheckedItem={toggleCheckedItem}
                     />
                )}
            />
        </View>
    );
}
