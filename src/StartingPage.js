import React, { Component } from 'react';
// import Choice from './components/choice/Choice';
import { Link, Route } from 'react-router-dom'; 

import posed from 'react-pose';

const Container = posed.div({
    enter: { staggerChildren: 50 }
});

const Form = posed.form({
    enter: { x: 0, opacity: 1, beforeChildren: true},
    exit: { x: 50, opacity: 0 }
});


class StartingPage extends Component {
    constructor() {
        super();
        this.state = {
            numberOfPlayers: ""
        }
    }

    // send a function through a props to App.js 
    handleSubmit = (e) => {
        this.props.submitPlayers(this.state.numberOfPlayers)
    }

    // getting the value that the user(s) chose 
    // and seeing the state for numberOfPlayers in the constructor
    handleChange = (e) => {
        this.setState({
            numberOfPlayers: e.target.value
        })
    }

    render() {
        return (
            <Container>
                {/* choosing the number of players 1-4 */}
                <h1>select number of players</h1>
                <Form action="">
                    <label htmlFor="one">One player</label>
                    <input onChange={this.handleChange} name="numberOfPlayers" type="radio" value="1" id="one"/>

                    <label htmlFor="two">Two players</label>
                    <input onChange={this.handleChange} name="numberOfPlayers" type="radio" value="2" id="two"/>

                    <label htmlFor="three">Three players</label>
                    <input onChange={this.handleChange} name="numberOfPlayers" type="radio" value="3" id="three"/>

                    <label htmlFor="four">Four players</label>
                    <input onChange={this.handleChange} name="numberOfPlayers" type="radio" value="4" id="four"/>

                    {/* <Link to="/choice" onClick={this.handleSubmit}>submit</Link> */}
                    {/* want the button to submit players and link to next page, two funtionalisties */}
                    {/* on submit changes the state of numberof Players in App.js */}
                    <Link to="/players">
                        <button onClick={() => { this.handleSubmit()} }>submit</button>
                    </Link>
                    
                    <Link to="/leaderboard">
                        <button>Leader board</button>
                    </Link>
                    
                </Form>
            </Container>
        );
    }
};

export default StartingPage;