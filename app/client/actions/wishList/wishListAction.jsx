
import {HANDLE_WISH_LIST_STATE, REMOVE_ITEM_FROM_WISH_LIST} from "./../../constants/actionTypes";


export function handleWishList(id) {
    return {
        type: HANDLE_WISH_LIST_STATE,
        id
    }
}

export function removeItem(id) {
    return {
        type: REMOVE_ITEM_FROM_WISH_LIST,
        id
    }
}
