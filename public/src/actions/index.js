import axios from 'axios';
import history  from '../history';
import {
  AUTH_USER, AUTH_USER_SUCCESS, AUTH_USER_FAILED,
  REGISTER_USER, REGISTER_USER_SUCCESS, REGISTER_USER_FAILED,
  FETCH_USER, FETCH_USER_FAILED,
  UNAUTH_USER,
  FETCH_ARTICLES, FETCH_ARTICLES_FAILED,
  CREATE_ARTICLE, CREATE_ARTICLE_FAILED,
  ADD_TO_DELETE_LIST, REMOVE_FROM_DELETE_LIST,
  DELETE_ARTICLES, DELETE_ARTICLES_FAILED,
  VOTE_SUCCESS, VOTE_FAILED
} from './types';

export function fetchUser(token) {
  return function(dispatch) {
    axios({
      method: 'post',
      url: '/api/user',
      headers: {'authorization': token }
  })
    .then(response => {
      dispatch({
        type: FETCH_USER,
        payload: response.data
      });
    })
    .catch((err) => {
      dispatch({ type: FETCH_USER_FAILED })
      // dispatch(authError('anuthorized'));
    });
  }
}

export function signinUser({ email, password }) {
  return function(dispatch) {
    dispatch({
      type: AUTH_USER
    });

    axios.post('/api/login', { email, password })
      .then(response => {
        dispatch({
          type: AUTH_USER_SUCCESS,
          payload: response.data
        });
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

export function createArticle(article) {
  const token = localStorage.getItem('token');
  return function(dispatch) {
    axios({
      method: 'post',
      url: '/api/articles/create',
      headers: {'authorization': token},
      data: article
    })
    .then(function (res) {
      dispatch({
        type: CREATE_ARTICLE,
        payload: res.data.message
      })
      setTimeout(function () {
        history.push('/articles');
      }, 1000);
    })
    .catch(function (err) {
      dispatch({
        type: CREATE_ARTICLE_FAILED,
        payload: err.response.data
      })
      if (err.response.status === 401) {
        dispatch({
          type: UNAUTH_USER
        })
      }
    });
  }
}

export function markForDeletion(isChecked, id) {
  return function(dispatch, getState) {
    const list = getState().articles.deleteList || [];

    if (isChecked) {
        if (list.indexOf(id) < 0) {
          list.push(id);
        }
        dispatch({
          type: ADD_TO_DELETE_LIST,
          payload: list
        })
    } else {
      if (list.indexOf(id) > -1) {
        list.splice(list.indexOf(id), 1);
      }
      dispatch({
        type: REMOVE_FROM_DELETE_LIST,
        payload: list
      })
    }

  }
}

export function deleteArticles() {
  return function(dispatch, getState) {
    const list = getState().articles.deleteList || [];
    const token = localStorage.getItem('token');

    axios({
      method: 'post',
      url: '/api/articles/delete',
      headers: {'authorization': token},
      data: {
        articles: list
      }
    })
    .then(function (res) {
      dispatch({
        type: DELETE_ARTICLES,
        payload: res.data.n
      });
      setTimeout(function () {
        history.go('/articles');
      }, 1000);
    })
    .catch(function (err) {
      dispatch({
        type: DELETE_ARTICLES,
        payload: err
      })
    });
  }
}

export function voteArticle(userId, articleId, vote) {
  const token = localStorage.getItem('token');

  return function(dispatch) {
    axios({
      method: 'post',
      url: '/api/articles/votes',
      headers: {'authorization': token},
      data: {
        userId,
        articleId,
        vote
      }
    })
    .then(function (response) {
      dispatch({
        type: VOTE_SUCCESS,
        payload: response
      })
    })
    .catch(function (err) {
      dispatch({
        type: VOTE_FAILED,

      })
    });
  }
}
