import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Modal } from 'react-native';
import CartTotal from '../components/cartTotal';
import List from '../components/list';
import InputItemScreen from '../components/inputItem';
import { MaterialIcons } from '@expo/vector-icons';
import { globalStyles } from '../styles/globalStyles';

export default function Home({ route, navigation }) {
    const [cartItems, setCartItems] = useState([
        // { key: '1', name: 'Bread', quantity: 1, cost: 12.5, checked: false },
        // { key: '2', name: 'Eggs', quantity: 6, cost: 27.99, checked: false },
        // { key: '3', name: 'Milk', quantity: 2, cost: 69, checked: false }
    ]);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        if (route.params) {
            const newItem = { ...route.params };
            console.log('Got new item!', newItem);

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
        <View style={styles.closeModalBtnContainer}>
            <MaterialIcons
                name='close'
                size={32} color='#333'
                onPress={toggleModal}
            />
        </View>
    );

    if (cartItems.length === 0) {
        return (
            <View style={globalStyles.container}>
                <Text>Your cart is empty...</Text>
                <Modal visible={modalOpen} animated>
                    <View>
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
    closeModalBtnContainer: {
        alignItems: 'flex-end',
        padding: 20
    }
});
