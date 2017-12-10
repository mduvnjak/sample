import {
  FETCH_ARTICLES, FETCH_ARTICLES_FAILED,
  CREATE_ARTICLE, CREATE_ARTICLE_FAILED,
  ADD_TO_DELETE_LIST, REMOVE_FROM_DELETE_LIST,
  DELETE_ARTICLES, DELETE_ARTICLES_FAILED,
  VOTE_SUCCESS, VOTE_FAILED
 } from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case FETCH_ARTICLES:
      return { ...state, articles: action.payload, error: false , message: '', deleteList: []};
    case FETCH_ARTICLES_FAILED:
      return { ...state, articles: [], error: 'Sign in to processed', };
    case CREATE_ARTICLE:
      return { ...state, error: '', message: action.payload, created: true };
    case CREATE_ARTICLE_FAILED:
      return { ...state, error: action.payload, created: false };
    case ADD_TO_DELETE_LIST:
      return { ...state, deleteList: action.payload };
    case REMOVE_FROM_DELETE_LIST:
      return { ...state, deleteList: action.payload };
    case DELETE_ARTICLES:
      return { ...state, deleteList: [], message: action.payload };
    case DELETE_ARTICLES_FAILED:
      return { ...state, deleteList: [], message: action.payload }
    case VOTE_SUCCESS:
      return { ...state, message: 'successifuly votes'};
    case VOTE_FAILED:
      return { ...state, message: 'vote failed'}
  }

  return state;
}
