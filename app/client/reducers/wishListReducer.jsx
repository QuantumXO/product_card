
import {HANDLE_WISH_LIST_STATE, REMOVE_ITEM_FROM_WISH_LIST} from "./../constants/actionTypes";

import productsList from './../data/productsList.json';

const localStorageState = JSON.parse(localStorage.getItem('state')) || null;

let productsListDefault = productsList,
    wishListIDsFromStorage = [];

if(localStorageState){
    productsListDefault = localStorageState.productsListReducer.productsList;
    wishListIDsFromStorage = localStorageState.wishListReducer.wishListIDsArr;
}

function handleWishListState(props) {

    const wishList = props || wishListIDsFromStorage;

    const wishListArr = [];


    wishList.forEach(function (item) {

        const product = productsListDefault.filter(product => product.id == item)[0];

        if(product){
            wishListArr.push(product);
        }

        console.log('product: ', product);

    });



    return wishListArr;
}

const handleWishListStateFunc = handleWishListState();

const initialState = {
    wishList: handleWishListStateFunc || [],
    wishListIDsArr: wishListIDsFromStorage || [],
};

export default function wishListReducer(state = initialState, action) {


    switch (action.type){

        case HANDLE_WISH_LIST_STATE:

            return handleWishList(state, action);

        case REMOVE_ITEM_FROM_WISH_LIST:

            return removeItem(state, action);

        default:
            return state;
    }
}

function removeItem(state, action) {

    const newState = {
        ...state,
        wishList: [...state.wishList.filter(item => item.id != action.id)]
    };

    const IDsArr = newState.wishList.map(item => item.id);

    newState.wishListIDsArr = IDsArr;

    return newState;
}

function handleWishList(state, action) {

    const id = action.id;
    const existenceStatus = state.wishListIDsArr.indexOf(id);

    let newState;

    if(existenceStatus != -1){

        console.log('EXIST: ', state.wishListIDsArr);

        newState = {
            ...state,
            wishListIDsArr: [...state.wishListIDsArr.filter(item => item !== id)],
        };

    }else {

        console.log('NOT exist: ', state.wishListIDsArr);

        newState = {
            ...state,
            wishListIDsArr: [...state.wishListIDsArr, id]
        };
    }

    newState.wishList = handleWishListState(newState.wishListIDsArr);

    console.log('handleWishList() -> newState.wishList: ', newState.wishList);

    return newState;
}
