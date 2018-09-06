import React, { Component } from 'react';
import {Link} from "react-router-dom";

const choice = ["A", "B", "C", "D"]

class Questions extends Component {
    constructor(){
        super();
        this.state = {
            questionNumber: 0,
        }
    }

    render() {
        return (
            <div>
                <h1>Questions</h1>
                {this.props.questions[0] ? 
                    <p>
                        {this.props.questions[this.state.questionNumber].question}
                    </p> : 
                null}

                
                {this.props.questions[0] ?
                    this.props.questions[this.state.questionNumber].allChoices.map((answer, i) => { return(answer && <p key={i}>{choice[i]}: {answer}</p>) }) : 
                null}

                <form>
                    <label htmlFor="choiceA">A</label>
                    <input type="radio" name="multipleChoice" id="choiceA"/>
                    <label htmlFor="choiceB">B</label>
                    <input type="radio" name="multipleChoice" id="choiceB"/>
                    <label htmlFor="choiceC">C</label>
                    <input type="radio" name="multipleChoice" id="choiceC"/>
                    <label htmlFor="choiceD">D</label>
                    <input type="radio" name="multipleChoice" id="choiceD"/>
                </form>
             
             <Link to="/results">
                    <button>Submit</button>
             </Link>

            </div>
        );
    }
};

export default Questions;