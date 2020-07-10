import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import ListItem from './listItem';
import { globalStyles } from '../styles/globalStyles';

export default function List({ cartItems, formatAmount, showEditItemScreen, toggleCheckedItem }) {
    return (
        <View style={globalStyles.container}>
            <FlatList 
                data={cartItems}
                renderItem={({ item }) => (
                    <ListItem 
                        currentItem={item}
                        formatAmount={formatAmount}
                        showEditItemScreen={showEditItemScreen}
                        toggleCheckedItem={toggleCheckedItem}
                     />)}
                style={styles.listContainer}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    listContainer: {
        width: '100%'
    }
});
