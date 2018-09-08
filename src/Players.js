import React, { Component } from 'react';
import { Link } from 'react-router-dom'; 

import posed from 'react-pose';

const Container = posed.div({
    enter: { staggerChildren: 100 }
});

const Section = posed.section({
    enter: { x: 0, opacity: 1 },
    exit: { x: 50, opacity: 0 }
});

class Players extends Component {
    constructor() {
        super();
        this.state = {
           username: "player1",
           playerArray: []
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
    }

    // waits for everything to mount on component, then it cgoes through compoennt did 
    // components are mounted, then do stuff after 
    // creating an array to push players into an array 
    // each player gets pushed into an array with the values 
    // settingState so we have it locally in this Component
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

    // this is for the uder entering their name 
    // e.target.id is relevant to where the player is in the array 
    // updating the array in the state with the username inputed 
    handleChange = (e) => {
        const index = e.target.id
        const playerArray = this.state.playerArray
        playerArray[index].username = e.target.value

        this.setState ({
            playerArray
        })
    }

    // getting avatar to display on the page 
    // making sure  auser name is submited and if it's true then you can get an avatar 
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

            <Container>   
                    {/* going through how many players there are in the playerArray and mapping through it to generate a from for each of them */}
                    {/* created a form to enter username and then a random robot is generated */}
                    <h1>Trivia Options</h1>
                    {this.state.playerArray.map((player) => {
                        return (
                            <Section key={this.state.playerArray.indexOf(player)}>
                                <p>{player.playerNumber}</p>
                                <form action="">
                                    <label>enter your username</label>

                                    <input onChange={this.handleChange} id={this.state.playerArray.indexOf(player)} type="text" placeholder="enter your username"></input>

                                    <input onClick={this.submitUsername} id={this.state.playerArray.indexOf(player)} type="submit"></input>
                                </form>

                                {/* if the player inputed a username then generate a robot avatar */}
                                <div className="avatar">
                                    {player.usernameSubmit 
                                    ? <img src={`https://robohash.org/${player.username}.png`}></img>
                                    : null
                                    }
                                </div>
                            </Section>
                        )
                    })}
                
                {/* sending the info onClick so that  */}
                <Link to="/choice" >
                    <button onClick={() => {this.props.addPlayers(this.state.playerArray)}}>Submit Users</button>
                </Link>

            </Container>
            
            
        )

    }

}

export default Players;