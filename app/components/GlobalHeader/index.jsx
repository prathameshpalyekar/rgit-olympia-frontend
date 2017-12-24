import React, { Component } from 'react';
import { Canvas } from '../ui';
import Logo from './Logo';
import './GlobalHeader.less';

export default class GlobalHeader extends Component {
    render() {
        return (
            <header className="navbar navbar-default global-header">
                <Canvas>
                    <div className="header-logo-container">
                        <Logo/>
                    </div>
                </Canvas>
            </header>
        );
    }
}
