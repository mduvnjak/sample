import { AUTH_USER, REGISTER_USER_FAILED } from '../actions/types';

export default function(state = null, action) {
  switch(action.type) {
    case AUTH_USER:
      return { ...state, authenticated: true };
    case REGISTER_USER_FAILED:
      return { ...state, error: 'user registration failed'}
  }

  return state;
}
