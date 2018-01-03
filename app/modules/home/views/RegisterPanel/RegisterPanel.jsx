import React, { Component } from 'react';

export default function RegisterPanel(props) {
    return (
        <div className="register container">
            <div className="row">
                <div className="col-sm-6 col-sm-offset-3">
                    <h1 className="-header">Register</h1>
                    <h3>Instructions for Registeration</h3>
                    <div>
                        <ol>
                            <li>Please provide all the required information.</li>
                            <li>If candidate wants to participate in multiple events then he/she will be required to fill form for the group in which he/she wants to participate.</li>
                            <li>Entry fee will be Rs 500 only.</li>
                            <li>Payment will be done through Paytm.</li>
                            <li>You have to provide your transaction number of payment as a part of information for verification purpose.</li>
                            <li>You can also pay fees at venue which will be considered as on the spot entry and will be Rs 600 per event.</li>
                        </ol>
                    </div>
                    <div>
                        For Online Registeration and payment &nbsp;&nbsp;
                        <button className="btn btn-primary" onClick={props.openRegisterForm}>Click here</button>
                    </div>
                </div>
            </div>
        </div>
    )
}