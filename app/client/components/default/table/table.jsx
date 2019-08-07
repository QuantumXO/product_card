'use strict';

import './_table.sass';

import React, {Component} from 'react';

import Currency from "../currency";
import LinkWrap from '../LinkWrap';
import RatingStars from "../rating/ratingStars";

class Table extends Component {

    constructor(props){
        super(props);

        this.state = {
            type: props.type,
            data: props.data,
        };
    }

    addToCart(id){
        this.props.addToCartFunc(id, 1, this.props.history);
    }

    removeItem(id){
        this.props.removeFromWishListFunc(id);
    }

    render() {

        let thead = null,
            theadCol;

        const {data, theadTitles, currency, tableClassList} = this.props;

        if(theadTitles){

            theadCol = theadTitles.map((item, index) => {
                return(
                    <td className="table__col" colSpan={index == 0 ? 2 : null} key={index}>{item}</td>
                )
            });

            thead = (
                <thead className="table__thead">
                <tr className="table__row">
                    {theadCol}
                </tr>
                </thead>
            );
        }

        const tableBody = data.map(item => {

            const {id, images, price, old_price, title, rating} = item;

            const oldPriceBlock = old_price ?
                (
                    <div className="price price--old">
                        <Currency currency={currency} />
                        <span className="value">{old_price}</span>
                    </div>
                ) : '';

            return (
                <tr className="table__row" key={id}>
                    <td className="table__col">
                        <img className="table__image" src={images[0]} width="76" alt={title} />
                    </td>
                    <td className="table__col">
                        <div className="table__inner">
                            <LinkWrap
                                url={"product/" + id}
                                classList="table__title__link"
                                title={title}
                            />
                            <RatingStars rating={rating} />
                        </div>
                    </td>
                    <td className="table__col">
                        <div className="table__price__inner">
                            <div className="price price--default">
                                <Currency currency={currency} />
                                <span className="value">{price}</span>
                            </div>
                            {oldPriceBlock}
                        </div>
                    </td>
                    <td className="table__col">
                        <span className="btn btn--default table__buy" onClick={this.addToCart.bind(this, id)}>Buy Now</span>
                    </td>
                    <td className="table__col">
                        <span className="btn btn--remove" onClick={this.removeItem.bind(this, id)}>
                            <svg aria-hidden="true" focusable="false" width="22" viewBox="0 0 448 512">
                                <path d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z" />
                            </svg>
                        </span>
                    </td>
                </tr>
            )
        });

        return (
            <table className={"table table--default" + (tableClassList ? ' ' + tableClassList : null)}>
                {thead}

                <tbody className="table__tbody">
                    {tableBody}
                </tbody>

                <tfoot className="table__tfoot">

                </tfoot>
            </table>
        );
    }
}

export default Table;

