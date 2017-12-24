import React, { Component } from 'react';
import Config from '../../../config';
import cx from 'classnames';
import './Home.less';
import HomePanel from './HomePanel/HomePanel';
import RegisterPanel from './RegisterPanel/RegisterPanel';
import CategoryPanel from './CategoryPanel/CategoryPanel';
import RegisterForm from './RegisterForm/RegisterForm';

const pageTabs = [
    { id: 'home', title: 'Home' },
    { id: 'register', title: 'Register' },
    { id: 'catergories', title: 'Categories & Prizes' },    
];

class Home extends Component {
    constructor (props) {
        super(props);
        this.state = {
            activeTab: 'register',
            activePanel: 'registerForm',
        };
        this.openRegisterForm = this.openRegisterForm.bind(this);
    }

    openRegisterForm() {
        this.setState({ activePanel: 'registerForm', activeTab: 'register' });
    }

    selectTab(value) {
        this.setState({ activeTab: value, activePanel: value });
    }

    renderPanel() {
        const { activePanel } = this.state;
        if (activePanel === 'home') {
            return (<HomePanel/>);
        } else if (activePanel === 'register') {
            return (<RegisterPanel openRegisterForm={this.openRegisterForm}/>);
        } else if (activePanel === 'catergories') {
            return (<CategoryPanel/>);
        } else if (activePanel === 'registerForm') {
            return (<RegisterForm/>);
        }
    }
    
    render() {
        const { activeTab } = this.state;

        return (
            <div className="home container">
                <div className="row">
                    <ul className="nav nav-tabs">
                        {pageTabs.map((tab, index) => {
                            const tabClas = cx({ 'active': tab.id === activeTab});
                            return (
                                <li key={index} className={tabClas} onClick={this.selectTab.bind(this, tab.id)}><a>{tab.title}</a></li>
                            )
                        })}
                    </ul>
                    <div className="-panel">
                        {this.renderPanel()}
                    </div>
                </div>
            </div>
        );
    }
}

// const mapDispatchtoProps = (dispatch) => {
//     return {
//         dispatch
//     };
// };

export default Home;
