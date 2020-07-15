export default function Reducer(state, action) {
    switch(action.type) {
        case 'SUBMIT_ITEM':
            return {
                ...state,
                cartItems: [ ...state.cartItems, action.payload ]
            };
        case 'EDIT_ITEM':
            let editedItem = action.payload;
            return {
                ...state,
                cartItems: state.cartItems.map(item => {
                    return item.key === editedItem.key? editedItem : item
                })
            };
        case 'TOGGLE_CHECKED_ITEM':
            let toggledItemKey = action.payload;
            return {
                ...state,
                cartItems: state.cartItems.map(item => {
                    return item.key === toggledItemKey? { ...item, checked: !item.checked } : item;
                })
            };
        case 'DELETE_ITEM':
            let itemToDeleteKey = action.payload;
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.key !== itemToDeleteKey)
            };
        default:
            return state;
    }
}