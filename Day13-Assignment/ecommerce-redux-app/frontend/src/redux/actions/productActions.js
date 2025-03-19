// Action types for product operations.
export const FETCH_PRODUCTS_REQUEST = "FETCH_PRODUCTS_REQUEST";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE";

export const ADD_PRODUCT_REQUEST = "ADD_PRODUCT_REQUEST";
export const ADD_PRODUCT_SUCCESS = "ADD_PRODUCT_SUCCESS";
export const ADD_PRODUCT_FAILURE = "ADD_PRODUCT_FAILURE";

export const DELETE_PRODUCT_REQUEST = "DELETE_PRODUCT_REQUEST";
export const DELETE_PRODUCT_SUCCESS = "DELETE_PRODUCT_SUCCESS";
export const DELETE_PRODUCT_FAILURE = "DELETE_PRODUCT_FAILURE";

// Base URL for the API
const API_URL = "http://localhost:5161/api/products";

// Action creator: Fetch products from API using redux-thunk.
export const fetchProducts = () => {
  return async (dispatch) => {
    // Dispatch request action.
    dispatch({ type: FETCH_PRODUCTS_REQUEST });

    try {
      // Call the API to get products list.
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch products.");
      }
      // Parse JSON data.
      const data = await response.json();
      // Dispatch success action with data.
      dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
      // Dispatch failure action with error message.
      dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: error.message });
    }
  };
};

// Action creator: Add a new product by posting to the API.
export const addProduct = (product) => {
  return async (dispatch) => {
    // Dispatch request action.
    dispatch({ type: ADD_PRODUCT_REQUEST });
    try {
      // Call the API to add a new product.
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error("Failed to add product.");
      }

      // Get the created product from response.
      const data = await response.json();
      // Dispatch success action.
      dispatch({ type: ADD_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
      // Dispatch failure action with error message.
      dispatch({ type: ADD_PRODUCT_FAILURE, payload: error.message });
    }
  };
};

// Action creator: Delete a product by sending DELETE request to API.
export const deleteProduct = (id) => {
  return async (dispatch) => {
    // Dispatch request action.
    dispatch({ type: DELETE_PRODUCT_REQUEST });
    try {
      // Call the API to delete the product.
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete product.");
      }

      // Dispatch success action with id.
      dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: id });
    } catch (error) {
      // Dispatch failure action with error message.
      dispatch({ type: DELETE_PRODUCT_FAILURE, payload: error.message });
    }
  };
};
