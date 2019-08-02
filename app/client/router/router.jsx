'use strict';

// React
import React from 'react'
// React router
import { Switch, Route } from 'react-router-dom';

// Containers
import ProductsList from './../containers/products_list/productsListContainer';
import ProductCard from './../containers/product_card/productCardContainer';
import Cart from './../containers/cart/cartContainer';

const Routes = () => {
    return(
        <Switch>
            <Route exact path='/' component={ProductsList} />
            <Route path='/product/:id' component={ProductCard} />
            <Route path='/cart' component={Cart} />
            {/*<Route path='/admin' component={Admin} />*/}
        </Switch>
    )
};

export default Routes
