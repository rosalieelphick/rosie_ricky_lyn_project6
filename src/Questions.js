import React, { Component } from 'react';
import {Link} from "react-router-dom"; 
import './questions.css'
import posed from 'react-pose';
import Typing from "react-typing-animation"

const Container = posed.div({
    enter: { staggerChildren: 50 }
});

const Section = posed.section({
    enter: { x: 0, opacity: 1, beforeChildren: true },
    exit: { x: 50, opacity: 0 }
});


const choice = ["A", "B", "C", "D"]

class Questions extends Component {
    constructor(){
        super();
        this.state = {
            questionNumber: 0,
            chosenAnswer: "",
            position: [0, 100, 200, 300],
        }
    }

    componentDidMount = () => {
        console.log(this.props.questions)
    }

    checkAnswer = (e, i) => {
        e.preventDefault();
        const answer = this.props.questions[this.props.questionProgress].correct_answer;
        console.log(e.target.id);

        if (this.state.chosenAnswer === answer) {
            console.log("Correct");
            this.props.scoreCount(e.target.id, i);
            
        } else {
            console.log(`Wrong the answer is: ${answer}`);
        }

        // array clone that goes into playersArray
        const arrayClone = Array.from(this.props.players);
        arrayClone[i].answerSubmitted = true
        this.setState({
            players: arrayClone
        }, () => {
            this.setState({
                allAnswersSubmitted: this.state.players.every(this.allAnswersSubmitted)
            })
        })
    }

    allAnswersSubmitted = (players) => {
        return players.answerSubmitted
    }

    handleChange = (e) => {
        this.setState({
            chosenAnswer: e.target.value
        })
    }

    resetSubmit = () => {
        const arrayClone = Array.from(this.props.players);
        arrayClone.forEach((player) => {
            player.answerSubmitted = false
        })
        this.setState({
            allAnswersSubmitted: false,
            playerArray: arrayClone
        })
    }

    nextPlayer = (player) => {
        const arrayClone = Array.from(this.state.position);
        arrayClone[player] = -100;
        arrayClone[player + 1] = 0;

        this.setState({
            position: arrayClone
        })
    }

    render() {
        return (
            <Container className="questionsPage">

                <header className="questionsHeader">
                    <h1>Here are your questions</h1>
                </header>

                <Section>
                <div className="hostQuestion">
                    {/* <img src={require("./assets/roboHostEdit2.png")} alt="" /> */}
                    
                    {this.props.questions[0]
                        ? <p>
                            {this.props.questions[this.props.questionProgress].question}
                        </p>
                    : null}
                </div>
                <div className="players">
                    {this.props.players.map((player, i) => {
                        return(
                            
                            <form key={player.username} 
                                className={`player player${i + 1}`}
                                style={{left: `${this.state.position[i]}%`}}
                                >
                                <img src={`https://robohash.org/${player.username}.png`} alt="" />
                                <h2>{player.username}</h2>

                                {this.props.questions[0]
                                    ? this.props.questions[this.props.questionProgress].allChoices.map((answer, j) => { 
                                        return(answer && (
                                            <div className="choice">
                                                <label htmlFor={`${player.username}${j}`} key={j}> {choice[j]}: {answer} </label>
                                                <input 
                                                    id={`${player.username}${j}`} 
                                                    type="radio" 
                                                    name={`multipleChoice${i}`}
                                                    onChange={this.handleChange}
                                                    value={answer}
                                                />
                                            </div>
                                        )) 
                                    })
                                : null}

                                <button id={player.username} onClick={(e) => {
                                    this.checkAnswer(e, i);
                                    this.nextPlayer(i);
                                }}>Submit</button>
                            </form>
                        )
                    })}
                </div>

                {this.state.allAnswersSubmitted 
                    ? <Link to="/results" >
                        <button onClick={() => {this.resetSubmit()}}>Submit All</button>
                    </Link>
                    : null
                }
                
                </Section>

            </Container>
        );
    }
};

export default Questions;