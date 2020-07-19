import React, { useContext, useState, useRef } from 'react'; 
import { View, Text, Alert } from 'react-native';
import { GlobalContext } from '../state/globalState';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { SimpleLineIcons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { showMessage } from 'react-native-flash-message';

export default function dropDownMenu() {
    const { cartItems, deleteAll, toggleCheckedAll, setShoppingList, getShoppingList } = useContext(GlobalContext);
    const [autoSelectAll, setAutoSelectAll] = useState(false);
    const menuRef = useRef();

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

    function deleteAllItems() {
        Alert.alert(
            'Empty Cart?',
            'This will remove all items from the cart.',
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

    async function saveList() {
        let result = await setShoppingList(cartItems);
        showMessage({
            type: 'info',
            backgroundColor: '#1988DC',
            color: '#fff',
            style: {textAlign:'center'},
            message: result? 'List saved successfully!' : 'Error saving list.'
        });
        menuRef.current.hide();
    }

    async function loadList() {
        let result = await getShoppingList();
        showMessage({
            type: 'info',
            backgroundColor: '#1988DC',
            color: '#fff',
            style: {textAlign:'center'},
            message: result? 'List loaded successfully!'
                            : result === undefined? 'No lists stored.' : 'Error loading list.'
        });
        menuRef.current.hide();
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
                onPress={loadList}>
                    <MaterialCommunityIcons 
                        name='upload' 
                        size={16} 
                        color='#555'
                    />
                    <Text>  Load List</Text>
                </MenuItem>
                <MenuItem 
                onPress={saveList}
                disabled={cartItems.length === 0}>
                    <MaterialIcons 
                        name='save' 
                        size={16} 
                        color='#555'
                    />
                    <Text>  Save List</Text>
                </MenuItem>
                <MenuDivider />
                <MenuItem 
                    onPress={toggleSelectAllItems}
                    disabled={cartItems.length === 0}>
                    { autoSelectAll || userSelectAll()? (
                        <>
                            <MaterialCommunityIcons 
                                name='checkbox-multiple-marked' 
                                size={16} 
                                color='#555'
                            />
                            <Text>  Deselect All</Text>
                            
                        </>
                    ) : (
                        <>
                            <MaterialCommunityIcons 
                                name='checkbox-multiple-marked-outline' 
                                size={16} 
                                color='#555'
                            />
                            <Text>  Select All</Text>
                            
                        </>
                    )}
                </MenuItem>
                <MenuDivider />
                <MenuItem 
                onPress={deleteAllItems}
                disabled={cartItems.length === 0}>
                    <MaterialIcons 
                        name='remove-shopping-cart' 
                        size={16} 
                        color='#555'
                    />
                    <Text>  Empty Cart</Text>
                </MenuItem>
            </Menu>
        </View>
    );
}
