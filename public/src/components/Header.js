import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
	renderLinks() {
		if(!this.props.authenticated) {
			return [
				<li className="nav-item" key={1}><Link className="nav-link" to="/signin">Sign In</Link></li>,
				<li className="nav-item" key={2}><Link className="nav-link" to="/signup">Sign Up</Link></li>
			];
		} else {
			return [
				<li className="nav-item" key={1}><Link className="nav-link" to="/signout">Sign Out</Link></li>,
				<li className="nav-item" key={2}><Link className="nav-link" to="/articles">Articles</Link></li>
			];
		}
	}
	render() {
		return (
			<div className="">
	      <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
					<button className="navbar-toggler navbar-toggler-right"
						type="button"
						data-toggle="collapse"
						data-target="#navbarNavDropdown"
						aria-controls="navbarNavDropdown"
						aria-expanded="false"
						aria-label="Toggle navigation"
						>
				    <span className="navbar-toggler-icon"></span>
				  </button>
					<Link to="/" className="navbar-brand">Sample</Link>
					<div className="collapse navbar-collapse" id="navbarNavDropdown">
		        <ul className="navbar-nav">
							{this.renderLinks()}
		        </ul>
					</div>
	      </nav>
			</div>
    );
  }
}

function mapStateToProps(state) {
	return {
    authenticated: state.auth.authenticated,
		message: state.auth.message
  };
}

export default connect(mapStateToProps, null)(Header);
