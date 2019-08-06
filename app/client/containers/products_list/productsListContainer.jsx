'use strict';

import './_productsList.sass';

// React
import React, {Component} from 'react';
import {Helmet} from "react-helmet";

import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Currency from './../../components/default/currency';
import RatingStars from '../../components/default/rating/ratingStars';
import LinkWrap from './../../components/default/LinkWrap';
import * as cartAction from "../../actions/cart/cartAction";

import Breadcrumbs from './../../components/default/breadcrumbs/breadcrumbs';

const bucket =
    (
        <svg viewBox="0 0 40 40" width="60">
            <path d="M0.5 4.5C0.5 3.67157 1.17157 3 2 3H5.4264C7.29819 3 8.97453 4.15869 9.63602 5.9097L10.4264 8.00178C10.4503 8.00062 10.4745 8.00002 10.4987 8L34.0093 7.98001C37.2162 7.97728 39.3967 11.2342 38.1722 14.1982L34.3031 23.5639C33.8485 24.6643 32.8658 25.4581 31.6944 25.6711L18.7279 28.0286C16.5907 28.4172 14.481 27.2236 13.7133 25.1915L6.8296 6.9699C6.60911 6.38623 6.05033 6 5.4264 6H2C1.17157 6 0.5 5.32843 0.5 4.5ZM11.5587 10.9991L16.5197 24.1313C16.7756 24.8087 17.4789 25.2065 18.1913 25.077L31.1577 22.7195C31.3251 22.689 31.4655 22.5756 31.5304 22.4184L35.3995 13.0527C35.8077 12.0648 35.0809 10.9791 34.0119 10.98L11.5587 10.9991Z" />
            <circle cx="13.5" cy="34" r="3" />
            <circle cx="31.5" cy="34" r="3" />
        </svg>
    );

class ProductsList extends Component{
    constructor(){
        super();

        this.addToCart = this.addToCart.bind(this);
    }

    addToCart(id){
        this.props.cartAction.addToCart(id, 1, this.props.history);
    }

    render(){

        const productsList = this.props.productsListProps.productsList.map(item =>
        {
            const oldPrice = item.old_price ?
                (
                    <div className="price--old">
                        <Currency currency={this.props.basicProps.currency} />
                        <span className="value">{item.old_price}</span>
                    </div>
                ) : '';

            const discount = item.discount > 0 ?
                (
                    <span className="products__item__discount">-{item.discount} %</span>
                ) : '';

            return (
                <li key={item.id} className="products__item">
                    <div className="products__item__header">
                        {discount}
                        <img src={item.images[0]} className="products__item__image" alt={item.title} />
                        <span className="products__item__cart" onClick={this.addToCart.bind(this, item.id)}>{bucket}</span>

                    </div>
                    <div className="products__item__footer">
                        <LinkWrap
                            url={'product/' + item.id}
                            classList="products__item__title"
                            title={item.title}
                        />
                        <div className="products__item__price">
                            <div className={item.discount > 0 ? "price--new" : "price--default"}>
                                <Currency currency={this.props.basicProps.currency} />
                                <span className="value">{item.price}</span>
                            </div>
                            {oldPrice}
                        </div>
                        <RatingStars rating={item.rating} />
                    </div>
                </li>
            )
        });

        return(
            <React.Fragment>
                <Helmet>
                    <title>Products list</title>
                </Helmet>
                {/*<Breadcrumbs data={''} />*/}
                <main>
                    <div className="container">
                        <div className="row">
                            <h1 className="title--default">Products list</h1>
                            <div className="products">
                                <ul className="products__list">
                                    {productsList}
                                </ul>
                            </div>
                        </div>
                    </div>
                </main>
            </React.Fragment>
        )
    }
}


const mapStateToProps = (state) => ({
    productsListProps: state.productsListReducer,
    basicProps: state.defaultReducer,
});

const mapDispatchToProps = (dispatch) => ({

    cartAction: bindActionCreators(cartAction, dispatch),

});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList)
