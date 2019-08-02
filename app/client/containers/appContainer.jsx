'use strict';

import './../styles/_basic.sass';

import React, {Component} from 'react';

import Header from './header/headerContainer';
import Routes from './../router/router';

class App extends Component{
    constructor(){
        super();
    }

    render(){
        return(
            <React.Fragment>
                <Header />
                <Routes />
            </React.Fragment>
        );
    }

}

export default App;

