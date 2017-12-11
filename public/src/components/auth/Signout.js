import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import history  from '../../history';

class Signout extends Component {
  componentWillMount() {
    this.props.signoutUser();
  }
  componentDidMount() {
    setTimeout(function () {
      history.push('/signin');
    }, 1000);
  }
  render() {
    return (<div className="container text-center">
      <h1>Sorry to see you go</h1>
      <div className="alert alert-info">{this.props.message}</div>
    </div>);
  }
}
function mapStateToProps(state) {
  return {
    message: state.auth.message,
  }
}

export default connect(mapStateToProps, actions)(Signout);
