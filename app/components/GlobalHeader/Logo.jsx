import React, { Component } from 'react';
import { Link } from 'react-router';

const LogoImage = '/assets/' + require('assets/images/logo.png');

export default class Logo extends Component {
    render() {
        return (
            <Link to="/jobs" className="pure-menu-heading">
                <img src={ LogoImage } className="global-header-logo"/>
            </Link>
        );
    }
}
