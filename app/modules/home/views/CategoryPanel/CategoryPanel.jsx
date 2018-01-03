import React, { Component } from 'react';

export default function CategoryPanel(props) {
    return (
        <div className="register container">
            <div className="row">
                <div className="col-sm-6 col-sm-offset-3">
                    <h1 className="-header">Categories & Prizes</h1>
                    <div>
                        <ul>
                            <li>There will be <b>Four Groups</b> for boys and girls respectively.</li>
                            <li>Groups for boys are <b>U-8, U-12, U-16</b>.</li>
                            <li>Groups for girls are <b>U-8, U-12, U-16</b>.</li>
                            <li>There will be <b>OPEN</b> category of mix (Boys and Girls).</li>
                            <li>Each category will have separate prizes.</li>
                            <li>There will be trophies for first 10 winners ( boys ) & 5 trophies ( girls ) in each group and certificates will be provided to all participants.</li>
                            <li>Cash prize will be given in the open category for first 5 places.</li>
                            <li>Note : Amount of cash prize will be declared on the day of event.</li>
                            <li>One student can participate in multiple events.</li>
                            <li>The entry fee for each event is Rs 500 for pre-registered students.</li>
                            <li>There is facility of on the spot entry which will be Rs 600 per event.</li>
                            <li>Complementary refreshments will be provided to all the participants.</li>
                        </ul>
                    </div>
                    <div>
                        For information about online registration and payments &nbsp;&nbsp;
                        <button className="btn btn-primary" onClick={props.openRegister}>Click here</button>
                    </div>
                </div>
            </div>
        </div>
    )
}