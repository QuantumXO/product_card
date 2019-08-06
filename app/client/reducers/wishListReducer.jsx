
import {HANDLE_WISH_LIST_STATE, REMOVE_ITEM_FROM_WISH_LIST} from "./../constants/actionTypes";

import productsList from './../data/productsList.json';

const wishListFromStorage = JSON.parse(localStorage.getItem('wishList')) || null;

function handleWishListState(wishList) {


    wishList = wishList || wishListFromStorage || [];

    const wishListArr = [];

    wishList.forEach(function (item) {

        const product = productsList.filter(product => product.id == item)[0];

        if(product){
            wishListArr.push(product);
        }

    });

    return wishListArr;
}

const handleWishListStateFunc = handleWishListState();

const initialState = {
    wishListIDsArr: wishListFromStorage || [],
    wishList: handleWishListStateFunc || [],
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

    handleWishListState(IDsArr);

    console.log('removeItem() -> newState: ', newState);

    localStorage.setItem('wishList', JSON.stringify(IDsArr));

    return newState;
}

function handleWishList(state, action) {

    const id = action.id;
    const existenceStatus = state.wishListIDsArr.indexOf(id);

    let newState;

    /*console.log('handleWishList() -> state.wishList: ', state.wishList);
    console.log('handleWishList() -> existenceStatus: ', existenceStatus);*/

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

    localStorage.setItem('wishList', JSON.stringify(newState.wishListIDsArr));

    return newState;
}
