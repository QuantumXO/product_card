'use strict';

import {ADD_TO_CART, REMOVE_FROM_CART, HANDLE_QUANTITY} from "./../constants/actionTypes";

import productsList from './../data/productsList.json';

const inCartList = JSON.parse(localStorage.getItem('inCartList')) || [];

function handleCartState(cartList) {

    cartList = cartList || inCartList;

    const cartProductsList = [];

    cartList.forEach(function (item) {

        const product  = productsList.filter(product => product.id == item.productId)[0];

        product.quantity = item.quantity;

        if(product){
            cartProductsList.push(product);
        }

    });

    return cartProductsList;
}

const handleCartStateFunc = handleCartState();


const initialState = {
    productsList: productsList,
    inCartList: inCartList || [],
    cartProductsList: handleCartStateFunc || [],
};

export default function cartReducer(state = initialState, action) {
    switch (action.type) {

        case ADD_TO_CART:

            return addToCart(state, action);

        case REMOVE_FROM_CART:

            return removeFromCart(state, action);

        case HANDLE_QUANTITY:

            return handleQuantity(state, action);

        default:

            return state;
    }
}

function addToCart(state, action) {
    const actionId = action.id;
    const actionCount = action.count;
    const cartProductsList = [];
    const existenceStatus = state.inCartList.map(item => item.productId).indexOf(actionId);

    let newState;


    newState = {
        ...state,
        inCartList: [...state.inCartList, {productId: actionId, quantity: actionCount}]
    };

    if(existenceStatus != -1){

        newState = {
            ...state,
            inCartList: [...state.inCartList.filter(item => item.productId !== actionId), {productId: actionId, quantity: actionCount}],
        };

    }else {

        newState = {
            ...state,
            inCartList: [...state.inCartList, {productId: actionId, quantity: actionCount}]
        };
    }

    newState.cartProductsList = handleCartState(newState.inCartList);

    localStorage.setItem('inCartList', JSON.stringify(newState.inCartList));

    action.history.push('/cart');

    return newState;
}

function removeFromCart(state, action){

    let newState = {
        ...state,
        inCartList: state.inCartList.filter(item => item.productId != action.id)
    };

    newState.cartProductsList = handleCartState(newState.inCartList);

    localStorage.setItem('inCartList', JSON.stringify(newState.inCartList));

    return newState;
}


function handleQuantity(state, action){

    let newState = {...state};

    newState.inCartList.filter(item => item.productId == action.id)[0].quantity = action.count;

    newState.cartProductsList = handleCartState(newState.inCartList);

    console.log('handleQuantity() -> newState: ',  newState);

    localStorage.setItem('inCartList', JSON.stringify(newState.inCartList));

    return newState;
}


