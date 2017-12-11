import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';

import reducers from './reducers';
import * as actions from './actions';
import { AUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(
	reducers,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const token = localStorage.getItem('token');

if (token) {
	store.dispatch(actions.fetchUser(token));
  store.dispatch({ type: AUTH_USER });

}


render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('mount')
);
