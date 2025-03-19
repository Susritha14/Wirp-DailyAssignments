import axios from 'axios';

// Action types for fetching products
export const FETCH_PRODUCTS_REQUEST = "FETCH_PRODUCTS_REQUEST";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE";

// Action types for wishlist management
export const ADD_TO_WISHLIST = "ADD_TO_WISHLIST";
export const REMOVE_FROM_WISHLIST = "REMOVE_FROM_WISHLIST";

/**
 * Async action creator using Redux Thunk to fetch products from the API.
 */
export const fetchProducts = () => {
  return async (dispatch) => {
    // Dispatch request start action
    dispatch({ type: FETCH_PRODUCTS_REQUEST });
    try {
      // Fetch products from fake API
      const response = await axios.get("https://fakestoreapi.com/products");
      // Dispatch success action with product data on successful fetch
      dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: response.data });
    } catch (error) {
      // Dispatch failure action with error message on failure
      dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: error.message });
    }
  };
};

/**
 * Action creator to add a product to the wishlist.
 * @param {Object} product - The product object to add.
 */
export const addToWishlist = (product) => {
  return {
    type: ADD_TO_WISHLIST,
    payload: product
  };
};

/**
 * Action creator to remove a product from the wishlist.
 * @param {number} productId - The id of the product to remove.
 */
export const removeFromWishlist = (productId) => {
  return {
    type: REMOVE_FROM_WISHLIST,
    payload: productId
  };
};
