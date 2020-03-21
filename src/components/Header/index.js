import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { clearAuthedUser } from '../../actions/users'
import './index.css';

class Header extends Component {
    render () {
	  const { users, autheduser, loggedIn } = this.props;
    return (
        <header className="App-header">
          <Link className="App-link" to='/'>Home</Link>
          <Link className="App-link" to='/add'>Add Question</Link>
          <Link className="App-link" to='/leaderboard'>Leaderboard</Link>
          {loggedIn ? <div className="user-welcome">Hello, {users[autheduser.id].name}! </div>: <span></span>}
          {loggedIn ? <div className="user-avatar"><img className='avatar' src={users[autheduser.id].avatarURL} width="40px" height="40px" alt={users[autheduser.id].name}/></div>: <span></span>}
          {loggedIn ?  <Link to='/login' onClick={() => {this.props.dispatch(clearAuthedUser())}}>Log Out</Link> : <Link className="App-link" to='/login'>Login</Link>}
        </header>
    );
  }
}

function mapStateToProps({ autheduser, loggedIn, users }) {
  return {
    autheduser,
    loggedIn: autheduser ? autheduser.loggedIn : false,
    users
  };
}
export default withRouter(connect(mapStateToProps)(Header));