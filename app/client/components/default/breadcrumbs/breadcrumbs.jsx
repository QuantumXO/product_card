
'use strict';

import React from 'react'

import LinkWrap from './../LinkWrap';

export default function Breadcrumbs(props) {

    const data = props.data;

    const breadcrumbsList = [{title: 'Home', url: ''}];

    if(data) {
        breadcrumbsList.push({title: data.title, url: data.url});
    }


    const breadcrumbsItem = breadcrumbsList.map((item, index) =>

    {

        const isActive = index === breadcrumbsList.length - 1 ? true : false;

        return (
            <li className={"breadcrumbs__item"} key={index}>
                <LinkWrap
                    url={!isActive ? item.url : false}
                    classList={"breadcrumbs__link" + (isActive ? ' active' : '')}
                    title={item.title}
                />
            </li>
        )
    });


    return (
        <div className="breadcrumbs">
            <div className="container">
                <div className="row">
                    <ul className="breadcrumbs__list">
                        {breadcrumbsItem}
                    </ul>
                </div>
            </div>
        </div>
    )

}















