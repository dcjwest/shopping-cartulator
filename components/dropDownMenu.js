import React, { useContext, useState, useRef } from 'react'; 
import { StyleSheet, View, Text, Alert } from 'react-native';
import { GlobalContext } from '../state/globalState';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { SimpleLineIcons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function dropDownMenu() {
    const { cartItems, deleteAll, toggleCheckedAll } = useContext(GlobalContext);
    const [autoSelectAll, setAutoSelectAll] = useState(false);
    const menuRef = useRef();

    function deleteAllItems() {
        Alert.alert(
            'Delete all cart items?',
            '',
            [
                {
                    text: 'Cancel',
                    onPress: () => menuRef.current.hide()
                },
                {
                    text: 'Okay',
                    onPress: () => {
                        deleteAll();
                        setAutoSelectAll(false);
                        menuRef.current.hide();
                    }
                }
            ]
        )
    }

    function toggleSelectAllItems() {
        let toggle = !autoSelectAll;
        toggleCheckedAll(toggle);
        menuRef.current.hide();
        setAutoSelectAll(toggle);
    }

    function userSelectAll() {
       if (cartItems.length > 0 && cartItems.filter(item => item.checked).length === cartItems.length) {
        setAutoSelectAll(true);
        return true;
       }

       return false;
    }
    
    return (
        <View>
            <Menu
                ref={menuRef}
                style={{minWidth: 100}}
                button={(
                    <SimpleLineIcons 
                        name="options-vertical" 
                        size={24} color="#fff" 
                        style={{marginRight: 15}}
                        onPress={() => menuRef.current.show()}
                    />
                )}
            >
                <MenuItem 
                    onPress={toggleSelectAllItems}
                    style={{ alignItems: 'center' }}
                    disabled={cartItems.length === 0}>
                    { autoSelectAll || userSelectAll()? (
                        <>
                            <Text>Deselect All </Text>
                            <MaterialCommunityIcons 
                                name='checkbox-multiple-marked' 
                                size={16} 
                                color='#555' 
                                style={{paddingRight: 10}}
                            />
                        </>
                    ) : (
                        <>
                            <Text>Select All </Text>
                            <MaterialCommunityIcons 
                                name='checkbox-multiple-marked-outline' 
                                size={16} 
                                color='#555' 
                                style={{paddingRight: 10}}
                            />
                        </>
                    )}
                </MenuItem>
                <MenuDivider />
                <MenuItem 
                onPress={deleteAllItems}
                style={{ alignItems: 'center' }}
                disabled={cartItems.length === 0}>
                    <Text>Empty Cart </Text>
                    <MaterialIcons 
                        name='remove-shopping-cart' 
                        size={16} 
                        color='black' 
                        style={{paddingRight: 10}}
                    />
                </MenuItem>
            </Menu>
        </View>
    );
}
