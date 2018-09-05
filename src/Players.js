import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Players extends Component {
    constructor() {
        super();
        this.state = {
           username: "player1" 
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();


    }

    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="username"></label>

                <input onChange={this.handleChange} type="text" id="username" value={this.state.username} placeholder="submit username"/>

                <input type="submit" value="submit username" />

                <Link to="/choice" >
                <button>Submit</button>
                </Link>
            </form>
            
        )
    }

}

export default Players;