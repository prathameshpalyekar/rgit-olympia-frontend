import React, { Component } from 'react';
import { connect } from 'react-redux';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import Header from './Header';
import Home from 'modules/home/views/Home';

export default class App extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <Header/>
                    <Home/>
                    <Alert stack={{limit: 3}} effect="slide" position="bottom-left" timeout={5000}/>
                </div>
            </div>
        )
    }
}
