import axios from 'axios';
import history  from '../history';
import {
  AUTH_USER, AUTH_USER_SUCCESS, AUTH_USER_FAILED,
  REGISTER_USER, REGISTER_USER_SUCCESS, REGISTER_USER_FAILED,
  UNAUTH_USER,
  FETCH_ARTICLES, FETCH_ARTICLES_FAILED,
} from './types';

export function signinUser({ email, password }) {
  return function(dispatch) {
    dispatch({
      type: AUTH_USER
    });

    axios.post('/api/login', { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER_SUCCESS });
        localStorage.setItem('token', response.data.token);
        history.push('/articles');
      })
      .catch((err) => {
        dispatch(authError('Check your email and password'));
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
          payload: err.response.data.error
        })
      });
  }
}

export function authError(error) {
  return {
    type: AUTH_USER_FAILED,
    payload: error
  };
}

export function signoutUser() {
  return function(dispatch) {
    localStorage.removeItem('token');
    dispatch({
      type: UNAUTH_USER
    });
  }
}

export function clearErrors() {
  return {
    type: AUTH_USER
  }
}

export function getArticles() {
  return function(dispatch) {
    const token = localStorage.getItem('token');
    axios.get('/api/articles',{
      headers: {'authorization': token}
    })
    .then(function(res) {
      dispatch({
        type: FETCH_ARTICLES,
        payload: res.data
      })
    })
    .catch(function (err) {
      dispatch({
        type: FETCH_ARTICLES_FAILED,
        err
      });
      if (err.response.status === 401) {
        dispatch({
          type: UNAUTH_USER
        })
      }
    });
  }
}
