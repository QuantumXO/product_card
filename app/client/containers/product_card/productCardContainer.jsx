'use strict';

import './_productCard.sass';

// React
import React, {Component} from 'react';
import {Helmet} from "react-helmet";
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import * as productCardAction from './../../actions/productCard/productCardAction';
import * as cartAction from './../../actions/cart/cartAction';
import * as wishListAction from './../../actions/wishList/wishListAction';

import Currency from './../../components/default/currency';
import RatingStars from "../../components/default/rating/ratingStars";
import LinkWrap from './../../components/default/LinkWrap';
import Breadcrumbs from './../../components/default/breadcrumbs/breadcrumbs';

class ProductCard extends Component{
    constructor(props){
        super(props);

        const windowLocHash = window.location.hash;
        const productId = windowLocHash.substr(windowLocHash.lastIndexOf('/') + 1);
        this.props.productCardAction.getProductData(productId);

        this.state = {
            productData: this.props.productData || {},
            counterNumber: 1,
            wishList: this.props.wishList || [],
            mainProductImageIndex: 0,
        };

        this.handleWishList = this.handleWishList.bind(this);
        this.incrementCounter = this.incrementCounter.bind(this);
        this.decrementCounter = this.decrementCounter.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.handleSlide = this.handleSlide.bind(this);

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        /*if (this.props.productData != prevProps.productData) {
            this.setState(() => ({
                productData: this.props.productData,
            }));

        }*/
        if (this.props.wishList != prevProps.wishList) {
            this.setState(() => ({wishList: this.props.wishList}));
        }

    }

    handleWishList(){
        this.props.wishListAction.handleWishList(this.props.productData.id);
    }

    decrementCounter(){
        const counterNumber = this.state.counterNumber;

        this.setState(() => ({counterNumber: counterNumber > 1 ? this.state.counterNumber - 1 : 1}));
    }

    incrementCounter(){
        this.setState(() => ({counterNumber: this.state.counterNumber + 1}));
    }

    addToCart(){
        this.props.cartAction.addToCart(this.props.productData.id, this.state.counterNumber, this.props.history);
    }

    handleSlide(item){

        const targetImageIndex = item.target.closest('li').getAttribute('data-image-index');

        this.setState(() => ({mainProductImageIndex: targetImageIndex}));
    }

    render(){
        const $this = this;
        const {id, category, title, price, rating, old_price, images, description, discount} = this.props.productData;
        const wishList = this.props.wishList;
        const inWishList = (wishList && wishList.indexOf(id) != -1) ? true : false;

        let slidesList,
            slide;

        const handleSlideFunc = this.handleSlide; // this

        if(images && images.length > 1){

            slide = images.map(function(item, index){
                return (
                    <li
                        className={"product__slide__item" + ($this.state.mainProductImageIndex == index ? " active" : '')}
                        key={index}
                        data-image-index={index}
                        onClick={handleSlideFunc}
                    >
                        <img src={item} alt={title} className="product__slide__image" />
                    </li>
                );

                return;
            });

            slidesList =
                (
                    <ul className="product__slide__list">
                        {slide}
                    </ul>
                );
        }

        const oldPriceBlock = old_price ?
            (
                <div className="price price--old">
                    <Currency currency={this.props.basicProps.currency} />
                    <span className="value">{old_price}</span>
                </div>
            ) : '';

        const descriptionBlock = description ?
            (
                <p className="product__description">{description}</p>
            ) : '';

        return(
            <React.Fragment>
                <Helmet>
                    <title>Product card</title>
                </Helmet>
                <Breadcrumbs data={{title, url: 'product'}} />
                <main>
                    <div className="container">
                        <div className="row">
                            <div className="product">
                                <div className="product__image__wrap">
                                    <img src={images ? images[this.state.mainProductImageIndex] : '#'} alt="" className="product__image" />
                                    {slidesList}
                                </div>
                                <div className="product__meta">
                                    <h1 className="title--default">{title}</h1>
                                    <div className="product__block">
                                        <div className="product__price">
                                            <div className="price price--default">
                                                <Currency currency={this.props.basicProps.currency} />
                                                <span className="value">{price}</span>
                                            </div>
                                            {oldPriceBlock}
                                        </div>
                                        <RatingStars rating={rating} />
                                    </div>
                                    {descriptionBlock}
                                    <div className="product__bottom">
                                        <div className="product__cart">
                                            <div className="product__cart__counter">
                                                <span className="decrement" onClick={this.decrementCounter}>-</span>
                                                <span className="number">{this.state.counterNumber}</span>
                                                <span className="increment" onClick={this.incrementCounter}>+</span>
                                            </div>
                                            <span className="product__cart__btn" onClick={this.addToCart}>Add to Cart</span>
                                        </div>
                                        <div className="product__wishlist">
                                            <div className={"product__wishlist__btn" + (inWishList ? ' active' : '')} onClick={this.handleWishList}>
                                                <i className="fa fa-heart" />
                                                <span className="product__wishlist__title">{inWishList ? 'Unfavorite' : 'Add to favorite'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    productData: state.productCardReducer.productData,
    wishList: state.wishListReducer.wishListIDsArr,
    basicProps: state.defaultReducer,
});

const mapDispatchToProps = (dispatch) => ({
    productCardAction: bindActionCreators(productCardAction, dispatch),
    wishListAction: bindActionCreators(wishListAction, dispatch),
    cartAction: bindActionCreators(cartAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard)
