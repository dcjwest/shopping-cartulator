import React, { useReducer, createContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import Reducer from './reducer';

const initialState = {
    cartItems: []
};

export const GlobalContext = createContext(initialState);

export function GlobalProvider({ children }) {
    const [state, dispatch] = useReducer(Reducer, initialState);

    // Actions
    const submitItem = (newItem) => dispatch({ type: 'SUBMIT_ITEM', payload: newItem });
    const editItem = (editedItem) => dispatch({ type: 'EDIT_ITEM', payload: editedItem });
    const toggleCheckedItem = (key) => dispatch({ type: 'TOGGLE_CHECKED_ITEM', payload: key });
    const toggleCheckedAll = (allSelected) => dispatch({ type: 'TOGGLE_CHECKED_ALL', payload: allSelected });
    const deleteItem = (key) => dispatch({ type: 'DELETE_ITEM', payload: key });
    const deleteAll = () => dispatch({ type: 'DELETE_ALL' });

    const setShoppingList = async (listItems) => {
        let saveSuccess = false;

        try {
          const jsonValue = JSON.stringify(listItems);
          await AsyncStorage.setItem('my-shopping-list', jsonValue);
          saveSuccess = true;
        } catch (err) {
          console.log(err);
        }
        
        dispatch({ type: 'SET_SHOPPING_LIST' });
        return saveSuccess;
    }

    const getShoppingList = async () => {
        let shoppingList, loadSuccess = false;
        try {
            const jsonValue = await AsyncStorage.getItem('my-shopping-list');

            if (jsonValue != null) {
                shoppingList = JSON.parse(jsonValue);
                loadSuccess = true;
            } else {
                shoppingList = [];
                loadSuccess = undefined;
            }
        } catch(err) {
            console.log(err);
            shoppingList = [];
        }

        dispatch({ type: 'GET_SHOPPING_LIST', payload: shoppingList });
        return loadSuccess;
    }
    
    const formatAmount = amount => {
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

    return (
        <GlobalContext.Provider value={{
            cartItems: state.cartItems,
            submitItem,
            editItem,
            toggleCheckedItem,
            toggleCheckedAll,
            deleteItem,
            deleteAll,
            formatAmount,
            setShoppingList,
            getShoppingList
        }}>
            { children }
        </GlobalContext.Provider>
    );
}
