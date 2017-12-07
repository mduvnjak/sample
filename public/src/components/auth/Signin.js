import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
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
    // Need to do something to log user in

    this.props.dispatch(actions.signinUser({ email, password }));
    //this.props.signinUser({ email, password });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit, fields: { email, password }} = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field name="email" component={inputField} type="email" label="Email" />
        <Field name="password" component={inputField} type="password" label="Password" />

        {this.renderAlert()}

        <button action="submit" className="btn btn-primary">Sign in!</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signin',
  fields: ['email', 'password']
}, mapStateToProps, actions)(Signin);
