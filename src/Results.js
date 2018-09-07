import React, { Component } from "react"; 
import { Link } from 'react-router-dom';

class Results extends Component {

    constructor(){
        super();
        this.state = {
            endOfGame: false,

        }
    }

    // if the end is reached change questionProgress to 0 
    componentDidMount(){
        if (this.props.questionProgress === 9){
            this.props.resetQuestions();
            this.setState({
                endOfGame: true
            })
        } else {
            this.setState({
                endOfGame: false
            })
        }
    }
    // checking if we're done the questions in the array 
    // if it is then show another button that goes back to the landing page or go to ending page 

    render() {
        return (
            <div>
                <h1>Results</h1>
                <h2>{this.props.questions[this.props.questionProgress].correct_answer}</h2>
                {this.props.players.map((player) => {
                    return(
                        <div>
                            <h3>{player.username}</h3>
                            {player.correct 
                                ? <p>CORRECT</p>
                                : <p>wrong</p>
                            }
                            <p>{`your score is currently ${player.score}`}</p>
                        </div>
                    )
                })}
     
                {/* if it's end of the gamedo this, if it's not go to the next question */}
                {this.state.endOfGame 
                    ? <Link to="/">
                        <button>Play Again</button>
                    </Link> 
                    : <Link to="/questions">
                        <button onClick={() => { this.props.nextQuestion() }}>Next Question</button>
                    </Link>
                }

            </div>
        );
    }
}

export default Results;