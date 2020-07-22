import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Input } from 'react-native-elements';

export default function InputItem({ currentItem = {key:'', name:'', cost:'', quantity:'', checked:false}, submitItem }) {
    const [itemName, setItemName] = useState(currentItem.name.toString());
    const [itemCost, setItemCost] = useState(currentItem.cost.toString());
    const [itemQty, setItemQty] = useState(currentItem.quantity.toString());

    function handlePress() {
        if (!itemName || !itemCost) return;

        let itemKey = currentItem.key;
        if (!itemKey) itemKey = Math.floor(Math.random() * (10000 - 1) + 1);

        let formattedCost = (
            Math.round(
                Math.abs(
                    parseFloat(
                        itemCost.replace(',', '.')
                    )
                ) * 100
            ) / 100
        );

        submitItem({
            key: itemKey.toString(),
            name: itemName,
            cost: formattedCost,
            quantity: itemQty? Math.abs(parseInt(itemQty)) : 1,
            checked: currentItem.checked
        });
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Name</Text>
                <Input 
                    containerStyle={styles.inputField}
                    value={itemName}
                    onChangeText={setItemName}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Cost</Text>
                <Input 
                    containerStyle={styles.inputField}
                    keyboardType='numeric'
                    value={itemCost}
                    onChangeText={setItemCost}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Qty</Text>
                <Input 
                    containerStyle={styles.inputField}
                    keyboardType='numeric'
                    defaultValue='1'
                    value={itemQty}
                    onChangeText={setItemQty}
                />
            </View>
            <View style={{marginTop: 20}}>
                <Button 
                    color='#1988DC'
                    title='Submit'
                    onPress={handlePress}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingHorizontal: 18,
        paddingTop: 20
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 8
    },
    inputLabel: {
        color: '#888',
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
        marginTop: 5,
    },
    inputField: {
        maxWidth: '75%'
    }
});
