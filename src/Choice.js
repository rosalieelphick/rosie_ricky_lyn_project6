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
            <Container className="choiceContainer">

                <div className="containerWrapper">

                <h1>Trivia Options</h1>

                <Section className="categorySection labelContainer clearfix">
                    <h2>Category</h2>                    
                    <form className="clearfix" action="">
                        <input className="visuallyHidden" onChange={this.handleChangeCategory} name="categoryChoice" type="radio" value="27" id="animals"/>
                        <label className="label" htmlFor="animals">Animals</label>

                        <input className="visuallyHidden" onChange={this.handleChangeCategory} name="categoryChoice" type="radio" value="9" id="general" />
                        <label className="label" htmlFor="general">General</label>
        
                        <input className="visuallyHidden" onChange={this.handleChangeCategory} name="categoryChoice" type="radio" value="18" id="mythology"/>
                        <label className="label" htmlFor="mythology">Computers</label>

                        <input className="visuallyHidden" onChange={this.handleChangeCategory} name="categoryChoice" type="radio" value="23" id="history"/>
                        <label className="label" htmlFor="history">History</label>

                        <input className="visuallyHidden" onChange={this.handleChangeCategory} name="categoryChoice" type="radio" value="11" id="sports"/>
                        <label className="label" htmlFor="sports">Film</label>

                        <input className="visuallyHidden" onChange={this.handleChangeCategory} name="categoryChoice" type="radio" value="24" id="politics"/>
                        <label className="label" htmlFor="politics">Politics</label>
                    </form>

                </Section>                
                
                <Section className="difficultySection labelContainer clearfix">
                    <h2>Difficulty Level</h2>

                        <form className="clearfix" action="">
                        <input className="visuallyHidden" onChange={this.handleChangeDifficulty} name="valueChoice" type="radio" value="easy" id="easy"/>
                        <label className="label" htmlFor="easy">Easy</label>

                        <input className="visuallyHidden" onChange={this.handleChangeDifficulty} name="valueChoice" type="radio" value="medium" id="medium"/>
                        <label className="label" htmlFor="medium">Medium</label>

                        <input className="visuallyHidden" onChange={this.handleChangeDifficulty} name="valueChoice" type="radio" value="hard" id="hard"/>
                        <label className="label" htmlFor="hard">Hard</label>
                    </form>

                </Section>

                {this.state.difficultyValue ? 

                <Link to="/questions">
                    <button className="btn" onClick={() => {this.handleSubmit()}}>Submit</button>
                </Link>

                : null }

                </div>

            </Container>
        );
    }
}

export default Choice;
