import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Typing from "react-typing-animation"


class LandingPage extends Component {
    render() {
        return (
            <div className="landingPage">
                <Typing speed={90}>
                    <h1>Welcome to Robot Trivia</h1>
                </Typing>
                <img src={require("./assets/robotsEight.png")} alt=""/>
                {/* link that goies to start page */}
                <div>
                    <Link to="/start">
                        <button className="btn">Start Playing</button>
                    </Link>
                    {/* link that goes to leaderboard page */}
                    <Link to="/leaderboard">
                            <button className="btn">Leaderboard</button>
                    </Link> 
                </div>
            </div>      
        );
    }
};

export default LandingPage;