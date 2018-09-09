import React, { Component } from 'react';
import { Link } from 'react-router-dom'; 
import Icon from './Icon'
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
           playerArray: [],
           position: 0
        }
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

    nextPlayer = () => {
        this.setState({
            position: this.state.position - 100
        })
    }

    previousPlayer = () => {
        this.setState({
            position: this.state.position + 100
        })
    }

    render(){
        return (

            <Container className="container clearfix"> 

                <div className="containerWrapper">  

                    <h1>Players</h1>

                    <div className="playerContainer" 
                    style={{left: `${this.state.position}%`, width: `${this.state.playerArray.length * 100}%`}}
                    >

                    {this.state.playerArray.map((player, i) => {

                        return (
                        
                            <Section 
                            className={"player"}
                            style={{width: `${100 / this.state.playerArray.length}%`}}
                            key={this.state.playerArray.indexOf(player)}>

                                <div className="containerWrapper">  

                                {i !== 0 ?

                                <button
                                    className={"changePlayer previousPlayer"}
                                    onClick={(e) => { this.previousPlayer() }}>
                                    <Icon icon={"leftArrow"} />
                                </button>
                                
                                : null

                                }

                                <h2>{player.playerNumber}</h2>
                                <form action="" className={"usernameForm"}>

                                    <input className={"enterUsername"} aria-label="enter your username" onChange={this.handleChange} id={this.state.playerArray.indexOf(player)} type="text" placeholder="username"></input>

                                    <input className={"submitUsername"} onClick={this.submitUsername} id={this.state.playerArray.indexOf(player)} type="submit"></input>

                                </form>

                                <div className="avatar">
                                    {player.usernameSubmit 
                                    ? <img src={`https://robohash.org/${player.username}.png`}></img>
                                    : null
                                    }
                                </div>

                                {i !== this.state.playerArray.length - 1 ?
                                
                                <button 
                                className={"changePlayer nextPlayer"}
                                onClick={(e) => {this.nextPlayer()}}>
                                    <Icon icon={"rightArrow"} />
                                </button>

                                : null
                                    
                                }

                                </div>

                            </Section>
                        )
                    })}
                
                    </div>

                {/* sending the info onClick so that  */}
                <Link to="/choice" >
                    <button 
                        className={"submitUsers"}
                        onClick={() => { this.props.addPlayers(this.state.playerArray) }}>Submit Users
                    </button>
                </Link>

                </div>

            </Container>
            
            
        )

    }

}

export default Players;