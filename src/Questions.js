import React, { Component } from 'react';

class Questions extends Component {
    constructor(){
        super();
        this.state = {
            questionNumber: 0,
            questions: [],
        }
    }

    test = () => {
        (this.props.promise).then(({data}) => {
            console.log(data.results);
        this.setState({
            questions: data.results
        })
        })
    }

    render() {
        return (
            <div>
                <h1>Questions</h1>
                {this.test()}
                {/* {console.log(this.state.questions)} */}
                {/* {this.state.questions[0].question ? 
                    <p>{this.state.questions[0].question}</p>
                : null } */}
             
            </div>
        );
    }
};

export default Questions;