import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';


class LandingPage extends Component {
    render() {
        return (

            <div>
                {/* link that goies to start page */}
                <Link to="/start">
                    <button>start playing</button>
                </Link>
                {/* link that goes to leaderboard page */}
                <Link to="/leaderboard">
                    <button>Leader board</button>
                </Link> 
            </div>
            
        );
    }
};

export default LandingPage;