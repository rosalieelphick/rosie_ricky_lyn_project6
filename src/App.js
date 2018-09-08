import React, { Component } from 'react';
// import './App.css';
import './partials/main.css'
import axios from "axios"; 
import { BrowserRouter, Route, Link, Switch} from 'react-router-dom';

import posed, { PoseGroup } from 'react-pose';

// ===============
// COMPONENTS
// ===============

import LandingPage from './LandingPage';
import StartingPage from './StartingPage';
import Players from './Players';
import Choice from "./Choice"
import Questions from './Questions';
import Results from "./Results"
import LeaderBoard from "./LeaderBoard"

const RouteContainer = posed.div({
  enter: { x: 0, opacity: 1, delay: 0, beforeChildren: true},
  exit: { x: 50, opacity: 0 }
});

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
      newQuestions: []
    }
  }

  // getting data from our API 
  getQuestions = (category, difficulty) => {

    this.setState({
      category: category,
      difficulty: difficulty
    })

    axios.get("https://opentdb.com/api.php?", {
      params: {
        amount: 10,
        category: category,
        difficulty: difficulty,
        // type: "multiple"
      }
    }).then(({ data }) => {
      
      // get each question in the original array 
      // then 
      let questions = this.combineChoices(data.results);  
      // ===============
      // REGEX STUFF STARTS 
      // ===============

        // let newAnswersWithoutRandomCharacters;
        // let emptyArray = [];
        // let re = /<\/?[\w\s="/.':;#-\/\?]+>|[\/\\:+="#]+/gi
        // let answersWithoutRandomCharacters = result.forEach((item) => {
        //     newAnswersWithoutRandomCharacters = item.replace(re, '');
        //     emptyArray.push(newAnswersWithoutRandomCharacters)
        // })

      // const re = /&quot;/;
      const regex = /<\/?[\w\s="/.':;#-\/\&?]+>|[\/\\:+="#]+>|[&quot;]/gi;

      // let eachQuestion = [];
      // create a clone and set state with it 
      // put all the questions back into the array 
      let eachQuestion = questions.map(question => question.question);

      let emptyArray = [];
      let newFiltredArray;
      eachQuestion.forEach((item) => {
        newFiltredArray = item.replace([/&quot;/g], '"');
        // newFiltredArray = item.replace(regex, "")
        emptyArray.push(newFiltredArray)
      })
      
      // trying to do it again with some other regex
      let arrayClone = Array.from(this.state.questions);
        arrayClone.forEach((item) => {
          // newFiltredArray = item.replace(//, "'")
        })

      // let newEmptyArray = [];

      console.log('This is the original question');
      console.log(eachQuestion);
      console.log('This is the new Filtered one');
      console.log(emptyArray);
      console.log("These are the new questions");
      console.log(this.state.newQuestions);
      
      
      this.setState({
        questions,
        newQuestions: emptyArray
      })
    })
  }

  nextQuestion = () => {
    const arrayClone = Array.from(this.state.playerArray);
    arrayClone.forEach((player) => {
      player.correct = false
    })
    this.setState({
      questionProgress: this.state.questionProgress + 1,
      playerArray: arrayClone

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
    })
  }


  // adding 1 to score if user gets a question right
  // cloning the array from above 
  // 
  scoreCount = (username, i) => {
    const arrayClone = Array.from(this.state.playerArray);
    arrayClone[i].correct = true;
    arrayClone[i].score++;
    this.setState({
      playerArray: arrayClone
    })
  }

  resetQuestions = () => {
    this.setState({
      questionProgress: 0
    })
  }

  // Routes to all the pages Components are linked to
  render() {
    return (
      <BrowserRouter>
        <Route
          render={({location}) => (
            <div className="App">

              <PoseGroup>
                <RouteContainer key={location.key}>
                  <Switch location={location}>

                    <Route exact path="/" component={LandingPage} />

                    <Route exact path="/start" render={(props) => <StartingPage {...props}
                      submitPlayers={this.submitPlayers} />} />

                    <Route exact path="/players" render={(props) => <Players {...props}
                      numberOfPlayers={this.state.numberOfPlayers}
                      addPlayers={this.addPlayers} />} />

                    <Route exact path="/choice" render={(props) =>
                      <Choice {...props} getQuestions={this.getQuestions} />
                    } />

                    <Route
                      exact path="/questions"
                      render={(props) =>
                        <Questions {...props}
                          questions={this.state.questions}
                          questionProgress={this.state.questionProgress}
                          players={this.state.playerArray}
                          scoreCount={this.scoreCount} />
                      } />

                    <Route exact path="/results"
                      render={(props) =>
                        <Results {...props}
                          questions={this.state.questions}
                          questionProgress={this.state.questionProgress}
                          players={this.state.playerArray}
                          scoreCount={this.scoreCount}
                          nextQuestion={this.nextQuestion}
                          resetQuestions={this.resetQuestions}
                          difficulty={this.state.difficulty}
                          category={this.state.category}
                        />
                      } />

                    <Route exact path="/leaderboard" component={LeaderBoard} />

                  </Switch>
                </RouteContainer>
              </PoseGroup>
              
            </div>
          )}
          
        />    
      </BrowserRouter>
    );
  }
}

export default App;
