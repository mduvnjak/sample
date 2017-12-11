import React, { Component } from 'react';
import ArticleForm from './ArticleForm';
import { connect } from 'react-redux';

class NewArticle extends Component {
  render() {
    const initialValues = {
      'votes': '0',
      'author': this.props.author
    }
    return (
      <ArticleForm initialValues={initialValues}/>
    );
  }
}

function mapStateToProps(state) {
  return {
    author: state.auth.user.username
  }
}

export default connect(mapStateToProps, null)(NewArticle);
