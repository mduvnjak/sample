import React, { Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Articles extends Component {
  componentWillMount() {
    console.log(this.props);
  }

  render() {
    return (
      <h1>Welcome to article page</h1>
    );
  }
}

function mapStateToProps(state) {
  return { message: state };
}

export default connect(mapStateToProps, actions)(Articles);
