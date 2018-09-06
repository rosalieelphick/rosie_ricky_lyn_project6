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
        this.setState({
            categoryValue: e.target.value
        })
    }

    handleChangeDifficulty = (e) => {
        e.preventDefault();
        this.setState({
            difficultyValue: e.target.value
        })
        
    }

    handleSubmit = (e) => {
        this.props.getQuestions(this.state.categoryValue, this.state.difficultyValue)
    }

    render(){
        return(
            <div>
                <section>
                    <h1>Choose a category</h1>                    
                    <form action="">
                        <label htmlFor="animals"></label>
                        <input onChange={this.handleChangeCategory} type="radio" value="27" id="animals"/>

                        <label htmlFor="mythology"></label>
                        <input onChange={this.handleChangeCategory} type="radio" value="27" id="mythology"/>

                        <label htmlFor="history"></label>
                        <input onChange={this.handleChangeCategory} type="radio" value="27" id="history"/>

                        <label htmlFor="sports"></label>
                        <input onChange={this.handleChangeCategory} type="radio" value="27" id="sports"/>

                        <label htmlFor="politics"></label>
                        <input onChange={this.handleChangeCategory} type="radio" value="27"id="politics"/>
                    </form>
                    {/* <button value="27" className="categoryButton" onClick={this.handleClickCategory}>Animals</button>
                    <button value="20" className="categoryButton" onClick={this.handleClickCategory}>Mythology</button>
                    <button value="23" className="categoryButton" onClick={this.handleClickCategory}>History</button>
                    <button value="21" className="categoryButton" onClick={this.handleClickCategory}>Sports</button>
                    <button value="24" className="categoryButton" onClick={this.handleClickCategory}>Politics</button> */}

                </section>
                
                <section>
                    <h1>Choose your difficulty level</h1>
                    {/* <button value="easy" className="difficultyButton" onClick={this.handleClickDifficulty}>Easy</button>
                    <button value="medium" className="difficultyButton" onClick={this.handleClickDifficulty}>Medium</button>
                    <button value="hard" className="difficultyButton" onClick={this.handleClickDifficulty}>Hard</button> */}
                    <form action="">
                        <input onChange={this.handleChangeDifficulty} type="radio" value="easy"/>
                        <input onChange={this.handleChangeDifficulty} type="radio" value="medium"/>
                        <input onChange={this.handleChangeDifficulty} type="radio" value="hard"/>
                    </form>

                </section>


                {/* <Link to="/players">
                    <button onClick={() => { this.handleSubmit() }}>submit</button>
                </Link> */}
                <Link to="/questions">
                    <button onClick={() => { this.handleSubmit()}} >Submit</button>
                </Link>
            </div>
        );
    }
}

export default Choice;
