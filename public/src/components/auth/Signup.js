import React, { Component } from 'react';
import { reduxForm , Field} from 'redux-form';
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

class Signup extends Component {
  componentWillUnmount() {
    this.props.clearErrors();
  }

  handleFormSubmit(formProps) {
    this.props.registerUser(formProps);
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
    const {
      handleSubmit, fields: { email, password, passwordConfirm }
    } = this.props;
    return (
      <div className="container">
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <Field name="email" component={inputField} type="email" label="Email" />
          <Field name="password" component={inputField} type="password" label="Password" />
          <Field name="passwordConfirm" component={inputField} type="password" label="Repeat password" />

          {this.renderAlert()}

          <button action="submit" className="btn btn-primary">Sign up!</button>
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

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation';
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.passwordConfirm = 'Passwords must match';
  }

  return errors;
}

function mapStateToProps(state) {
  return {
    message: state.auth.message,
    error: state.auth.error
  };
}
Signup = connect(mapStateToProps, actions)(Signup);

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate
})(Signup);
