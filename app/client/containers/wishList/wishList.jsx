'use strict';

import './wishList.sass';

import React, {Component} from 'react';
import {Helmet} from "react-helmet";
import {connect} from "react-redux";

import LinkWrap from './../../components/default/LinkWrap';
import Table from './../../components/default/table/table';
import RatingStars from "../../components/default/rating/ratingStars";
import Breadcrumbs from './../../components/default/breadcrumbs/breadcrumbs';
import Currency from './../../components/default/currency';
import {bindActionCreators} from "redux";


import * as cartAction from './../../actions/cart/cartAction';
import * as wishListAction from './../../actions/wishList/wishListAction';

class WishList extends Component {

    constructor(){
        super();

        this.state = {
            wishList: []
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        /*if(this.props.wishListProps.wishList !== prevProps.wishList) {
            this.setState(() => ({
                wishList: this.props.wishListProps.wishList || [],
            }));
        }*/
    }

    render(){

        const wishListFromProps = this.props.wishListProps.wishList || [];
        let wishListBody;

        if(!Array.isArray(wishListFromProps) || !wishListFromProps.length){
            wishListBody = (
                <div className="wishList__empty">
                    <p className="wishList__empty__text">Your wish list is currently empty.</p>
                    <LinkWrap
                        classList="wishList__empty__btn"
                        children={
                            (
                                <React.Fragment>
                                    <span className="wishList__empty__btn__title">Continue shopping</span>
                                    <svg aria-hidden="true" width="20" focusable="false" role="presentation" className="wishList__empty__btn__icon" viewBox="0 0 20 8">
                                        <path d="M15.186.445c.865.944 1.614 1.662 2.246 2.154.631.491 1.227.857 1.787 1.098v.44a9.933 9.933 0 0 0-1.875 1.196c-.606.485-1.328 1.196-2.168 2.134h-.752c.612-1.309 1.253-2.315 1.924-3.018H.77v-.986h15.577c-.495-.632-.84-1.1-1.035-1.406-.196-.306-.486-.843-.87-1.612h.743z" fill="#000" />
                                    </svg>
                                </React.Fragment>
                            )
                        }
                    />
                </div>
            )
        }else{

            wishListBody = (
                <Table
                    tableClassList="wishList__table"
                    type="wishList"
                    tfoot=""
                    history={this.props.history}
                    addToCartFunc={this.props.cartAction.addToCart}
                    removeFromWishListFunc={this.props.wishListAction.removeItem}
                    data={wishListFromProps}
                    currency={this.props.basicProps.currency}
                    theadTitles={['product', 'price', 'buy', 'remove']}
                />
            );
        }

        return (
            <React.Fragment>
                <Helmet>
                    <title>Wish list</title>
                </Helmet>
                <Breadcrumbs data={{title: 'Wish list', url: 'wish-list'}} />
                <main>
                    <div className="container">
                        <div className="row">
                            <h1 className="title--default">Wish list</h1>
                            {wishListBody}
                        </div>
                    </div>
                </main>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    wishListProps: state.wishListReducer,
    basicProps: state.defaultReducer,
});

const mapDispatchToProps = (dispatch) => ({
    cartAction: bindActionCreators(cartAction, dispatch),
    wishListAction: bindActionCreators(wishListAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(WishList)












