import { combineReducers } from "redux";
import productReducer from "./productReducer";
import wishlistReducer from "./wishlistReducer";

/**
 * Root reducer combining product and wishlist reducers.
 */
const rootReducer = combineReducers({
  product: productReducer,
  wishlist: wishlistReducer
});

export default rootReducer;
