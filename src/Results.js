import React, { Component } from "react"; 
import { Link } from 'react-router-dom';
import firebase from './firebase';
import posed from 'react-pose';
import Typing from "react-typing-animation"
import './Results.css'
import wrongImg from './assets/wrench.png'

const Container = posed.div({
    enter: { staggerChildren: 50 }
});

const Section = posed.section({
    enter: { x: 0, opacity: 1, beforeChildren: true },
    exit: { x: 50, opacity: 0 }
});


const categoryNames = {
    11: "film",
    23: "history",
    18: "computers",
    24: "politics",
    27: "animals",
    9: "general"
}

const userDbRef = firebase.database().ref("users");

class Results extends Component {

    constructor(){
        super();
        this.state = {
            endOfGame: false,
            confetti: []
        }
    }

    // if the end is reached change questionProgress to 0 
    componentDidMount(){
        this.addUser();
        this.getBadges();

        if (this.props.questionProgress === 9){
            this.updateScore()
            this.setState({
                endOfGame: true
            })
        } else {
            this.setState({
                endOfGame: false
            })
        }

        this.celebrate();
    }

    addUser = () => {
        userDbRef.once("value").then((snapshot) => {
            const databaseUsers = snapshot.val();

            this.props.players.forEach((player) => {
                let duplicate = false;
                
                for(const user in databaseUsers) {
                    const dbUsername = databaseUsers[user].username;
                        
                    if (dbUsername === player.username) {
                        duplicate = true;
                    }
                }
                if (!duplicate) {
                    userDbRef.push({
                        username: player.username,
                        score: 0,
                    });
                }
            })
        });
    }

        
        
    // checking if we're done the questions in the array 
    // if it is then show another button that goes back to the landing page or go to ending page 


    getBadges = () => {
        const difficulty = this.props.difficulty;
        const arrayClone = Array.from(this.props.players)

        arrayClone.forEach((player) => {
            // Badge Decider
            if (difficulty === "hard" && player.score === 10) {
                this.firebaseCheck(player);
            }    
        }) 
    }

    firebaseCheck = (player) => {
        const dbRef = firebase.database().ref("users");
        dbRef.on("value", (snapshot) => {
            const users = Object.values(snapshot.val());
            const keys = Object.keys(snapshot.val())
            
            const duplicateBadge = users.find(user => user.badge === this.props.category);

            if (!duplicateBadge) {
                users.forEach((user, i) => {
                    if (user.username === player.username) {
                        const thisUserDbRef = firebase.database().ref(`users/${[keys[i]]}`);
    
                        thisUserDbRef.set({
                            score: user.score,
                            username: user.username,
                            badge: categoryNames[this.props.category]
                        })
                    }
                })
            }
            console.log(snapshot.val());
            
        })
    }

    updateScore = () => {
        console.log("update score")
        const dbRef = firebase.database().ref("users");
        let databaseUsers;

        dbRef.on("value", (snapshot) => {
            databaseUsers = snapshot.val();
            
        });
        
        this.props.players.forEach((player) => {
            let scoreUpdated = false;

            for(const user in databaseUsers) {
                const dbUsername = databaseUsers[user].username;
                
                if (dbUsername === player.username && !scoreUpdated) {
                    
                    const thisUserDbRef = firebase.database().ref(`users/${[user]}`);
                    thisUserDbRef.set({
                        username: player.username,
                        score: databaseUsers[user].score + player.score,
                    })
                    scoreUpdated = true;
                }
            }
        
        })
    }

    celebrate = () => {
        const confetti = [];
        for (let i = 0; i < 50; i++) {
            confetti[i] = "";
        }
        this.setState({
            confetti
        })

    }

    render() {
        return (
            <Container className="results">
                
                <h1>Results</h1>
                <Section>
                {this.props.questions[0]
                    ? <p>
                        {this.props.questions[this.props.questionProgress].question}
                    </p>                    
                : null}

                <Typing speed={35}>
                    <h2>The answer is: {this.props.questions[this.props.questionProgress].correct_answer}</h2>
                </Typing>

                {this.props.players.map((player, i) => {
                    return(
                        <div className={`player player${i + 1}`}>
                            <h3>{player.username}</h3>
                            <div className="avatar">
                                <img src={`https://robohash.org/${player.username}.png`} alt="" />
                                
                                {player.correct 
                                    ? <div>
                                        <p className="correct">CORRECT</p>
                                        {this.state.confetti.map((eachConfetti, i) => {
                                            return <div className={`confetti confetti${i}`}></div>
                                        })}
                                    </div>
                                    : <div>
                                        <img src={wrongImg} alt="" className="wrongAnimation"/>
                                        <div className="overlay"></div>
                                        <p className="wrong">WRONG</p>
                                    </div>
                                }
                            </div>
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
                </Section>
            </Container>
        );
    }
}

export default Results;