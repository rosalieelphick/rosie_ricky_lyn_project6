import React, { Component } from 'react';
import './App.css';
import axios from "axios";
import Players from './Players';
import StartingPage from './StartingPage';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import LandingPage from './LandingPage';

// ===============
// COMPONENTS
// ===============

import Choice from "./components/choice/Choice"

class App extends Component {

  constructor(){
    super();
    this.state = {
      questions: [],
      difficulty: "easy",
      category: "23", 
      numberOfPlayers: ""
    }
  }

  getQuestions = () => {
    axios.get("https://opentdb.com/api.php?", {
      params: {
        amount: 10,
        category: this.state.category,
        difficulty: this.state.difficulty,
        // type: "multiple"
      }
    }).then(({ data }) => {
      console.log(data.results);
      this.setState({
        questions: data.results,
      })
    })
  }

  submitPlayers = (numberOfPlayers) => {
    console.log(numberOfPlayers)
    this.setState({
      numberOfPlayers
    })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={LandingPage}/>

          <Route exact path="/start" render={(props) => <StartingPage {...props}
          submitPlayers={this.submitPlayers} />}/>
          
          <Route exact path="/choice" component={Choice} />

          {/* <StartingPage submitPlayers={this.submitPlayers}/> */}

          

          {/* <button onClick={this.getQuestions}>Button</button> */}
          {/* <Choice category={this.state.category} difficulty={this.state.difficulty} questions={this.state.questions}/> */}
        </div>
      </Router>
    );
  }
}

export default App;
