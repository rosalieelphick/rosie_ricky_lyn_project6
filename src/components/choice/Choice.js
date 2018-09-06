// get info from app.js using state and props
// get player(s) to choose categroy 
// get player(s) to choose difficulty  

// what states do we need?
// http://react.tips/radio-buttons-in-reactjs/  

import React, { Component } from "react"
import { Link } from 'react-router-dom';

class Choice extends Component {
    constructor(){
        super();
        this.state = {
            categoryValue: "",
            difficultyValue: "",
        }
    }

    handleChangeCategory = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        
        this.setState({
            categoryValue: e.target.value
        })
    }

    handleClickDifficulty = (e) => {
        e.preventDefault();
        this.setState({
            difficultyValue: e.target.value
        })
        
    }

    handleChangeDifficulty = (e) => {
        this.props.getQuestions(this.state.categoryValue, this.state.difficultyValue)
    }

    handleSubmit = (e) => {
        e.preventDefault();
    }

    render(){
        return(
            <div>
                <section>
                    <h1>Choose a category</h1>                    
                    <form onSubmit={this.handleSubmit} action="">

                        {/* <input type="radio" name="category" value="770" id="music" class="category">
                            <label for="music"><i class="fas fa-music"></i> Pop Music</label> */}
                        <label htmlFor="animals">Animals</label>
                        <input onChange={this.handleChangeCategory} type="radio" value="27" id="animals"/>

                        <label htmlFor="mythology">Computers</label>
                        <input onChange={this.handleChangeCategory} type="radio" value="18" id="mythology"/>

                        <label htmlFor="history">History</label>
                        <input onChange={this.handleChangeCategory} type="radio" value="23" id="history"/>

                        <label htmlFor="sports">Film</label>
                        <input onChange={this.handleChangeCategory} type="radio" value="11" id="sports"/>

                        <label htmlFor="politics">Politics</label>
                        <input onChange={this.handleChangeCategory} type="radio" value="24"id="politics"/>
                    </form>
                    

                </section>
                
                <section>
                    <h1>Choose your difficulty level</h1>

                    <form onSubmit={this.handleSubmit} action="">

                        <label htmlFor="easy">Easy</label>
                        <input onChange={this.handleChangeDifficulty} type="radio" value="easy" id="easy"/>

                        <label htmlFor="medium">Medium</label>
                        <input onChange={this.handleChangeDifficulty} type="radio" value="medium" id="medium"/>

                        <label htmlFor="hard">Hard</label>
                        <input onChange={this.handleChangeDifficulty} type="radio" value="hard" id="hard"/>
                    </form>

                </section>

                <Link to="/questions">
                    <button>Submit</button>
                </Link>
            </div>
        );
    }
}

export default Choice;
