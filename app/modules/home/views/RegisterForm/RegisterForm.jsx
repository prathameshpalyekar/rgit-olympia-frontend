import React, { Component } from 'react';
import axios from 'axios';

export default class RegisterForm extends Component {
    constructor (props) {
        super(props);
        this.state = {
            name: null,
            email: null,
            phoneNumber: null,
            gender: null,
            ageGroup: null,
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        const { name, value } = event.target;
        this.setState({[name]: value});
    }

    onSubmit(event) {
        event.preventDefault();
        const { name, email, phoneNumber, gender, ageGroup } = this.state;
        const user = { name, email, phoneNumber, gender, ageGroup };
        this.addUser(user);
    }

    addUser(data) {
        let url = 'api/addUser';
        axios({
            url: url,
            method: 'post',
            responseType: 'json',
            data: data
        }).then((xhrResponse) => {
            let response = xhrResponse.data;
            console.log(xhrResponse)
            // if (response.success) {
            //     dispatch(receive(response.data));
            // } else {
            //     dispatch(error(response.message));
            // }
        }).catch(xhrResponse => {
            console.log(xhrResponse)
            // let response = xhrResponse.data;
            // dispatch(error(response.message));
        });
    }

    render() {
        return (
            <div className="register-form container">
                <div className="row">
                    <form className="col-sm-6 col-sm-offset-3">
                        <div className="form-group">
                            <label>Name (Required)</label>
                            <input type="name" className="form-control" placeholder="Enter Name" name="name" required onChange={this.onChange}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" id="email" placeholder="Enter Email" name="email" onChange={this.onChange}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="phoneNumber">Contact Number (Required)</label>
                            <input type="number" className="form-control" id="phoneNumber" placeholder="Enter contact number" name="phoneNumber" onChange={this.onChange}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="gender">Gender (Required)</label>
                            <div>
                                <label className="radio-inline"><input type="radio" name="gender" value="male" onChange={this.onChange}/>Male</label>
                                <label className="radio-inline"><input type="radio" name="gender" value="female" onChange={this.onChange}/>Female</label>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="ageGroup">Age Group (Required)</label>
                            <select className="form-control" name="ageGroup" onChange={this.onChange}>
                                <option>Under 8</option>
                                <option>Under 12</option>
                                <option>Under 16</option>
                                <option>Open</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-default" onClick={this.onSubmit}>Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}