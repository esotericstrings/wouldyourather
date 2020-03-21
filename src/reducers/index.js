import { combineReducers } from 'redux';
import questions from './questions';
import users from './users';
import autheduser from './autheduser';


export default combineReducers({
  questions,
  users,
  autheduser
});