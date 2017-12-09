import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import articleReducer from './article_reducer';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  articles: articleReducer
});

export default rootReducer;
