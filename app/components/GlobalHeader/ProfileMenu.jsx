import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { connect } from 'react-redux'
import cx from 'classnames';

import { logoutUser } from 'modules/auth/actions/logout';

import Settings from 'modules/auth/views/Settings';
import Help from 'modules/auth/views/Help';

const DEFAULT_PROFILE_PIC = '/assets/' + require('assets/images/candidate_default_profile_pic.png');

class ProfileMenu extends Component {

    constructor(props) {
        super(props)

        this.state = {
            showSubMenu: false,
            openSettings: false,
            openHelp: false,
        };

        this.toggleSubMenu = this.toggleSubMenu.bind(this);
        this.openSettings = this.openSettings.bind(this);
        this.openHelp = this.openHelp.bind(this);
        this.closeSettings = this.closeSettings.bind(this);
        this.closeSubMenu = this.closeSubMenu.bind(this);
        this.closeHelp = this.closeHelp.bind(this);
        this.openBusiness = this.openBusiness.bind(this);
        this.openBilling = this.openBilling.bind(this);
        this.openTeam = this.openTeam.bind(this);
    }

    componentWillUpdate(){
        if(this.state.showSubMenu){
            window.app.removeEventListener('click', this.closeSubMenu)
        }
        else{
            window.app.addEventListener('click', this.closeSubMenu)
        }
    }

    closeSubMenu(e){
        const area = ReactDOM.findDOMNode(this.refs.profileMenu);

        if (!area.contains(e.target)) {
            this.setState({
                showSubMenu: false
            });
            return false;
        }
    }

    toggleSubMenu(e) {
        e.preventDefault();
        this.setState({
            showSubMenu: this.state ? !this.state.showSubMenu : true
        });
        return false;
    }

    openSettings(e) {
        e.preventDefault();
        this.toggleSubMenu(e);
        this.setState({
            openSettings: true
        });
        return false;
    }

    openHelp(e) {
        e.preventDefault();
        this.toggleSubMenu(e);
        this.setState({
            openHelp: true
        });
        return false;
    }

    openBusiness(e) {
        const { router } = this.context;
        this.toggleSubMenu(e);
    }

    openBilling(e) {
        const { router } = this.context;
        this.toggleSubMenu(e);
        router.push('/billing');
    }

    openTeam(e) {
        const { router } = this.context;
        this.toggleSubMenu(e);
        router.push('/team-settings');
    }

    closeSettings() {
        this.setState({
            openSettings: false
        });
    }

    closeHelp() {
        this.setState({
            openHelp: false
        });
    }

    render() {
        const { user } = this.props;
        if (!user) {
            return null;
        }

        let subMenuClassNames = cx('nav nav-pills nav-stacked -sub-menu', {
            hide: !this.state.showSubMenu
        });
        const isTeamPausedOrActive = user.get('teamStatus') === 'active' || user.get('teamStatus') === 'payment_error';
        let isUserAdmin = false;

        if (this.props.team) {
            const team = this.props.team.toObject();
            const userObj = team.members.find((member) => member.userId === user.get('id'));
            if (userObj) {
                isUserAdmin = userObj.role === 'admin';
            }
        }

        return (
            <li ref="profileMenu">
                <a href="#" className="-profile" onClick={this.toggleSubMenu}>
                    <img src={user.get('profilePicture') || DEFAULT_PROFILE_PIC} className="-profile-pic" />
                    <div className="-profile-menu-icon">
                        <span className="-text"/>
                    </div>
                </a>
                <ul className={subMenuClassNames}>
                    <li><a href="#settings" className="icon-sound-mix" onClick={this.openSettings}>Settings</a></li>
                    <li>
                        {isTeamPausedOrActive ?
                            isUserAdmin ?
                                <a className="icon-credit-card -business-link" onClick={this.openBilling}>
                                    Billing and Payments
                                </a>
                                : <a className="icon-team-account -business-link" onClick={this.openTeam}>
                                    Team
                                </a>
                            : <a href="/business-setup" className="icon-briefcase -business-link">
                                Upgrade to business
                            </a>}
                    </li>
                    <li><a href="#help" className="icon-help-with-circle" onClick={this.openHelp}>Help</a></li>
                    <li><Link to="/logout" className="icon-log-out">Logout</Link></li>
                </ul>
                <Settings onRequestClose={this.closeSettings} isOpen={this.state.openSettings}/>
                <Help onRequestClose={this.closeHelp} isOpen={this.state.openHelp}/>
            </li>
        );
    }
}

ProfileMenu.contextTypes = {
    router: React.PropTypes.object
};

const mapStateToProps = (state) => {
    const user = state.getIn(['auth', 'user']);
    const teamId = user ? user.get('teamId') : null;
    return {
        user,
        team: state.getIn(['team', 'data', teamId]),
    };
};

const mapDispatchtoProps = (dispatch) => {
    return {
        dispatch
    };
};

export default connect(mapStateToProps, mapDispatchtoProps)(ProfileMenu);
