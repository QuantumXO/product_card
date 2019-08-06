'use strict';

import {GET_PRODUCT_DATA, HANDLE_WISH_LIST_STATE} from './../../constants/actionTypes';

export function getProductData(id) {
    return {
        type: GET_PRODUCT_DATA,
        id
    }
}





