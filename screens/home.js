import React, { useContext, useState, useLayoutEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { GlobalContext } from '../state/globalState';
import AddItemButton from '../components/addItemButton';
import AddItemModal from '../screens/addItemModal';
import CartTotal from '../components/cartTotal';
import EmptyCart from '../components/emptyCart';
import List from '../components/list';
import DropDownMenu from '../components/dropDownMenu';
import { globalStyles } from '../styles/globalStyles';

export default function Home({ navigation }) {
    const { cartItems } = useContext(GlobalContext);
    const [modalOpen, setModalOpen] = useState(false);

    const toggleModal = () => setModalOpen(!modalOpen);
    const showEditItemScreen = (currentItem) => navigation.navigate('Edit Item', currentItem);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity>
                    <DropDownMenu />
                </TouchableOpacity>
            )
        })
    })

    return (
        <View style={globalStyles.container}>
            { cartItems.length === 0? (
                <EmptyCart />
            ) : (
                <View style={globalStyles.container}>
                    <CartTotal />
                    <List showEditItemScreen={showEditItemScreen} />
                </View>
            )}
            <AddItemModal 
                modalOpen={modalOpen}
                toggleModal={toggleModal}
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
        borderRadius: 50,
        elevation: 5,
        position: 'absolute',
        right: 30,
        bottom: 30,
    }
});
