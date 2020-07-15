import React, { useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';
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
            <View style={styles.inputField}>
                <Input 
                    label='Item'
                    value={itemName}
                    onChangeText={setItemName}
                />
            </View>
            <View style={styles.inputField}>
                <Input 
                    label='Cost'
                    keyboardType='numeric'
                    value={itemCost}
                    onChangeText={setItemCost}
                />
            </View>
            <View style={styles.inputField}>
                <Input 
                    label='Quantity'
                    keyboardType='numeric'
                    defaultValue='1'
                    value={itemQty}
                    onChangeText={setItemQty}
                />
            </View>
            <Button 
                color='#1988DC'
                title='Submit'
                onPress={handlePress}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingHorizontal: 18,
        paddingTop: 16
    },
    inputField: {
    },

})
