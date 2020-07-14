import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import AddItemButton from '../components/addItemButton';
import AddItemModal from '../screens/addItemModal';
import CartTotal from '../components/cartTotal';
import EmptyCart from '../components/emptyCart';
import List from '../components/list';
import { globalStyles } from '../styles/globalStyles';

export default function Home({ route, navigation }) {
    const [cartItems, setCartItems] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        if (route.params) {
            if (route.params.hasOwnProperty('deleteItemKey')) deleteItem(route.params.deleteItemKey);

            if (route.params.hasOwnProperty('key')) {
                const newItem = { ...route.params };
                setCartItems(previousItems => previousItems.map(item => {
                    return item.key === newItem.key? newItem : item;
                }));
            }
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

    function submitNewItem(newItem) {
        setCartItems(previousItems => [ ...previousItems, newItem ]);
        toggleModal();
    }

    function deleteItem(key) {
        setCartItems(previousItems => previousItems.filter(item => {
            return item.key !== key;
        }));
    }

    return (
        <View style={globalStyles.container}>
            { cartItems.length === 0? (
                <EmptyCart />
            ) : (
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
                </View>
            )}
            <AddItemModal 
                modalOpen={modalOpen}
                toggleModal={toggleModal}
                submitItem={submitNewItem}
            />
            <View style={styles.addBtnContainer}>
                <AddItemButton toggleModal={toggleModal} />
            </View>
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
    }
});
