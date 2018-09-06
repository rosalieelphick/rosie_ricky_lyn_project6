import React, { Component } from 'react';
import {Link} from "react-router-dom";

const choice = ["A", "B", "C", "D"]

class Questions extends Component {
    constructor(){
        super();
        this.state = {
            questionNumber: 0,
            chosenAnswer: ""
        }
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
    }

    handleChange = (e) => {
        this.setState({
            chosenAnswer: e.target.value
        })
    }

    render() {
        return (
            <div>
                <h1>Questions</h1>
                {this.props.questions[0]
                    ? <p>
                        {this.props.questions[this.props.questionProgress].question}
                    </p>
                : null}

                {this.props.players.map((player, i) => {
                    return( 
                        <form key={player.username}>
                            {this.props.questions[0]
                                ? this.props.questions[this.props.questionProgress].allChoices.map((answer, i) => { 
                                    return(answer && (
                                        <div className="choice">
                                            <label htmlFor={choice[i]} key={i}> {choice[i]}: {answer} </label>
                                            <input 
                                                id={choice[i]} 
                                                type="radio" 
                                                name="multipleChoice"
                                                onChange={this.handleChange}
                                                value={answer}
                                            />
                                        </div>
                                    )) 
                                })
                            : null}
                             <button id={player.username} onClick={(e) => this.checkAnswer(e, i)}>Submit</button>
                        </form>
                      )
                })}

             
             <Link to="/results" >
                    <button>Submit All</button>
             </Link>

            </div>
        );
    }
};

export default Questions;