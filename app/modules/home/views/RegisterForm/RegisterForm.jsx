import React, { Component } from 'react';
import axios from 'axios';
import Config from '../../../../config';
import Formsy from 'formsy-react';
import FC from 'components/Formsy';
import cx from 'classnames';
import Alert from 'react-s-alert';
import { AgeGroups, GenderOptions} from '../../Constants/Constants';
import './RegisterForm.less';
const generateTxnId = require("uuid-pure").newId;
const PAYMENT_CODE = '/assets/' + require('assets/images/payment_code.png');

export default class RegisterForm extends Component {
    constructor (props) {
        super(props);
        this.state = {
            name: null,
            email: null,
            phoneNumber: null,
            gender: null,
            ageGroup: null,
            txnid: null,
        };
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.addUser = this.addUser.bind(this);
    }

    handleChange(name, value) {
        this.setState({[name]: value});
    }

    onSubmit(model) {
        const { name, email, phoneNumber, gender, ageGroup, txnid } = model;
        this.setState({ name, email, phoneNumber, gender, ageGroup, txnid });
        if (name && email && phoneNumber && gender && ageGroup && txnid) {
            this.addUser(model);
        } else {
            Alert.error('Please fill complete information.');
        }
    }

    addUser(data) {
        data.id = data.ageGroup + '_' + generateTxnId(8);
        axios({
            url: Config.BASE_URL + 'addUser',
            method: 'post',
            responseType: 'json',
            data,
        }).then((xhrResponse) => {
            const { data } = xhrResponse;
            if (data.success) {
                this.setState({
                    showResponse: true,
                });
            }
        }).catch(xhrResponse => {
            console.log(xhrResponse)
        });
    }

    render() {
        const { name, email, phoneNumber, gender, ageGroup, showResponse, txnid } = this.state;
        const submitButtonClass = cx('btn', 'btn-default', {
            'btn-primary': name && email && phoneNumber && gender && ageGroup && txnid
        });

        return (
            <div className="register-form container">
                <div className="row">
                    {showResponse ? 
                        <div className="col-sm-6 col-sm-offset-3 text-center register-response">
                            <div>Your application has been submitted successfully. Your transaction ID is</div>
                            <div className="-txn-code">{txnid}</div>
                            <div>Please note that you will receive acceptance mail along with participation code. Please provide it at the time of event.</div>
                            <div>Thank you for participation.</div>
                        </div> :
                        <Formsy.Form className="login-form" onValidSubmit={this.onSubmit}>
                            <FC.Input layout="vertical" label="Name" name="name" placeholder="Enter Name" type="text" required onChange={this.handleChange}/>
                            <FC.Input layout="vertical" label="Email" name="email" placeholder="Enter Email" type="email" required onChange={this.handleChange}/>
                            <FC.Input layout="vertical" label="Contact Number" name="phoneNumber" placeholder="Enter contact number" type="number" required onChange={this.handleChange}/>
                            <FC.RadioGroup options={GenderOptions} name="gender" label="Gender" layout="vertical" required onChange={this.handleChange} value=""/>
                            <FC.Select name="ageGroup" label="Age Group" type="text" options={AgeGroups} layout="vertical" onChange={this.handleChange} required/>
                            <div>
                                <div className="-note">
                                    <div className="-header">Please Note: </div>
                                    <div className="-info"><b>Please scan following code or use Mobile number for payment using PayTM app.</b></div>
                                    <div className="-info text-center">Mobile No : <b className="-mob-no">8286939717</b></div>
                                    <div className="-info"><b>Amount to be paid: <span className="-high-light">Rs. 500</span></b></div>
                                    <div className="-info"><b>After successful payemt of fee, please enter transaction Id in Transaction ID field.</b></div>
                                </div>
                                <div className="row">
                                    <img className="img-responsive img-rounded col-sm-6 col-sm-offset-3" src={PAYMENT_CODE}></img>
                                </div>
                            </div>
                            <FC.Input layout="vertical" label="Transaction ID" name="txnid" placeholder="Enter Transaction ID" type="text" required onChange={this.handleChange}/>
                            <button type="submit" className={submitButtonClass}>Submit</button>
                        </Formsy.Form>
                    }
                </div>
            </div>
        )
    }
}