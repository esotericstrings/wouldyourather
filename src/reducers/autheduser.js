import { SET_AUTHED_USER, CLEAR_AUTHED_USER } from '../actions/users';

const initialState = {
  authedUser: null,
  loggedIn: false
};

export default function authedUser(state = {}, action) {
  switch (action.type) {

    case SET_AUTHED_USER:
      return {
        ...state,
        id: action.id,
        loggedIn: true
      };

    case CLEAR_AUTHED_USER:
      return initialState;
      
    default:
      return state;
  }
}
