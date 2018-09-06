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

    checkAnswer = () => {
        const answer = this.props.questions[this.state.questionNumber].correct_answer;
        if (this.state.chosenAnswer === answer) {
            console.log("Correct");
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
                        {this.props.questions[this.state.questionNumber].question}
                    </p>
                : null}

                
                <form>
                    {this.props.questions[0]
                        ? this.props.questions[this.state.questionNumber].allChoices.map((answer, i) => { 
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
                </form>

             
             <Link to="/results" >
                    <button onClick={() => this.checkAnswer()}>Submit</button>
             </Link>

            </div>
        );
    }
};

export default Questions;