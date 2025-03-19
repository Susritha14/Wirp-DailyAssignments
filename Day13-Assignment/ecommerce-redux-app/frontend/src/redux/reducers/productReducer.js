import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    ADD_PRODUCT_REQUEST,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_FAILURE,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILURE,
  } from "../actions/productActions";
  
  // Initial state for product reducer.
  const initialState = {
    products: [],
    loading: false,
    error: null,
  };
  
  // Reducer handling products state based on action types.
  const productReducer = (state = initialState, action) => {
    switch (action.type) {
      // When fetching products, set loading to true.
      case FETCH_PRODUCTS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      // On success, update products list.
      case FETCH_PRODUCTS_SUCCESS:
        return {
          ...state,
          loading: false,
          products: action.payload,
        };
      // On failure, record error message.
      case FETCH_PRODUCTS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      // For adding a product, set loading true.
      case ADD_PRODUCT_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      // On add success, append new product.
      case ADD_PRODUCT_SUCCESS:
        return {
          ...state,
          loading: false,
          products: [...state.products, action.payload],
        };
      // On add failure, record error.
      case ADD_PRODUCT_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      // For deleting a product, set loading true.
      case DELETE_PRODUCT_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      // On delete success, filter out the deleted product.
      case DELETE_PRODUCT_SUCCESS:
        return {
          ...state,
          loading: false,
          products: state.products.filter(
            (product) => product.id !== action.payload
          ),
        };
      // On delete failure, record error.
      case DELETE_PRODUCT_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      // Return current state if action type does not match.
      default:
        return state;
    }
  };
  
  export default productReducer;
  