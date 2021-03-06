import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';

import Header from './Header';
import RequireAuth from './auth/require_auth';
import Signin from './auth/Signin';
import Signup from './auth/Signup';
import Signout from './auth/Signout';
import Articles from './Articles';
import NewArticle from './NewArticle';
import Welcome from './Welcome';
import NotFound from './NotFound';

class App extends Component {
	render() {
		return (
			<Router history={history}>
				<div>
					<Route path="/" component={Header} />
					<Switch>
						<Route path="/signup" component={Signup} />
						<Route path="/signin" component={Signin} />
						<Route path="/signout" component={Signout} />
						<Route path="/articles/create" component={NewArticle} />
						<Route path="/articles" component={RequireAuth(Articles)} />
						<Route exact path="/" component={Welcome} />
						<Route component={NotFound} />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;
