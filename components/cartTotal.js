import React, { useContext } from 'react';
import { GlobalContext } from '../state/globalState';
import { StyleSheet, View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function CartTotal() {
    const { cartItems, formatAmount } = useContext(GlobalContext);
    
    function calculateTotal() {
        let currentTotal = cartItems .filter(item => item.checked).reduce((prev, curr) => {
            return prev + curr.quantity * curr.cost;
        }, 0);

        return formatAmount(Math.round(currentTotal * 100) / 100);
    }

    return (
        <View style={styles.totalContainer}>
            <View  style={styles.totalTitleContainer}>
                <FontAwesome name="calculator" size={20} color="#fff" />
                <Text style={styles.totalTitle}>Total</Text>
            </View>
            <Text style={styles.totalText}>{calculateTotal()}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    totalContainer: {
        backgroundColor: '#1988DC',
        borderRadius: 25,
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 24,
        paddingVertical: 20,
        width: 160,
        height: 150
    },
    totalTitleContainer: {
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderBottomColor: '#fff',
        alignItems: 'center',
    },
    totalTitle: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        letterSpacing: 1,
        marginLeft: 5
    },
    totalText: {
        color: '#fff',
        fontSize: 25,
        fontWeight: 'bold'
    }
});
