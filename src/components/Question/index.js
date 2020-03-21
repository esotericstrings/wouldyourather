import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions/questions';
import './index.css'

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: 0,
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = function(option) {
    this.setState({
      answer: option === 1 ? 'optionOne' : 'optionTwo'
    });
  }

  handleSubmit(event) {
    const { answerQuestion, autheduser, question } = this.props;
    if ( this.state.answer !== 0 && question.optionOne.votes.indexOf(autheduser.id)  === -1 && question.optionTwo.votes.indexOf(autheduser.id) === -1) {
      answerQuestion(autheduser, question.id, this.state.answer);
    }
  }

  render() {
    const { autheduser, users, question, view  } = this.props;
    const answered = (question.optionOne.votes.indexOf(autheduser.id) > -1 || question.optionTwo.votes.indexOf(autheduser.id) > -1);

    return (
      <div className="question">
          <div className='user-image'>
            <p>{users[question.author].name} {answered ? "asked:" : "asks:"}</p>
            <img className='avatar' src={users[question.author].avatarURL} width="140px" height="140px" alt={users[autheduser.id].name}/>
          </div>

		    <div className="question-detail">
          { (view ==='detail' && answered) ? <h2>Results</h2>: <p>Would you rather</p>}
          
          <div className={
              question.optionOne.votes.indexOf(autheduser.id) > -1
              ? 'answered option-one' :
              ( view ==='detail' && !answered && this.state.answer === 'optionOne') ?
              'selected option-one'
                : 'option-one'
            } onClick={(e) => this.handleChange(1)}>
              { (view ==='detail' && answered) ? "Would you rather "+question.optionOne.text+"?" : question.optionOne.text } <br/>
              { (view ==='detail' && answered) ? question.optionOne.votes.length+ " out of " + (question.optionOne.votes.length + question.optionTwo.votes.length)+" votes" : ''}
          </div>

          <div className={
              question.optionTwo.votes.indexOf(autheduser.id) > -1
              ? 'answered option-two' :
              ( view ==='detail' &&  !answered && this.state.answer === 'optionTwo') ?
              'selected option-two'
                : 'option-two'
            }  onClick={(event) => this.handleChange(2)}>
              { (view ==='detail' && answered) ? "Would you rather "+question.optionTwo.text+"?" : question.optionTwo.text } <br/>
              { (view ==='detail' && answered) ? question.optionTwo.votes.length+ " out of " + (question.optionOne.votes.length + question.optionTwo.votes.length)+" votes" : ''}
          </div>

          { view ==='basic' ? <Link className="results-link" to={"/questions/"+question.id}>View Poll</Link> : ''}
          { ( view ==='detail' && !answered ) ? <button onClick={(event) => this.handleSubmit()}>Submit</button> : ''}

        </div>
      </div>
    );
  }
}

function mapStateToProps({ autheduser, users }) {
  return {
    autheduser,
    users
  };
}

export default connect(mapStateToProps, actions)(Question);