import {
  AUTH_USER, AUTH_USER_SUCCESS, AUTH_USER_FAILED,
  REGISTER_USER, REGISTER_USER_SUCCESS, REGISTER_USER_FAILED,
  UNAUTH_USER,
  FETCH_USER, FETCH_USER_FAILED,
  FETCH_MESSAGE, FETCH_MESSAGE_FAILED
 } from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case AUTH_USER:
      return { ...state, error: '', message: ''};
    case AUTH_USER_SUCCESS:
      return { ...state, authenticated: true, error: '', message: 'loged in' };
    case AUTH_USER_FAILED:
      return { ...state, error: action.payload.user , message: 'login failed' };
    case REGISTER_USER:
      return { ...state, error: '', message: ''};
    case REGISTER_USER_SUCCESS:
      return{ ...state, error: '', message: 'signed in' };
    case REGISTER_USER_FAILED:
      return { ...state, error: action.payload, message: 'signup failed' };
    case FETCH_USER:
      return { ...state, user: action.payload.user };
    case FETCH_USER_FAILED:
      return { ...state, user: null };
    case UNAUTH_USER:
      return { ...state, authenticated: false, message: 'signed out' };
    case FETCH_MESSAGE:
      return { ...state, message: '' };
    case FETCH_MESSAGE_FAILED:
      return { ...state, message: 'fetch message failed' };
    }
  return state;
}
