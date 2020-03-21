import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import HomePage from './HomePage/';
import LoginPage from './LoginPage/';
import LeaderBoard from './LeaderBoard/';
import AddPoll from './AddPoll/';
import QuestionDetail from './QuestionDetail/';
import NotFound from './404/';
import PrivateRoute from './PrivateRoute/';
import { handleInitialData } from '../actions';

class App extends Component {
  
  componentDidMount() {
    document.title = "Would You Rather"
    this.props.dispatch(handleInitialData())
  }
  
  render() {
    const { loggedIn } = this.props;
    
    return (
       <Router>
        <Switch>
          <PrivateRoute exact path="/" component={HomePage} loggedIn={loggedIn}/>
          <Route exact path="/login" component={LoginPage} loggedIn={loggedIn}/>
          <PrivateRoute exact path="/leaderboard" component={LeaderBoard} loggedIn={loggedIn}/>
          <PrivateRoute exact path="/add" component={AddPoll} loggedIn={loggedIn}/>
          {Object.keys(this.props.questions).map(
            (keyName, i) => (
              <PrivateRoute exact path={"/questions/"+this.props.questions[keyName].id} key={this.props.questions[keyName].id} loggedIn={loggedIn} component={QuestionDetail} />
            )
          )}
          <PrivateRoute component={NotFound} loggedIn={loggedIn}/>
        </Switch>
	   </Router>  
    );
  }
}

const mapStateToProps = ({ users, loggedIn, autheduser, questions }) => {
  return {
	  loggedIn: autheduser ? autheduser.loggedIn : false,
    users: users,
    questions: questions
  }
};

export default connect(mapStateToProps)(App);