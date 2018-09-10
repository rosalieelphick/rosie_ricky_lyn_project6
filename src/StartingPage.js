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

    buttonLabel = (e) => {
        e.preventDefault();
    }

    render() {
        return (
            <Container className="startingPageContainer">
                {/* choosing the number of players 1-4 */}
                <h1>number of players</h1>
                <Form action="">
                    
                <div className="labelContainer">
                    
                    <input className="visuallyHidden" onChange={this.handleChange} name="numberOfPlayers" type="radio" value="1" id="one"/>
                    <label className="label" htmlFor="one">1</label>

                    
                    <input className="visuallyHidden" onChange={this.handleChange} name="numberOfPlayers" type="radio" value="2" id="two"/>
                    <label className="label" htmlFor="two">2</label>

                    
                    <input className="visuallyHidden" onChange={this.handleChange} name="numberOfPlayers" type="radio" value="3" id="three"/>
                    <label className="label" htmlFor="three">3</label>

                    
                    <input className="visuallyHidden" onChange={this.handleChange} name="numberOfPlayers" type="radio" value="4" id="four"/>
                    <label className="label" htmlFor="four">4</label>

                </div>

                    {this.state.numberOfPlayers ? 

                    <Link to="/players">
                        <button className="btn" onClick={() => { this.handleSubmit()} }>submit</button>
                    </Link>

                    : null }
                    
                </Form>
            </Container>
        );
    }
};

export default StartingPage;