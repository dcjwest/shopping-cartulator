import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Directions } from 'react-native-gesture-handler';

export default function Header() {
    return (
        <View style={styles.header}>
            <View style={styles.headerLogo}>
                <MaterialIcons name="shopping-cart" size={32} color="#fff" />
                <View style={styles.headerTitle}>
                    <Text style={styles.headerText}>Shopping</Text>
                    <Text style={{ ...styles.headerText, color: '#fff', fontSize: 18, marginTop: -10 }}>Cartulator</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerLogo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        justifyContent: 'center'
    },
    headerText: {
        color: '#c0c0c0',
        fontWeight: 'bold',
        letterSpacing: 1,
    }
});