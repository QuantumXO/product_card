
import productsList from './../data/productsList.json';

const initialState = {
    productsList: productsList,
};

export default function productsListReducer(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}
