import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
	renderLinks() {
		if(!this.props.authenticated) {
			return (
				<div>
					<li className="nav-item">
						<Link className="nav-link" to="/signin">Sign In</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/signup">Sign Up</Link>
					</li>
				</div>
			);
		} else {
			return (
				<li className="nav-item">
					<Link className="nav-link" to="/signout">Sign Out</Link>
				</li>
			);
		}
	}
	render() {
		return (
			<div>
      <nav className="navbar navbar-light">

        <ul className="nav navbar-nav">
					<li className="nav-item">
						<Link to="/" className="nav-link">Sample</Link>
					</li>
					{this.renderLinks()}
        </ul>
      </nav>
		</div>
    );
  }
}

function mapStateToProps(state) {
	return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps, null)(Header);
