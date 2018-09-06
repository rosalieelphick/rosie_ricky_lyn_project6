import React, { Component } from 'react';
// import Choice from './components/choice/Choice';
import { Link } from 'react-router-dom';


class StartingPage extends Component {
    constructor() {
        super();
        this.state = {
            numberOfPlayers: ""
        }
    }

    handleSubmit = (e) => {
        this.props.submitPlayers(this.state.numberOfPlayers)
    }

    handleChange = (e) => {
        this.setState({
            numberOfPlayers: e.target.value
        })
    }

    render() {
        return (
            <div>

                <h1>select number of players</h1>
                <form action="">
                    <input onChange={this.handleChange} name="numberOfPlayers" type="radio" value="1"/>
                    <input onChange={this.handleChange} name="numberOfPlayers" type="radio" value="2"/>
                    <input onChange={this.handleChange} name="numberOfPlayers" type="radio" value="3"/>
                    <input onChange={this.handleChange} name="numberOfPlayers" type="radio" value="4"/>

                    {/* <Link to="/choice" onClick={this.handleSubmit}>submit</Link> */}

                    <Link to="/players">
                        <button onClick={() => { this.handleSubmit()} }>submit</button>
                    </Link>
                    
                </form>
            </div>
        );
    }
};

export default StartingPage;