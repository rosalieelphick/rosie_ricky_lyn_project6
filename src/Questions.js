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
                {/* first question is the first question in the array with [0] index */}
                {/* keeping track of which questionw we're on */}
                {/* checking if there are questions in array then display question if there are */}
                {this.props.questions[0]
                    ? <p>
                        {this.props.questions[this.props.questionProgress].question}
                    </p>
                : null}
                
                {/* getting the array with the players that have username, score and other properties  */}
                {/* i is to keep track of the answer each player gave  */}
                {/* mapping through the players and then mapping through all the possible answers for each player. it's a loop inside a loop */}
                {/* mapping through the possible answers: if answer isn't undefined then you can show an answer */}
                {/* undefined error if you don't check to see if we have the answer bc the answer will render first if we don't have the actual.*/}
                {/* making sure we have all the info the the API before it's rendered on the page  */}
                {this.props.players.map((player, i) => {
                    return( 
                        <form key={player.username}>
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