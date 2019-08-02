'use strict';

import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default function LinkWrap(props) {

    if(props){

        const {id, url, classList, title, dataAttr, target, children, keyIndex} = props;

        const urlPrefix = process.env.NODE_ENV === 'development' ? '/#/' : '//quantumxo.github.io/product_cart/dist/';

        const elType = url !== false ? 'a' : 'span';

        const linkNode = React.createElement(elType, {
            id: id || null,
            key: keyIndex || null,
            className: classList || null,
            href: url !== false ? urlPrefix + (url || '') : null,
            target: target || null
        },
            title, children
        );

        if(dataAttr){

        }

        return (
            linkNode
        );

    }else{
        return;
    }
}
