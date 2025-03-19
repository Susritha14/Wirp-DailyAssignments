import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

import { composeWithDevTools } from 'redux-devtools-extension';

/**
 * Creates the Redux store with rootReducer and applies thunk middleware.
 */
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
