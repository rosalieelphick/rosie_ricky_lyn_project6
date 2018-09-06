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
import Questions from './Questions';

class App extends Component {

  constructor(){
    super();
    this.state = {
      questions: [],
      difficulty: "easy",
      category: "23", 
      numberOfPlayers: "",
      promise:{}
    }
  }

  getQuestions = (category, difficulty) => {
   const apiRequest = axios.get("https://opentdb.com/api.php?", {
      params: {
        amount: 10,
        category: category,
        difficulty: difficulty,
        // type: "multiple"
      }
    })
    apiRequest.then(({ data }) => {
      console.log(data.results);
      this.setState({
        questions: data.results,
      })
    })
    this.setState({
      promise: apiRequest
    })
  }

  // async function getData() {
  //   const getQuestions = await getQuestions();
  //   console.log(getQuestions);
    
  // }

  // getData();

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
          <Route exact path="/players" component={Players}/ >
          <Route exact path="/choice" render={(props) => <Choice {...props} getQuestions={this.getQuestions} /> } />
  <Route exact path="/questions" render={(props) => <Questions {...props} questions={this.state.questions} promise={this.state.promise}/> } />

          {/* <StartingPage submitPlayers={this.submitPlayers}/> */}

          

          {/* <button onClick={this.getQuestions}>Button</button> */}
          {/* <Choice category={this.state.category} difficulty={this.state.difficulty} questions={this.state.questions}/> */}
        </div>
      </Router>
    );
  }
}

export default App;
