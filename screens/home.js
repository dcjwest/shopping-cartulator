import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Modal, Image } from 'react-native';
import CartTotal from '../components/cartTotal';
import List from '../components/list';
import InputItemScreen from '../components/inputItem';
import { MaterialIcons } from '@expo/vector-icons';
import { globalStyles } from '../styles/globalStyles';

export default function Home({ route, navigation }) {
    const [cartItems, setCartItems] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        if (route.params) {
            const newItem = { ...route.params };

            setCartItems(previousItems => previousItems.map(item => {
                return item.key === newItem.key? newItem : item;
            }));
        }
    }, [route.params])

    function toggleCheckedItem(key) {
        setCartItems(previousItems => previousItems.map(item => {
            return item.key === key? { ...item, checked: !item.checked } : item;
        }));
    }

    function showEditItemScreen(currentItem) {
        navigation.navigate('Edit Item', currentItem);
    }

    function formatAmount(amount) {
        if (amount === 0) return 'R0.00';

        let formattedAmount = amount.toString();

        if (formattedAmount.indexOf('.') !== -1) {
            let wholeNum = formattedAmount.split('.')[0];
            let fraction = formattedAmount.split('.')[1];

            if (fraction.length === 1) fraction += '0';

            formattedAmount = `${wholeNum}.${fraction}`;
        }
        else formattedAmount += '.00';

        return `R${formattedAmount}`;
    }

    function toggleModal() {
        setModalOpen(!modalOpen);
    }

    function addNewItem(newItem) {
        setCartItems(previousItems => [ ...previousItems, newItem ]);
        toggleModal();
    }

    const addItemBtn = (
        <View style={styles.addBtnContainer}>
            <MaterialIcons
                name='add-circle'
                size={60}
                color='#1988DC'
                style={{margin: -6}}
                onPress={() => setModalOpen(true)}
            />
        </View>
    );

    const closeModalBtn = (
        <MaterialIcons
                name='close'
                color='#333'
                size={32}
                onPress={toggleModal}
                style={styles.closeModalBtn}
        />
    );

    if (cartItems.length === 0) {
        return (
            <View style={globalStyles.container}>
                <Image source={require('../assets/shopping_cart.png')} style={{width: 128, height: 128}} />
                <Text style={styles.emptyCartHeading}>Your cart is empty...</Text>
                <Text style={styles.emptyCartText}>Tap the + button to create your shopping list.</Text>
                <Modal visible={modalOpen} animated>
                    <View>
                        <Text  style={{ ...globalStyles.textTitle, ...styles.modalTitle }}>Add Item</Text>
                        {closeModalBtn}
                        <InputItemScreen submitItem={addNewItem} />
                    </View>
                </Modal>
                {addItemBtn}
            </View>
        );
    }
    else return (
        <View style={globalStyles.container}>
            <CartTotal 
                cartItems={cartItems}
                formatAmount={formatAmount}
            />
            <List 
                cartItems={cartItems} 
                formatAmount={formatAmount}
                showEditItemScreen={showEditItemScreen}
                toggleCheckedItem={toggleCheckedItem}
            />
            <Modal visible={modalOpen} animated>
                <View>
                    <Text  style={{ ...globalStyles.textTitle, ...styles.modalTitle }}>Add Item</Text>
                    {closeModalBtn}
                    <InputItemScreen submitItem={addNewItem} />
                </View>
            </Modal>
            {addItemBtn}
        </View>
    );
}

const styles = StyleSheet.create({
    addBtnContainer: {
        backgroundColor: '#fff',
        borderRadius: 100,
        elevation: 5,
        alignItems: 'flex-end',
        position: 'absolute',
        right: 30,
        bottom: 30,
    },
    emptyCartHeading: {
        color: '#555',
        marginTop: 20
    },
    emptyCartText: {
        color: '#888',
        fontSize: 12,
        marginTop: 5
    },
    modalTitle: {
        borderBottomColor: '#555',
        color: '#555',
        margin: 30,
    },
    closeModalBtn: {
        position: 'absolute',
        top: 8,
        right: 16,
        zIndex: 1
    },
});
