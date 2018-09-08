import React, { Component } from "react"; 
import { Link } from 'react-router-dom';
import firebase from './firebase';


const categoryNames = {
    11: "film",
    23: "history",
    18: "computers",
    24: "politics",
    27: "animals"
}

class Results extends Component {

    constructor(){
        super();
        this.state = {
            endOfGame: false,

        }
    }

    // if the end is reached change questionProgress to 0 
    componentDidMount(){
        this.getBadges();

        if (this.props.questionProgress === 9){
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


    getBadges = () => {
        const difficulty = this.props.difficulty;
        const arrayClone = Array.from(this.props.players)
        console.log(difficulty)

        arrayClone.forEach((player) => {
            if (difficulty === "hard" && player.score === 10) {
                this.firebaseCheck(player);
            }    
        }) 
    }


    firebaseCheck = (player) => {
        const dbRef = firebase.database().ref();
        dbRef.on("value", (snapshot) => {

            console.log(snapshot.val())
            console.log(player)
            console.log(player.username)

            if (snapshot.hasChild(player.username)) {
                // if the user name already exists in the database, check for duplicates

                const userRef = firebase.database().ref(player.username)

                userRef.on("value", (snapshot) => {
                    console.log(snapshot.val())

                    const array = Object.entries(snapshot.val())
                    console.log(array)

                    let duplicate = false;

                    array.forEach((badge) => {
                        if (badge[1] === `${categoryNames[this.props.category]} badge`) {
                            duplicate = true
                        }
                    })

                    if (duplicate != true) {
                        userRef.push(`${categoryNames[this.props.category]} badge`)
                    }
                })

            } else {
                // if the name does not exist, just push the new badge 
                
                const userRef = firebase.database().ref(player.username)
                userRef.push(`${categoryNames[this.props.category]} badge`)
            }

        })
    }

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
                        <button onClick={() => {this.props.resetQuestions()}}>Play Again</button>
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