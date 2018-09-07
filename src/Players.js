import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Players extends Component {
    constructor() {
        super();
        this.state = {
           username: "player1",
           playerArray: []
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

    componentDidMount() {
        console.log("component mounted")
        this.setState({
            numberOfPlayers: this.props.numberOfPlayers
        }, () => {
            let array = [];

            for (let i = 1; i <= this.state.numberOfPlayers; i = i + 1) {
                array.push({playerNumber:`player ${i}`, username:'', score:0})
            }

            this.setState({
                playerArray: array
            })
            
        })     
    }

    handleChange = (e) => {
        const index = e.target.id
        const playerArray = this.state.playerArray
        playerArray[index].username = e.target.value

        this.setState ({
            playerArray
        })
    }

    submitUsername = (e) => {
        e.preventDefault();
        const index = e.target.id;
        const playerArray = this.state.playerArray
        playerArray[index].usernameSubmit = true

        this.setState({
            playerArray
        })
    }

    render(){
        console.log("rendered")
        return (

            <div>

                    {this.state.playerArray.map((player) => {
                        return (
                            <div key={this.state.playerArray.indexOf(player)}>
                                <p>{player.playerNumber}</p>
                                <form action="">
                                    <label>enter your username</label>

                                    <input onChange={this.handleChange} id={this.state.playerArray.indexOf(player)} type="text" placeholder="enter your username"></input>

                                    <input onClick={this.submitUsername} id={this.state.playerArray.indexOf(player)} type="submit"></input>
                                </form>

                                <div className="avatar">
                                    {player.usernameSubmit 
                                    ? <img src={`https://robohash.org/${player.username}.png`}></img>
                                    : null
                                    }
                                </div>
                            </div>
                        )
                    })}

                <Link to="/choice" >
                    <button onClick={() => {this.props.addPlayers(this.state.playerArray)}}>Submit Users</button>
                </Link>
            </div>
            
            
        )

    }

}

export default Players;