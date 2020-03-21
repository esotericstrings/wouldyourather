import React from 'react';
import { connect } from 'react-redux';
import Header from '../Header';
import LeaderCard from '../LeaderCard';
import './index.css';


function Leaderboard(props) {

  document.title = "Leaderboard | Would You Rather"
  
  const { users } = props;
  const userArray = Object.keys(users).map((key) => users[key]);
  // sort from most to least answered
  const sortedUserArray = userArray.sort((a, b) => {
    const sumA = Object.keys(a.answers).length + a.questions.length;
    const sumB = Object.keys(b.answers).length + b.questions.length;
    return sumB -sumA;
  })

  return (
    <div>
      <Header/>
      <main className='leaderboard wrapper'>
        <ul className='user-list'>
          {sortedUserArray.map((user) => (
              <LeaderCard key={user.id} user={user}/>
          ))}
        </ul>
	    </main>
    </div>
  );
}

function mapStateToProps({ users }) {
  return {
    users,
  };
}

export default connect(mapStateToProps)(Leaderboard)