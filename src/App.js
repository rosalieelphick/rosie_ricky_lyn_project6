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

  constructor(){
    super();
    this.state = {
      questions: [],
      difficulty: "easy",
      category: "23", 
      numberOfPlayers: "",
      promise:{},
      playerArray: []
    }
  }

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
      question.allChoices = allChoices;

      return question;
    })
    return newQuestions;
  }

  submitPlayers = (numberOfPlayers) => {
    console.log(numberOfPlayers)
    this.setState({
      numberOfPlayers
    })
  }

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

  render() {
    return (
      <Router>

        <div className="App">
          <Route exact path="/" component={LandingPage}/>

          <Route exact path="/start" render={(props) => <StartingPage {...props}
          submitPlayers={this.submitPlayers} />}/>

          <Route exact path="/players" render={(props) => <Players {...props} 
          numberOfPlayers={this.state.numberOfPlayers}
          addPlayers={this.addPlayers} />} />
            
          <Route exact path="/choice" render={(props) =>
              <Choice {...props} getQuestions={this.getQuestions} /> 
            } />

          <Route 
            exact path="/questions" 
            render={(props) =>
              <Questions {...props} questions={this.state.questions}/> 
            } />
          <Route exact path="/results" component={Results} />
          <Route exact path="/leaderboard" component={LeaderBoard} />
        </div>
      </Router>
    );
  }
}

export default App;
