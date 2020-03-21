export const GET_USERS = 'GET_USERS';
export const SET_AUTHED_USER = 'SET_AUTHED_USER';
export const CLEAR_AUTHED_USER = 'CLEAR_AUTHED_USER';

export function receiveUsers(users) {
  return {
    type: GET_USERS,
    users,
  };
}

export function setAuthedUser(id) {
  return {
    type: SET_AUTHED_USER,
    id,
  };
}

export function clearAuthedUser() {
  return {
    type: CLEAR_AUTHED_USER,
  };
}