import {
  FETCH_ARTICLES, FETCH_ARTICLES_FAILED,
 } from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case FETCH_ARTICLES:
      return { ...state, articles: action.payload, error: false };
    case FETCH_ARTICLES_FAILED:
      return { ...state, articles: [], error: 'Sign in to processed'};
  }

  return state;
}
