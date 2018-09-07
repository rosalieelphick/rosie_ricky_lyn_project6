import React, { Component } from "react";

class Results extends Component {
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
            </div>
        );
    }
}

export default Results;