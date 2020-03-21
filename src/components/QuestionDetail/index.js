import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/questions';
import Header from '../Header';
import Question from '../Question';

class QuestionDetail extends Component {

  render() {
    const questionId = this.props[0].location.pathname.replace('/questions/','');
    const question = this.props.questions[questionId];

    return (
        <div>
            <Header/>
            <div className='wrapper'>
            <Question question={question} view="detail"/>
        </div>
        </div>
    );
  }
}

function mapStateToProps({ users, questions, view }) {
  return {
    users,
    questions,
    view
  };
}

export default connect(mapStateToProps, actions)(QuestionDetail);