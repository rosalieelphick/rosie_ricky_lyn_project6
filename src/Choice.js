// get info from app.js using state and props
// get player(s) to choose categroy 
// get player(s) to choose difficulty  

// what states do we need?
// http://react.tips/radio-buttons-in-reactjs/  

import React, { Component } from "react"
import { Link } from 'react-router-dom';

import posed from 'react-pose';

const Container = posed.div({
    enter: { staggerChildren: 100 }
});

const Section = posed.section({
    enter: { x: 0, opacity: 1 },
    exit: { x: 50, opacity: 0 }
});


class Choice extends Component {
    constructor(){
        super();
        this.state = {
            categoryValue: "",
            difficultyValue: "",
        }
    }

    handleChangeCategory = (e) => {        
        this.setState({
            categoryValue: e.target.value
        })
    }

    // 
    handleChangeDifficulty = (e) => {
        // e.preventDefault();
        console.log(e.target.value)
        this.setState({
            difficultyValue: e.target.value
        })
    }
    
    // giving the data to App.js 
    handleSubmit = () => {
        this.props.getQuestions(this.state.categoryValue, this.state.difficultyValue)
    }

    render(){
        return(
            <Container>

                <h1>Trivia Options</h1>

                <Section>
                    <h2>Choose a category</h2>                    
                    <form action="">

                        {/* <input type="radio" name="category" value="770" id="music" class="category">
                            <label for="music"><i class="fas fa-music"></i> Pop Music</label> */}
                        <label htmlFor="animals">Animals</label>
                        <input onChange={this.handleChangeCategory} name="categoryChoice" type="radio" value="27" id="animals"/>

                        <label htmlFor="mythology">Computers</label>
                        <input onChange={this.handleChangeCategory} name="categoryChoice" type="radio" value="18" id="mythology"/>

                        <label htmlFor="history">History</label>
                        <input onChange={this.handleChangeCategory} name="categoryChoice" type="radio" value="23" id="history"/>

                        <label htmlFor="sports">Film</label>
                        <input onChange={this.handleChangeCategory} name="categoryChoice" type="radio" value="11" id="sports"/>

                        <label htmlFor="politics">Politics</label>
                        <input onChange={this.handleChangeCategory} name="categoryChoice" type="radio" value="24" id="politics"/>
                    </form>

                </Section>
                
                <Section>
                    <h2>Choose your difficulty level</h2>

                    <form action="">

                        <label htmlFor="easy">Easy</label>
                        <input onChange={this.handleChangeDifficulty} name="valueChoice" type="radio" value="easy" id="easy"/>

                        <label htmlFor="medium">Medium</label>
                        <input onChange={this.handleChangeDifficulty} name="valueChoice" type="radio" value="medium" id="medium"/>

                        <label htmlFor="hard">Hard</label>
                        <input onChange={this.handleChangeDifficulty} name="valueChoice" type="radio" value="hard" id="hard"/>
                    </form>

                </Section>

                <Link to="/questions">
                    <button onClick={() => {this.handleSubmit()}}>Submit</button>
                </Link>
            </Container>
        );
    }
}

export default Choice;
