// get info from app.js using state and props
// get player(s) to choose categroy 
// get player(s) to choose difficulty 

// what states do we need?
// http://react.tips/radio-buttons-in-reactjs/ 

import React, { Component } from "react"

class Choice extends Component {
    constructor(){
        super();
        this.state = {
            isCategorySelected: false,
            isDifficultySelected: false,
            choiceClass: "",
            categoryValue: "",
            difficultyValue: "",

        }
    }

    handleClickCategory = (e) => {
        e.preventDefault();
        console.log("clicked category");
        
    }

    handleClickDifficulty = (e) => {
        e.preventDefault();
        console.log("clicked difficulty");
        
    }

    render(){
        return(
            <div>
                <section>
                    <h1>Choose a category</h1>

                    <button value="27" className="categoryButton" onClick={this.handleClickCategory}>Animals</button>

                    <button value="20" className="categoryButton" onClick={this.handleClickCategory}>Mythology</button>

                    <button value="23" className="categoryButton" onClick={this.handleClickCategory}>History</button>

                    <button value="21" className="categoryButton" onClick={this.handleClickCategory}>Sports</button>

                    <button value="24" className="categoryButton" onClick={this.handleClickCategory}>Politics</button>
                </section>
                
                <section>
                    <h1>Choose your difficulty level</h1>

                    <button value="easy" className="difficultyButton" onClick={this.handleClickDifficulty}>Easy</button>

                    <button value="medium" className="difficultyButton" onClick={this.handleClickDifficulty}>Medium</button>

                    <button value="hard" className="difficultyButton" onClick={this.handleClickDifficulty}>Hard</button>

                </section>
            </div>
        );
    }
}

export default Choice;