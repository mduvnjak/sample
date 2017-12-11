import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

const inputField = (props) => {
  return (
    <div>
      <fieldset className="form-group">
        <label>{props.label}:</label>
        <input {...props.input} type={props.type} className="form-control" />
      </fieldset>

      {props.meta.touched && props.meta.error &&
        <span className="error">
          {props.meta.error}
        </span>
      }
    </div>
  )
};

class Signin extends Component {
  handleFormSubmit({ email, password }) {
    this.props.signinUser({ email, password });
  }
  renderAlert() {
    if (this.props.error) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.error}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit, fields: { email, password }} = this.props;
    return (
      <div className="container">
        <div className="text-center">
          <h4>Enter your email and password to signin</h4>
        </div>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <Field name="email" component={inputField} type="email" label="Email" />
          <Field name="password" component={inputField} type="password" label="Password" />

          {this.renderAlert()}
          <button action="submit" className="btn btn-primary">Sign in!</button>
        </form>
      </div>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  return errors;
}

function mapStateToProps(state) {
  return {
    message: state.auth.message,
    error: state.auth.error
   };
}

Signin = connect(mapStateToProps, actions)(Signin);

export default reduxForm({
  form: 'signin',
  fields: ['email', 'password'],
  validate
})(Signin);
