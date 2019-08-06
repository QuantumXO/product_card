'use strict';

import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router';

import defaultReducer from './defaultReducer';
import productsListReducer from './productsListReducer';
import productCardReducer from './productCardReducer';
import cartReducer from './cartReducer';
import wishListReducer from './wishListReducer';

export default (history) => combineReducers({
    defaultReducer,
    productCardReducer,
    productsListReducer,
    cartReducer,
    wishListReducer,
    router: connectRouter(history),
});
