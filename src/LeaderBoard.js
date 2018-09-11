import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import firebase from "firebase";
import "./leaderBoard.css";


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
            
            this.setState({ users });
        })
    }

    render() {
        return (
            <div className="leaderBoard">
                <h1>Leader Board</h1>
                <h2>User</h2>
                <div className="userStats">
                    {this.state.users.map((user, i) => {
                        return (
                            <div className="badges">
                                <h3>#{i + 1}. {user.username}</h3>
                                <img src={`https://robohash.org/${user.username}.png`} alt=""/>
                                <p>Score: {user.score}</p>
                                {user.badge && <p>Badges: {user.badge}</p>}
                            </div>                            
                        )
                    })}
                </div>
            </div>
        );
    }
};

export default LeaderBoard;