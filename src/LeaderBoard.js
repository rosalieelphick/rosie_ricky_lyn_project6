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
            // console.log(snapshot.val());
            // Change object into array
            // Display array onto screen
                // Display name and badges 

            let users = Object.entries(snapshot.val());
            console.log(users);

            users = users.map((user) => {
                const newArray = user;
                newArray[1] = Object.values(user[1]);

                return newArray;                
            })
            
            console.log(users);
            

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
                                <h3>#{i + 1}. {user[1][1]}</h3>
                                <img src={`https://robohash.org/${user[1][1]}.png`} alt=""/>
                                <p>Score: {user[1][0]}</p>
                                
                            </div>                            
                        )
                    })}
                </div>
            </div>
        );
    }
};

export default LeaderBoard;