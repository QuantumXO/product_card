
import {GET_PRODUCT_DATA, HANDLE_WISH_LIST_STATE} from "./../constants/actionTypes";

import productsList from './../data/productsList.json';

const initialState = {
    productsList: productsList,
    productData: null,
};

export default function productCardReducer(state = initialState, action) {
    switch (action.type) {

        case GET_PRODUCT_DATA:

            return getProductData(state, action);

        default:

            return state;
    }
}

function getProductData(state, action) {
    const productData = state.productsList.filter(item => item.id == action.id)[0];

    return {...state, productData: productData};
}

