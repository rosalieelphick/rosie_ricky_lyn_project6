import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';


class LandingPage extends Component {
    render() {
        return (

            <div>
                <Link to="/start">
                    <button>start playing</button>
                </Link>
            </div>
            
        );
    }
};

export default LandingPage;