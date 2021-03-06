import React, { Component } from 'react';
import {Link} from "react-router-dom"; 
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
            position: [50, 150, 250, 350],
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
        arrayClone[player + 1] = 50;

        this.setState({
            position: arrayClone
        })
    }

    render() {
        return (
            <Container className="questionsPageContainer">
                {/* <header className="questionsHeader"> */}
                
                    <h1>question #{this.props.questionProgress + 1}</h1>
                {/* </header> */}
                
            
                <Section>
                    
                <div className="hostQuestion">
                    {/* <img src={require("./assets/roboHostEdit2.png")} alt="" /> */}
                    
                    {this.props.questions[0]
                            ? <Typing speed={10}><p className="speechBubble">
                            {this.props.questions[this.props.questionProgress].question}
                        </p></Typing>
                    : null}
                    {this.state.allAnswersSubmitted
                        ? <Link to="/results" >
                            <button className="btn submitAnswerBtn" onClick={() => { this.resetSubmit() }}>Submit All</button>
                        </Link>
                        : null
                    }
                </div>
                <div className="players">
                    {this.props.players.map((player, i) => {
                        return(
                            <div className="answersContainer">
                                <div className={`player player${i + 1}`}
                                // className={`player${i + 1}`}
                                style={{left: `${this.state.position[i]}%`}}
                                >
                                    <form key={player.username} 
                                        className="playerAnswers"
                                        // className={`player player${i + 1}`}
                                        // style={{left: `${this.state.position[i]}%`}}
                                        >
                                        {this.props.questions[0]
                                            ? this.props.questions[this.props.questionProgress].allChoices.map((answer, j) => { 
                                                return(answer && (
                                                        <div className="answers">
                                                            <input 
                                                                id={`${player.username}${j}`} 
                                                                // style={{ display: 'block' }}
                                                                type="radio" 
                                                                name={`multipleChoice${i}`}
                                                                onChange={this.handleChange}
                                                                value={answer}
                                                                className="eachChoice"
                                                            />  
                                                            <label className="label" htmlFor={`${player.username}${j}`} key={j} > 
                                                            {/* {choice[j]}:  */}
                                                            {answer} 
                                                            </label>
                                                        </div>
                                                )) 
                                            })
                                        : null}
                                    </form>
                                    
                                    <div className="playerSubmit" 
                                        // className={`player${i + 1}`}
                                        // style={{ left: `${this.state.position[i]}%` }}
                                    >
                                        <h2>{player.username}</h2>
                                        <img src={`https://robohash.org/${player.username}.png`} alt="" />
                                        <button className="btn" id={player.username} onClick={(e) => {
                                            this.checkAnswer(e, i);
                                            this.nextPlayer(i);
                                        }}>Submit</button>
                                    </div>
                                </div> 
                            </div>
                        )
                    })}
                </div>

            {/* {this.state.allAnswersSubmitted 
                ? <Link to="/results" >
                    <button className="btn submitAnswerBtn" onClick={() => {this.resetSubmit()}}>Submit All</button>
                </Link>
                : null
            } */}
             
            </Section>
            {/* </header> */}
            </Container>
        );
    }
};

export default Questions;