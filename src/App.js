import React, { Component } from 'react';
import './App.css';
import axios from "axios"

class App extends Component {

  constructor(){
    super();
    this.state = {
      questions: [],
      difficulty: "easy",
      category: "24", 
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
  // componentDidMount(){
  //   axios.get("https://opentdb.com/api.php?", {
  //     params: {
  //       amount: 10,
  //       category: this.state.category,
  //       difficulty: this.state.difficulty, 
  //       type: "multiple"
  //     }
  //   }).then(({data}) => {
  //     console.log(data.results);
  //     this.setState({
  //      questions: data.results,

  //     })
      
  //   })
  // }
  render() {
    return (
      <div className="App">
        <button onClick={this.getQuestions}>Button</button>
      </div>
    );
  }
}

export default App;
