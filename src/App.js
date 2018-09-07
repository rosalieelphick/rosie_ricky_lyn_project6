import React, { Component } from 'react';
import './App.css';
import axios from "axios"; 
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';

// ===============
// COMPONENTS
// ===============

import LandingPage from './LandingPage';
import StartingPage from './StartingPage';
import Players from './Players';
import Choice from "./components/choice/Choice"
import Questions from './Questions';
import Results from "./Results"
import LeaderBoard from "./LeaderBoard"

class App extends Component {

  // setting state for the questions we get, the number of players, a promise, the players where each player is an object with their own stats, and the progress for each question 
  // what is the promise doing?
  // we can take out the difficulty and category state, right?
  constructor(){
    super();
    this.state = {
      questions: [],
      difficulty: "",
      category: "", 
      numberOfPlayers: "",
      promise:{},
      playerArray: [],
      questionProgress: 0,
    }
  }

  // getting data from our API 
  getQuestions = (category, difficulty) => {
    axios.get("https://opentdb.com/api.php?", {
      params: {
        amount: 10,
        category: category,
        difficulty: difficulty,
        // type: "multiple"
      }
    }).then(({ data }) => {
      const questions = this.combineChoices(data.results);
      this.setState({
        questions,
      })
    })
  }

  combineChoices = (questions) => {
    const newQuestions = questions.map((question) => {
      const allChoices = Array.from(question.incorrect_answers);
      allChoices.push(question.correct_answer);
      allChoices.sort(() => .5 - Math.random());
      question.allChoices = allChoices;
      return question;
    })
    return newQuestions;
  }

  // info from the props from the StartingPage where users pick the number of players (1-4) that are gonna play
  submitPlayers = (numberOfPlayers) => {
    console.log(numberOfPlayers)
    this.setState({
      numberOfPlayers
    })
  }
  
  // getting info from Players.js 
  // giving them the array for each player where they have properties of playerNumber and username
  // ???what is going on here with these brackets around playerName: where are you setting the state? Is that how you set the state inside of an object? 

  addPlayers = (playerArray) => {
    this.setState({
      playerArray
    }, () => {
      playerArray.forEach((player) => {
        const playerName = player.username
        this.setState({
          [playerName]:{score:0}
        })
      })
    })
  }


  // adding 1 to score if user gets a question right
  // cloning the array from above 
  // 
  scoreCount = (username, i) => {
    const updatedUser = this.state[username]
    updatedUser.score++;
    const arrayClone = Array.from(this.state.playerArray);
    arrayClone[i].correct = true;
    // const newScore = this.state[username].score;
    this.setState({
      [username]: updatedUser,
      playerArray: arrayClone
    })
  }

  // Routes to all the pages Components are linked to
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={LandingPage}/>
          {/* sending  */}
          {/* sending a function to the StartingPage where we figure out the number of players inside the Route */}
          {/* this is connected to the submitPlayers function above */}
          <Route exact path="/start" render={(props) => <StartingPage {...props}
          submitPlayers={this.submitPlayers} />}/>

          {/* transferring data from the Players page where each peron puts in their name and they get a robo avatar */}
          {/* connected to addPlayers function above  */}
          <Route exact path="/players" render={(props) => <Players {...props} 
          numberOfPlayers={this.state.numberOfPlayers}
          addPlayers={this.addPlayers} />} />
          
          {/* transferring data from Choice so we can get the questions */}
          {/* sending info from getQuestions to the Choice component*/}
          <Route exact path="/choice" render={(props) =>
              <Choice {...props} getQuestions={this.getQuestions} /> 
            } />
          
          {/* tranferring data from Questions page */}
          {/* giving questions, question progress, players info to other components */}
          {/* scoreCount connected to scoreCount functio above */}
          <Route 
            exact path="/questions" 
            render={(props) =>
              <Questions {...props} 
              questions={this.state.questions}
              questionProgress={this.state.questionProgress}
              players={this.state.playerArray}
              scoreCount={this.scoreCount} /> 
            } />
          
          {/* transferring data from Results page */}
          {/* giving questions, questionprogress, players info to other components */}
          {/* scoreCount connected to scoreCount functio above */}
          <Route exact path="/results" 
           render={(props) =>
            <Results {...props} 
            questions={this.state.questions}
            questionProgress={this.state.questionProgress}
            players={this.state.playerArray}
            scoreCount={this.scoreCount} /> 
          }/>

          <Route exact path="/leaderboard" component={LeaderBoard} />
        </div>
      </Router>
    );
  }
}

export default App;
