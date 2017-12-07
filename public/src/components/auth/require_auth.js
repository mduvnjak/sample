import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class Authentication extends Component {
    constructor(props) {
      super(props);
    }

    componentWillMount() {
      if (!this.props.authenticated) {
        this.props.history.push('/');
        console.log(this, this.context)
        console.log(React.PropTypes)
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        nextProps.history.push('/');
        console.log(this, this.context)
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    console.log(state)
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps)(Authentication);
}
