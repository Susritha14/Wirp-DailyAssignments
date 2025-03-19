import {
    ADD_TO_WISHLIST,
    REMOVE_FROM_WISHLIST
  } from '../actions/productActions';
  
  // Initial wishlist state is an empty array
  const wishlistReducer = (state = [], action) => {
    switch (action.type) {
      case ADD_TO_WISHLIST:
        // Prevent duplicates by checking if product already exists
        if (state.find(product => product.id === action.payload.id)) {
          return state;
        }
        return [...state, action.payload];
  
      case REMOVE_FROM_WISHLIST:
        // Filter out the product to be removed
        return state.filter(product => product.id !== action.payload);
  
      default:
        return state;
    }
  };
  
  export default wishlistReducer;
  