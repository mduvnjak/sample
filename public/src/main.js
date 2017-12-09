import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';

import reducers from './reducers';
import { AUTH_USER_SUCCESS } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(
	reducers,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const token = localStorage.getItem('token');

if (token) {
  store.dispatch({ type: AUTH_USER_SUCCESS });
}


render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('mount')
);
