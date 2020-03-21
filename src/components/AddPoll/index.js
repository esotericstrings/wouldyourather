import React, { Component } from 'react';
import Header from '../Header';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions/questions';
import './index.css';

class AddPoll extends Component {
  constructor(props) {
    super(props);

    document.title = "Add Question | Would You Rather"
    this.state = {optionOne:'', optionTwo:'',status: 'default'};
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    if ( target.name === "option-one" ) {
      this.setState({optionOne: target.value});
    } else if ( target.name === "option-two") {
      this.setState({optionTwo: target.value});
    }  
  }


  handleSubmit(event) {
    const { addQuestion, autheduser } = this.props;
    if (this.state.optionOne !=='' && this.state.optionTwo !=='') {
      const userQuestion = {
        id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        author: autheduser.id,
        optionOne : {
            text: this.state.optionOne,
            votes : [],
        } ,
        optionTwo : {
            text: this.state.optionTwo,
            votes : [],
       },
       timestamp:  Math.round((new Date()).getTime() / 1000),
      };
      addQuestion(userQuestion, autheduser);
      this.setState({
        optionOne: '',
        optionTwo: ''
      })
      event.preventDefault();
      this.props.history.push('/');
    } else {
      this.setState({
        status: 'error'
      });
      event.preventDefault();
    }
  }

  render() {
    
    return (
      <div>
        <Header/>

        <div className={this.state.status+ " question-card wrapper"}>
          <form onSubmit={this.handleSubmit}>
            <h1>Add New Question</h1>
            <p>Would you rather...</p>
            <input type="text" name="option-one" placeholder="Enter option one here" onChange={this.handleChange} value={this.state.optionOne} className={this.state.optionOne === ''? "empty" : "default"}></input>
            {this.state.status === "error" && this.state.optionOne === '' ? <span>Input required</span> : ''}
            <p>OR</p>
            <input type="text" name="option-two" placeholder="Enter option two here"  onChange={this.handleChange} value={this.state.optionTwo} className={this.state.optionTwo === ''? "empty" : "default"}></input>
            {this.state.status === "error" && this.state.optionTwo === '' ? <span>Input required</span> : ''}
            <input type="submit" value="Submit"/>
          </form>
        </div>

      </div>
    );
  }
}

function mapStateToProps({ autheduser, questions }) {
  return {
    autheduser,
    questions
  };
}

export default withRouter(connect(mapStateToProps, actions)(AddPoll))