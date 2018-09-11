import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import firebase from "firebase";
// import "./leaderBoard.css"; 


class LeaderBoard extends Component {

    constructor() {
        super();
        this.state = {
            users: [],
        }
    }

    componentDidMount() {
        const dbRef = firebase.database().ref("users");

        dbRef.on("value", (snapshot) => {
            let users = Object.entries(snapshot.val());

            users = users.filter(user => user[1].score > 0)
                .map(user => user[1])
                .sort((a, b) => b.score - a.score);
                
                // return only top 9 

            this.setState({ users });
        })
    }

    render() {
        return (
            <div className="leaderBoard">
                <h1>Leader Board</h1>
                <div className="userStats">
                    {this.state.users.map((user, i) => {
                        return(i < 12 ? 
                            <div className="badges labelContainer">
                                    <h3>#{i + 1}. {user.username}</h3>
                                <div className="leaderboardAvatar">
                                    <img src={`https://robohash.org/${user.username}.png`} alt=""/>
                                </div>
                                <div className="scoreBadge">
                                    <p>Score: {user.score}</p>
                                    {/* {user.badge && <p>Badges: {user.badge}</p>} */}

                                    {user.badge ?

                                        <div>
                                            {user.badge.map((badge) => {
                                                return <img className="badgeImage" src={require("./assets/badge.png")}/>  
                                            })}
                                        </div>   
                                        
                                    : null }

                                </div>
                            </div> : null)
                        })}
                        <Link to="/start">
                            <button className="btn">Start playing</button>
                        </Link> 
                    </div>     
                </div>
        );
    }
};

export default LeaderBoard;