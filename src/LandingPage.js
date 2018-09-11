import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Typing from "react-typing-animation"


class LandingPage extends Component {
    render() {
        return (
            <div className="landingPage">
                <Typing speed={130}>
                    <h1>Robot Trivia</h1>
                </Typing>
                <img src={require("./assets/robotsEight.png")} alt=""/>
                <div className="labelContainer">
                    <Link to="/start">
                        <button className="label">Start Playing</button>
                    </Link>

                    <Link to="/leaderboard">
                        <button className="label">Leaderboard</button>
                    </Link> 
                </div>
            </div>      
        );
    }
};

export default LandingPage;