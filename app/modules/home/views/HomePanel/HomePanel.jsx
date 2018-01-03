import React, { Component } from 'react';
import './HomePanel.less';

const WALLPAPER = '/assets/' + require('assets/images/chess-king.jpg');

export default function HomePanel() {
    return (
        <div className="home-content">
            <img className="img-responsive img-rounded -custom-img" src={WALLPAPER}></img>
            <div className="-text-over-image">
                <div className="-caption">Are you ready for more?</div>
                <div className="-sub-caption">“I don’t believe in psychology. I believe in good moves.” – Bobby Fischer</div>
            </div>
            <div className="-info col-sm-offset-3 col-sm-6">
                <div className="-header">
                    <h2>About the Olympia Cup ...</h2>
                </div>
                <ul>
                    <li>This tournament is for the emerging kids who have the talent to take on the challenges.</li>
                    <li>
                        The cup is organized under
                        <div className="-organization">
                            MUMBAI SUBURBAN DISTRICT CHESS ASSOCIATION
                        </div>
                    </li>
                    <li>There are plenty of PRIZES in each category. </li>
                    <li>There are various CATEGORIES for boys and girls.</li>
                </ul>
            </div>
        </div>
    )
}