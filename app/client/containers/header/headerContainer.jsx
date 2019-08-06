'use strict';

import './header.sass';

// React
import React, {Component} from 'react';
import {connect} from 'react-redux';

import LinkWrap from './../../components/default/LinkWrap';


const wishListChildren =
    (
        <React.Fragment>
            <i className="fa fa-heart-o header__wishList__icon" />
            <span className="header__wishList__title">Wishlist</span>
        </React.Fragment>
    );

class Header extends Component{
    constructor(props){
        super(props);
    }

    render(){

        const cartLinkChildren =
            (
                <React.Fragment>
                    <svg viewBox="0 0 40 40" width="30" className="header__cart__icon">
                        <path d="M0.5 4.5C0.5 3.67157 1.17157 3 2 3H5.4264C7.29819 3 8.97453 4.15869 9.63602 5.9097L10.4264 8.00178C10.4503 8.00062 10.4745 8.00002 10.4987 8L34.0093 7.98001C37.2162 7.97728 39.3967 11.2342 38.1722 14.1982L34.3031 23.5639C33.8485 24.6643 32.8658 25.4581 31.6944 25.6711L18.7279 28.0286C16.5907 28.4172 14.481 27.2236 13.7133 25.1915L6.8296 6.9699C6.60911 6.38623 6.05033 6 5.4264 6H2C1.17157 6 0.5 5.32843 0.5 4.5ZM11.5587 10.9991L16.5197 24.1313C16.7756 24.8087 17.4789 25.2065 18.1913 25.077L31.1577 22.7195C31.3251 22.689 31.4655 22.5756 31.5304 22.4184L35.3995 13.0527C35.8077 12.0648 35.0809 10.9791 34.0119 10.98L11.5587 10.9991Z" />
                        <circle cx="13.5" cy="34" r="3" />
                        <circle cx="31.5" cy="34" r="3" />
                    </svg>
                    <span className="header__cart__counter">{this.props.cartProps.inCartList.length}</span>
                </React.Fragment>
            );

        return(
            <header>
                <div className="container">
                    <div className="row">
                        <LinkWrap
                            url=""
                            classList="header__logo"
                            title="QuantumX0"
                        />
                        <ul className="header__menu">
                            <li className="header__menu__item">
                                <LinkWrap
                                    url="wish-list"
                                    classList="header__menu__link inverse header__wishList"
                                    children={wishListChildren}
                                />
                            </li>
                            <li className="header__menu__item">
                                <LinkWrap
                                    url="cart"
                                    classList="header__menu__link header__cart"
                                    children={cartLinkChildren}
                                />
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
        )
    }
}

const mapStateToProps = (state) => ({
    cartProps: state.cartReducer,
});

export default connect(mapStateToProps, null)(Header)
