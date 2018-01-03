import React, { Component } from 'react';
import { MAP_SRC } from '../../Constants/Constants';

export default function RulesPanel(props) {
    return (
        <div className="register container">
            <div className="row">
                <div className="col-sm-6 col-sm-offset-3">
                    <h1 className="-header">Rules & Regulations</h1>
                    <div>
                        <h3>Cut off dates</h3>
                        <ul>
                            <li>U-8 : born on or after 01/01/2011</li>
                            <li>U-12 : born on or after 01/01/2005</li>
                            <li>U-16 : born on or after 01/01/2001</li>
                            <li>Open : born on or before 01/01/2005 till Degree college.</li>
                        </ul>
                        <h4>ID card / Age proof is <b>COMPULSORY</b></h4>
                        <h4>Reporting time: <br/><b>10:30</b> for everyone</h4>
                    </div>
                    <div>
                        <h3>Event Location :</h3>
                        <iframe src={MAP_SRC} width="600" height="450" frameBorder="0" style={{border:0}} allowFullScreen></iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}