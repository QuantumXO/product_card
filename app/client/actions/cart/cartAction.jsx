'use strict';

import {ADD_TO_CART, REMOVE_FROM_CART, HANDLE_QUANTITY} from './../../constants/actionTypes';

export function addToCart(id, count = 1, history) {
    return {
        type: ADD_TO_CART,
        id, count, history
    }
}

export function removeFromCart(id) {
    return {
        type: REMOVE_FROM_CART,
        id
    }
}

export function handleQuantity(id, count) {
    return {
        type: HANDLE_QUANTITY,
        id, count
    }
}

