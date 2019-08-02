'use strict';

export default function Currency(props) {

    switch (props.currency) {
        case 'UAH' :
            return '₴';

        case 'euro' :
            return '€';

        default:
            return '$';
    }

    return;
}

