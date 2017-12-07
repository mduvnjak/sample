import axios from 'axios';
import history  from '../history';
import {
  AUTH_USER,
  REGISTER_USER, REGISTER_USER_SUCCESS, REGISTER_USER_FAILED
} from './types';

export function signinUser({ email, password }) {
  return function(dispatch) {
    axios.post('/api/login', { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        history.push('/articles');
        console.log(history)
      })
      .catch(() => {
        // dispatch(authError('Bad Login Info'));
        console.log(this)
      });
  }
}

export function registerUser(user) {
  return function(dispatch) {
    dispatch({
      type: REGISTER_USER
    });

    axios.post('/api/register', user)
      .then(function (res) {
        dispatch({
          type: REGISTER_USER_SUCCESS,
          res
        })
      })
      .catch(function (err) {
        dispatch({
          type: REGISTER_USER_FAILED,
          err
        })
      });
  }
}
