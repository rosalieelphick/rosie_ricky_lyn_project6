import React, { Component } from 'react';
// import './App.css';
// import './styles/partials/main.css'
import './partials/main.css'
import './questions.css'
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
      let questions = this.combineChoices(data.results);  

      console.log("all the questions")
      console.log(questions)

      // console.log(data.results);
      
      this.setState({
        questions,
        // newQuestions: emptyArray
      })

      // ===============
      // REGEX STUFF STARTS 
      // ===============

      // FOR QUESTIONS 

      // const doubleQuoteRegex = /(&quot;)/g
      const doubleQuoteRegex = /(&quot;)+|(&ldquo)+|(&rdquo;)/g;
      const singleQuoteRegex = /(&#039;)/g;

      // &ldquo = quote add to double quotes
      //,&rdquo; = double quote

      // clone the original array with the questions 
      // filter the cloned array so it doesn't have &quot; anymore 
      // set the state of that new filtered array 
      // take that new filtered array and filter so it doesn't have &#039; anymore 
      // set the state of questions so that 

      // cloning and then mapping through each question 
      const clonedArayOne = Array.from(this.state.questions)
      const eachQuestion = clonedArayOne.map(question => question.question);

      // filtering through /(&quot;)/g
      let filteredArrayOne = [];
      let filtredQuestionsOne;
      eachQuestion.forEach((item) => {
        filtredQuestionsOne = item.replace(doubleQuoteRegex, '"');
        filteredArrayOne.push(filtredQuestionsOne)
      })

      // filtering through /(&#039;)/g
      let filteredArrayTwo = []
      let filtredQuestionsTwo;
        filteredArrayOne.forEach((item) => {
          filtredQuestionsTwo = item.replace(singleQuoteRegex, "'")
          filteredArrayTwo.push(filtredQuestionsTwo)
        })

      // putting the filtered questions back 
      // ???how come it seems like it's manipulating the question right away
      let clonedArray = Array.from(this.state.questions);      
      for (let i = 0; i <= (clonedArray.length -1); i++){
        clonedArray[i].question = filteredArrayTwo[i]
      }

      this.setState({
        questions: clonedArray
      })



      // FILTERIGN RIGHT ANSWER
      // const clonedForRightAnswer = Array.from(this.state.questions);      
      // const eachCorrectAnswer = clonedForRightAnswer.map(answer => answer.correct_answer);
      
      // const allChoices = Array.from(question.incorrect_answers);
      // const clonedAnswers = Array.from(this.state.questions.allChoices)
      const clonedAnswers = data.results.allChoices
      console.log('cloned answers');
      console.log(clonedAnswers);
      

      let filteredAnswer = [];
      let filteredAnswerOne;
      


      // let filteredAnswer = [];
      // let filteredAnswerOne; 
      // eachCorrectAnswer.forEach((item) => {
      //   filteredAnswerOne = item.replace(doubleQuoteRegex, '"');
      //   filteredAnswer.push(filteredAnswerOne)
      // })

      // let filteredAnswerSingle =[];
      // let filteredAnswerTwo;
      // filteredAnswer.forEach((item) => {
      //   filteredAnswerTwo = item.replace(singleQuoteRegex, "'");
      //   filteredAnswerSingle.push(filteredAnswerTwo)
      // })

      // // replace the correct answer in the questions object
      // let clonedForRightAnswerLast = Array.from(this.state.questions)
      // for (let i = 0; i <= (clonedForRightAnswerLast.length - 1); i++){
      //   clonedForRightAnswerLast[i].correct_answer = filteredAnswerSingle[i]
      // }

      // // FILTERING WRONG ANSWERS
      //   const clonedArrayWrong = Array.from(this.state.questions);
      //   // here we get 10 arrays of all the wrong answers 
      //   const allWrongAnswers = clonedArrayWrong.map(answer => answer.incorrect_answers)
      //   // we need to map through each of the 10 arrays and then filter the wrong answers 
      //   console.log("wrong answer")
      //   console.log(allWrongAnswers);
      
      // this.setState({
      //   questions: clonedForRightAnswerLast
      // })

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
  
// FILTER THROUGH combined choices too 
  combineChoices = (questions) => {
    const newQuestions = questions.map((question) => {
      const allChoices = Array.from(question.incorrect_answers);
      allChoices.push(question.correct_answer);
      allChoices.sort(() => .5 - Math.random());
      question.allChoices = allChoices;

      // ==============
      // REGEX FILTERING ANSWER
      // ==============
      const doubleQuoteRegex = /(&quot;)+|(&ldquo)/g;
      const singleQuoteRegex = /(&#039;)/g;

      // let filteredAnswer = [];
      // let filteredAnswerOne;
      //   allChoices.forEach((item) => {
      //   filteredAnswerOne = item.replace(doubleQuoteRegex, '"');
      //   filteredAnswer.push(filteredAnswerOne)
      // })

      // let filteredAnswerSingle = [];
      // let filteredAnswerTwo;
      //   filteredAnswer.forEach((item) => {
      //   filteredAnswerTwo = item.replace(singleQuoteRegex, "'");
      //   filteredAnswerSingle.push(filteredAnswerTwo)
      // })

      // // console.log('filtered answers all');
      // // console.log(filteredAnswerSingle)
      
      // const clonedArray = Array.from(this.state.questions)
      // console.log(clonedArray)
      // for (let i = 0; i <= (clonedArray.length -1); i++){
      //   clonedArray[i] = filteredAnswerSingle[i]
      // }

      // console.log('filtered cloned array for quest');
      // console.log(clonedArray);
    
      return question;
    })
    return newQuestions;
  }

  // info from the props from the StartingPage where users pick the number of players (1-4) that are gonna play
  submitPlayers = (numberOfPlayers) => {
    // console.log(numberOfPlayers)
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
