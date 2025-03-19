import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import productReducer from "./reducers/productReducer";
import productMiddleware from "./middleware/productMiddleware";

// Combine reducers (in case of multiple reducers in the future).
const rootReducer = combineReducers({
  product: productReducer,
});

// Create Redux store with thunk and custom product middleware.
const store = createStore(rootReducer, applyMiddleware(thunk, productMiddleware));

export default store;
