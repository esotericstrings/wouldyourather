import React, { Component } from 'react';
import './index.css';
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import Header from '../Header';
import Question from '../Question';


class HomePage extends Component {
  constructor(props) {
    super(props);

    document.title = "Dashboard | Would You Rather"
    this.state = {
      showAnswered: false,
    }
  }


  filterAnswers = function(answered) {
    this.setState(function() {
      return {
        showAnswered: answered
      };
    });
  }
  render() {
    const { questions, autheduser } = this.props;
    const showAnswered = this.state.showAnswered;
    const questionsArray = Object.keys(questions).map((key) => questions[key]);
    const filteredQuestions = questionsArray.filter(function(question) {
      const contains = question.optionOne.votes.indexOf(autheduser.id) > -1 ||
        question.optionTwo.votes.indexOf(autheduser.id) > -1;
        return showAnswered ? contains : !contains;
    });
    const sortedQuestions = filteredQuestions.sort((a, b) => b.timestamp - a.timestamp);

    return (
      <div>
      <Header/>
      <div className='wrapper'>
        <div className='btn-group'>
          <div className={!showAnswered ? 'btn-lft active' : 'btn-lft'}
              onClick={(e) => this.filterAnswers(false)}
            >
              Unanswered
            </div>
            <div className={showAnswered ? 'btn-rght active' : 'btn-rght'}
              onClick={(e) => this.filterAnswers(true)}
            >
              Answered
            </div>
          </div>
          <ul className='question-list'>
            {sortedQuestions.map((question) => (
              <li key={question.id}>
                <Question question={question} view="basic" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
function mapStateToProps({ autheduser, questions, users }) {
  return {
    autheduser,
    questions,
    users
  };
}
export default withRouter(connect(mapStateToProps)(HomePage))