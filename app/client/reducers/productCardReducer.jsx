
import {GET_PRODUCT_DATA, HANDLE_WISH_LIST_STATE} from "./../constants/actionTypes";

import productsList from './../data/productsList.json';

const wishList = JSON.parse(localStorage.getItem('wishList')) || null;

const initialState = {
    productsList: productsList,
    productData: null,
    wishList: wishList || [],
};

export default function productCardReducer(state = initialState, action) {
    switch (action.type) {

        case GET_PRODUCT_DATA:

            return getProductData(state, action);

        case HANDLE_WISH_LIST_STATE:

            return handleWishListState(state, action);

        default:

            return state;
    }
}

function getProductData(state, action) {
    const productData = state.productsList.filter(item => item.id == action.id)[0];

    return {...state, productData: productData};
}

function handleWishListState(state, action) {

    const id = action.id;
    const existenceStatus = state.wishList.indexOf(id);

    let newState;

    if(existenceStatus != -1){

        newState = {
            ...state,
            wishList: [...state.wishList.filter(item => item !== id)],
        };

    }else {

        newState = {
            ...state,
            wishList: [...state.wishList, id]
        };
    }

    localStorage.setItem('wishList', JSON.stringify(newState.wishList));

    return newState;
}
