import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Formsy from 'formsy-react';
import Alert from 'react-s-alert';
import FC from 'components/Formsy';
import { loginUser } from '../actions/login.js';
import Config from '../../../config';
import './Login.less';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            submitted: false,
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        const { router } = this.context;
        const { isAuthenticated } = this.props;

        if (isAuthenticated) {
            router.replace(Config.LANDING_URL);
        }
    }

    componentWillReceiveProps(nextProps) {
        const { router } = this.context;

        if (this.state.submitted && !nextProps.isFetching) {
            const { router } = this.context;
            if (nextProps.errorMessage){
                Alert.error(nextProps.errorMessage);
            } else {
                if (nextProps.isAuthenticated) {
                    router.replace(Config.LANDING_URL);
                }
            }
            this.setState({ submitted: false });
        }
    }

    onSubmit(model) {
        const { dispatch } = this.props;
        dispatch(loginUser(model));
        this.setState({ submitted: true });
        return false;
    }

    render() {
        return (
            <div className="col-sm-offset-3 col-sm-6">
                <Formsy.Form className="login-form" onValidSubmit={this.onSubmit}>
                    <div className="-title">Log in as admin to handle Happo users.</div>
                    <FC.Input layout="vertical" label="Email" name="email" placeholder="Email address" type="email" required/>
                    <FC.Input layout="vertical" label="Password" name="password" placeholder="Password" type="password" required/>
                    <div className="-footer">
                        <button type="submit" className="btn btn-primary login-form-button">Login</button>
                    </div>
                </Formsy.Form>
            </div>
        );
    }
}

Login.contextTypes = {
    router: React.PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.getIn(['auth', 'isAuthenticated']),
        isFetching: state.getIn(['auth', 'isFetching']),
        errorMessage: state.getIn(['auth', 'errorMessage']),
    };
};

const mapDispatchtoProps = (dispatch) => {
    return {
        dispatch
    };
};

export default connect(mapStateToProps, mapDispatchtoProps)(Login);
