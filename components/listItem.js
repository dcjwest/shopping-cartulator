import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { globalStyles } from '../styles/globalStyles';

export default function ListItem({ currentItem, formatAmount, showEditItemScreen, toggleCheckedItem }) {
    return (
        <TouchableOpacity onPress={() => showEditItemScreen(currentItem)}>
            <View style={styles.listItemContainer}>
                <View style={{ marginHorizontal: -5 }}>
                    <CheckBox 
                        containerStyle={{ padding: 0, margin: 0 }}
                        checkedColor='#1988DC'
                        size={24}
                        checked={currentItem.checked}
                        onPress={() => toggleCheckedItem(currentItem.key)}
                    />
                </View>
                <View style={styles.listItem}>
                    <View style={{ flex: 5 }}>
                        <Text style={globalStyles.textContent}>{currentItem.name}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={globalStyles.textContent}>{`x${currentItem.quantity}`}</Text>
                    </View>
                    <View style={{ flex: 3 }}>
                        <Text style={globalStyles.textContent}>{`@${formatAmount(currentItem.cost)}`}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    listItemContainer: {
        borderBottomColor: '#ddd',
        borderBottomWidth: 2,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20
    },
    listItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});
