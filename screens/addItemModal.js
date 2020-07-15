import React, { useContext } from 'react';
import { GlobalContext } from '../state/globalState';
import { StyleSheet, View, Text, Modal } from 'react-native';
import InputItemScreen from '../components/inputItem';
import { MaterialIcons } from '@expo/vector-icons';
import { globalStyles } from '../styles/globalStyles';

export default function AddItemModal({ modalOpen, toggleModal }) {
    const { submitItem } = useContext(GlobalContext);

    function submitModalItem(newItem) {
        submitItem(newItem);
        toggleModal();
    }

    return (
        <Modal visible={modalOpen} animated>
                <View>
                    <Text style={{ ...globalStyles.textTitle, ...styles.modalTitle }}>Add an item</Text>
                    <MaterialIcons
                        name='close'
                        color='#333'
                        size={32}
                        onPress={toggleModal}
                        style={styles.closeModalBtn}
                    />
                    <InputItemScreen submitItem={submitModalItem} />
                </View>
            </Modal>
    );
}

const styles = StyleSheet.create({
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
    }
});
