import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

export default function EmptyCart() {
    return (
        <View style={globalStyles.container}>
            <Image source={require('../assets/shopping_cart.png')} style={{width: 128, height: 128}} />
            <Text style={styles.emptyCartHeading}>Your cart is empty...</Text>
            <Text style={styles.emptyCartText}>Tap the + button to create your shopping list.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    emptyCartHeading: {
        color: '#555',
        marginTop: 20
    },
    emptyCartText: {
        color: '#888',
        fontSize: 12,
        marginTop: 5
    },
});
