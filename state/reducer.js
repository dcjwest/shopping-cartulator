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
        case 'TOGGLE_CHECKED_ALL':
            let toggle = action.payload;
            return {
                ...state,
                cartItems: state.cartItems.map(item => {
                    return { ...item, checked: toggle }
                })
            };
        case 'DELETE_ITEM':
            let itemToDeleteKey = action.payload;
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.key !== itemToDeleteKey)
            };
        case 'DELETE_ALL':
            return { ...state, cartItems: [] };
        case 'SET_SHOPPING_LIST':
            return state;
        case 'GET_SHOPPING_LIST':
            return {
                ...state,
                cartItems: [...action.payload]
            };
        default:
            return state;
    }
}