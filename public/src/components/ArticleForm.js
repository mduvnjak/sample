import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../actions';

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
const inputDisabledField = (props) => {
  return (
    <div>
      <fieldset className="form-group">
        <label>{props.label}:</label>
        <input disabled {...props.input} type={props.type} className="form-control" />
      </fieldset>

      {props.meta.touched && props.meta.error &&
        <span className="error">
          {props.meta.error}
        </span>
      }
    </div>
  )
};

class ArticleForm extends Component {
  componentWillMount() {
    this.props.clearMessages();
  }
  handleFormSubmit(formProps) {
    this.props.createArticle(formProps);
  }

  renderAlert() {
    if (this.props.error) {
      return (
        <div className="alert alert-info">
          <strong>Oops!</strong> {this.props.error}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit, author } = this.props;
    return (
      <div className="container text-center">
        <h4>Fill required fields to create article</h4>
        <div className="alert">
        {this.props.message && <div className="alert alert-info"><strong>Oops!</strong> {this.props.message}</div>}
        </div>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <Field name="votes" component={inputDisabledField} type="text" label="Votes" />
          <Field name="author" component={inputDisabledField} type="text" label="Author" initial={author}/>
          <Field name="title" component={inputField} type="text" label="Title" />
          <Field name="url" component={inputField} type="text" label="Link" />
          <Field name="author_name" component={inputField} type="text" label="Author name" />

          {this.renderAlert()}

          <button action="submit" className="btn btn-primary">Create article!</button>
        </form>
      </div>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.title) {
    errors.title = 'Please enter an title';
  }

  const urlPattern = new RegExp('^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?');
  if (!formProps.url) {
    errors.url = 'Please enter a url';
  } else if (!formProps.url.match(urlPattern)) {
    errors.url = 'Please eneter a valid url';
  }

  if (!formProps.author_name) {
    errors.author_name = 'Please enter a author name';
  }

  return errors;
}

function mapStateToProps(state) {
  return {
    error: state.articles.error,
    message: state.articles.message,
    author: state.auth
   };
}

ArticleForm = connect(mapStateToProps, actions)(ArticleForm);

export default reduxForm({
  form: 'createArticle',
  fields: ['votes', 'author', 'title', 'url', 'author_name'],
  validate
})(ArticleForm);
