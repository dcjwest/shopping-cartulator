import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function CartTotal({ cartItems, formatAmount }) {
    function calculateTotal() {
        let currentTotal = cartItems .filter(item => item.checked).reduce((prev, curr) => {
            return prev + curr.quantity * curr.cost;
        }, 0);

        return formatAmount(Math.round(currentTotal * 100) / 100);
    }

    return (
        <View style={styles.cartTotalContainer}>
            <Text style={styles.cartTotalText}>Cart Total: </Text>
            <Text style={styles.cartTotalText}>{calculateTotal()}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    cartTotalContainer: {
        flexDirection: 'row',
        marginVertical: 24
    },
    cartTotalText: {
        fontSize: 24,
        fontWeight: 'bold'
    }
});
