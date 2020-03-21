import React from 'react';
import {PropTypes} from 'prop-types'
import './index.css';

class LeaderCard extends React.Component {
  static propTypes = {
     user: PropTypes.object.isRequired,
  }

  render() {
	const user = this.props.user;
    return (
      <li key={user.id}>
        <div className='user'>

          <div className='user-image'>
            <img className='avatar' src={user.avatarURL} alt={`Avatar of ${user.name}`}/>
          </div>

          <div className='user-stats'>
            <h2>{user.name}</h2>
            <div className='user-stat'>
              <p>Asked questions</p>
              <p>{user.questions.length}</p>
            </div>
            <div className='user-stat'>
              <p>Answered questions</p>
              <p>{Object.keys(user.answers).length}</p>
            </div>
          </div>

          <div className='user-score'>
            <p>Score</p>
            <div className='score'>
            {user.questions.length + Object.keys(user.answers).length}
            </div>
          </div>

        </div>
      </li>
    );
  }
}
export default LeaderCard