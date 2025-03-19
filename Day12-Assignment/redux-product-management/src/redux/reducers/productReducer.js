import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE
  } from '../actions/productActions';
  
  // Initial state for products
  const initialState = {
    loading: false,
    products: [],
    error: ""
  };
  
  /**
   * Reducer that manages product fetching state.
   */
  const productReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_PRODUCTS_REQUEST:
        return { ...state, loading: true };
  
      case FETCH_PRODUCTS_SUCCESS:
        return { loading: false, products: action.payload, error: "" };
  
      case FETCH_PRODUCTS_FAILURE:
        return { loading: false, products: [], error: action.payload };
  
      default:
        return state;
    }
  };
  
  export default productReducer;
  