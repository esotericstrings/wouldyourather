import React, { Component } from 'react'
import { connect } from "react-redux"
import { setAuthedUser } from '../../actions/users'
import { withRouter } from 'react-router-dom'
import './index.css'

class LoginPage extends Component {
  constructor(props) {
    super(props);
    document.title = "Login | Would You Rather"

    this.state = {
      userid: "",
    };
    
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    this.setState({userid: target.value});
  }


  handleSubmit(event) {
      event.preventDefault();
      this.props.dispatch(setAuthedUser(this.state.userid));
      if (this.props.location.state) {
        this.props.history.push(this.props.location.state);
      } else {
        this.props.history.push('/');
      }
  }

  render() {
	const { users } = this.props;
        return (
          <div className="login-page">
            <div className="login-container">
              <div className="login-card">

                <h1>Would You Rather</h1>
                <h2>Login</h2>
                <p>Choose a user to continue</p>

                <div className="user-avatar">
                  {this.state.userid ? <img className='avatar' src={users[this.state.userid].avatarURL} width="200px" height="200px" alt={users[this.state.userid].name}/>: <span></span>}
                </div>

                <select value={this.state.userid} onChange={(event) => this.handleChange(event)}>
                  <option value={this.state.userid} disabled>Select user...</option>
                    {Object.keys(users).map(function(key) {
                      return (
                        <option value={users[key].id} key={key}>{users[key].id}</option>
                      )
                    })}
                </select>

                <button type="button" onClick={(event) => this.handleSubmit(event)} disabled={!this.state.userid}>Login</button>
                
                </div>
              </div>
            </div>
        )
    }
}

const mapStateToProps = ({ users }) => {
  return {
    users
  }
};

export default withRouter(connect(mapStateToProps)(LoginPage))