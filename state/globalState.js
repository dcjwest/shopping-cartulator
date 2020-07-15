import React, { useReducer, createContext } from 'react';
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
    const deleteItem = (key) => dispatch({ type: 'DELETE_ITEM', payload: key });

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

    return (
        <GlobalContext.Provider value={{
            cartItems: state.cartItems,
            submitItem,
            editItem,
            toggleCheckedItem,
            deleteItem,
            formatAmount
        }}>
            { children }
        </GlobalContext.Provider>
    );
}
