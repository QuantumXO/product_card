'use strict';

import './_cart.sass';

// React
import React, {PureComponent} from 'react'
import {Helmet} from "react-helmet";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as cartAction from './../../actions/cart/cartAction';

import Breadcrumbs from './../../components/default/breadcrumbs/breadcrumbs';
import Currency from './../../components/default/currency';
import RatingStars from "../../components/default/rating/ratingStars";
import LinkWrap from './../../components/default/LinkWrap';

class Cart extends PureComponent{
    constructor(props){
        super(props);

        this.state = {
            cartProductsList: this.props.cartProductsList,
        };

        this.removeItemFromCart = this.removeItemFromCart.bind(this);

        this.quantityRefsArr = new Map();
        this.removeBtnsRefsArr = new Map();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.cartProductsList !== prevProps.cartProductsList) {
            this.setState(() => ({
                cartProductsList: this.props.cartProductsList || [],
            }));
        }
    }

    removeItemFromCart(itemId){
        this.props.cartAction.removeFromCart(itemId);
    }

    reduceQuantity(id){

        const currentQuantity = Array.from(this.quantityRefsArr.values()).filter(item => {if(item.id == id){return item;}})[0].quantity;

        if(currentQuantity > 1){
            const newQuantity = currentQuantity - 1;

            this.props.cartAction.handleQuantity(id, newQuantity);

        }

    }

    increaseQuantity(id){

        const currentQuantity = Array.from(this.quantityRefsArr.values()).filter(item => {if(item.id == id){return item;}})[0].quantity;

        const newQuantity = currentQuantity + 1;

        this.props.cartAction.handleQuantity(id, newQuantity);
    }

    render(){
        let cartProductsList = this.props.cartProductsList;
        let cartBody;

        if(cartProductsList.length) {

            let subTotal = 0;

                cartProductsList = cartProductsList.map((item, index) => {

                const {id, category, title, price, rating, old_price, images, description, discount, quantity} = item;

                const {currency} = this.props.basicProps;

                const oldPriceBlock = old_price ?
                    (
                        <div className="price price--old">
                            <Currency currency={currency} />
                            <span className="value">{old_price}</span>
                        </div>
                    ) : '';

                const totalPrice = (quantity * price).toFixed(2);

                subTotal += +totalPrice;

                return (
                    <tr className="cart__table__row" key={id}>
                        <td className="cart__product__image__wrap">
                            <LinkWrap
                                url={"product/" + id}
                                classList="cart__product__image__link"
                                children={<img src={images[0]} width="76" alt={title} />}
                            />
                        </td>
                        <td className="cart__product__title__wrap">
                            <div className="cart__product__title__inner">
                                <LinkWrap
                                    url={"product/" + id}
                                    classList="cart__product__title__link"
                                    title={title}
                                />
                                <span className="cart__product__title__additional">
                                    Color: red
                                </span>
                            </div>
                        </td>
                        <td className="cart__product__price__wrap">
                            <div className="cart__product__price__inner">
                                <div className="price price--default">
                                    <Currency currency={currency} />
                                    <span className="value">{price}</span>
                                </div>
                                {oldPriceBlock}
                            </div>
                        </td>
                        <td className="cart__product__quantity__wrap">
                            <div className="cart__product__counter">
                                <span className="decrement" onClick={this.reduceQuantity.bind(this, id)}>-</span>
                                <span className="number" data-item-id={id} ref={() => this.quantityRefsArr.set(index, {id, quantity})}>{quantity}</span>
                                <span className="increment" onClick={this.increaseQuantity.bind(this, id)}>+</span>
                            </div>
                        </td>
                        <td className="cart__product__total__wrap">
                            <div className="art__product__total__inner">
                                <div className="price price--default">
                                    <Currency currency={currency} />
                                    <span className="value">{totalPrice}</span>
                                </div>
                            </div>
                        </td>
                        <td className="cart__product__remove__wrap">
                            <span className="cart__product__remove__btn" data-item-id={id} onClick={this.removeItemFromCart.bind(this, id)} ref={(node) => this.removeBtnsRefsArr.set(index, node)}>
                                <svg aria-hidden="true" focusable="false" width="22" viewBox="0 0 448 512">
                                    <path d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z" />
                                </svg>
                            </span>
                        </td>
                    </tr>
                );
            });

            cartBody = (
                <table className="cart__table">
                    <thead className="cart__table__thead">
                        <tr className="cart__table__row">
                            <th colSpan="2">product</th>
                            <th>price</th>
                            <th>quantity</th>
                            <th>total</th>
                            <th>remove</th>
                        </tr>
                    </thead>
                    <tbody className="cart__table__tbody">
                        {cartProductsList}
                    </tbody>
                    <tfoot className="cart__table__tfoot">
                        <tr className="cart__table__row">
                            <td colSpan="6">
                                <div className="cart__product__subtotal">
                                    <span className="cart__product__subtotal__title">Subtotal:</span>
                                    <div className="price price--default">
                                        <Currency currency={this.props.basicProps.currency} />
                                        <span className="value">{subTotal.toFixed(2)}</span>
                                    </div>
                                </div>
                                <p className="cart__footer__text">Shipping & taxes calculated at checkout</p>
                                <div className="cart__footer__btn__wrap">
                                    <span className="btn btn--default cart__footer__confirm">Check out</span>
                                    <span className="cart__footer__union">or</span>
                                    <LinkWrap
                                        title="Continue shopping"
                                        classList="btn btn--inverse cart__footer__confirm"
                                    />
                                </div>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            );

        }else {

            cartBody = (
                <div className="cart__empty">
                    <p className="cart__empty__text">Your cart is currently empty.</p>

                    <LinkWrap
                        classList="cart__empty__btn"
                        children={
                            (
                                <React.Fragment>
                                    <span className="cart__empty__btn__title">Continue shopping</span>
                                    <svg aria-hidden="true" width="20" focusable="false" role="presentation" className="cart__empty__btn__icon" viewBox="0 0 20 8">
                                        <path d="M15.186.445c.865.944 1.614 1.662 2.246 2.154.631.491 1.227.857 1.787 1.098v.44a9.933 9.933 0 0 0-1.875 1.196c-.606.485-1.328 1.196-2.168 2.134h-.752c.612-1.309 1.253-2.315 1.924-3.018H.77v-.986h15.577c-.495-.632-.84-1.1-1.035-1.406-.196-.306-.486-.843-.87-1.612h.743z" fill="#000" />
                                    </svg>
                                </React.Fragment>
                            )
                        }
                    />
                </div>
            );
        }

        return(
            <React.Fragment>
                <Helmet>
                    <title>Cart</title>
                </Helmet>
                <Breadcrumbs data={{title: 'cart', url: 'cart'}} />
                <main>
                    <div className="container">
                        <div className="row">
                            <div className="cart">
                                <h1 className="title--default">Cart</h1>
                                {cartBody}
                            </div>
                        </div>
                    </div>
                </main>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    basicProps: state.defaultReducer,
    cartProductsList: state.cartReducer.cartProductsList
});

const mapDispatchToProps = (dispatch) => ({
    cartAction: bindActionCreators(cartAction, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
